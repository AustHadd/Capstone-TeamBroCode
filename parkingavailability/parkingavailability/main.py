import csv

import cv2
import cvzone
import dill
import numpy as np
import os
from vidstab import VidStab

from parkingavailability import ParkingSpotCreator


def parking_availability():

    print("main starting execution")

    ParkingSpotCreator.create_parking_spots()
    print("parking spots created")
    # Video
    #cap = cv2.VideoCapture("parkingavailability\BirdsEyeViewParkingLot.mp4")
    print("loaded video starting execution")

    print("main finished execution")
    cv2.destroyAllWindows()


def update_availability():
    # get the current working directory which should be the location of manage.py
    directory = (os.getcwd())

    # look through each file in the lots folder and updating the availability of each lot via their feed
    for dirpath, dirnames, filenames in os.walk(directory+'/lots'):
        for filename in filenames:
            if filename.endswith('.mp4'):
                # each lot has a mp4 file representing their camera feed
                lot_name = (os.path.splitext(filename)[0])
                print(lot_name)

                # have open cv load the lot's footage
                cap = cv2.VideoCapture('lots/' + lot_name + '/' + lot_name + '.mp4')

                # initialize the video stabilizer
                stabilizer = VidStab()

                # load the dill file that contains the location of the parking spots for that lot
                with open('lots/' + lot_name + '/' + lot_name + '.pkl', 'rb') as f:
                    spacesList = dill.load(f)

                while True:
                    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
                        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

                    success, img = cap.read()

                    # stabilize the current frame from the video
                    stable_frame = stabilizer.stabilize_frame(input_frame=img, border_type='black', border_size=50)

                    img_gray = cv2.cvtColor(stable_frame, cv2.COLOR_BGR2GRAY)
                    img_blur = cv2.GaussianBlur(img_gray, (3, 3), 1)
                    img_thresh = cv2.adaptiveThreshold(img_blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                                       cv2.THRESH_BINARY_INV, 25, 16)

                    # manipulate the image to make it easier to detect empty spaces
                    img_med = cv2.medianBlur(img_thresh, 5)
                    kernel = np.ones((3, 3), np.int8)
                    img_dil = cv2.dilate(img_med, kernel, iterations=1)

                    # for each parking space in the pickle file, create a rectangle from the pickle file's coordinates
                    for space in spacesList:
                        cv2.rectangle(stable_frame, tuple(space.positionList[0]), tuple(space.positionList[1]), (255, 0, 255), 2)

                    count = 0

                    # checks each parking space for car
                    for i in spacesList:
                        available = i.check_parking_space(img_dil, stable_frame)
                        if available:
                            color = (0, 255, 0)
                            thickness = 2
                            count += 1
                        else:
                            color = (0, 0, 255)
                            thickness = 1

                        # create the rectangle with the corresponding color/thickness based on availability
                        cv2.rectangle(stable_frame, tuple(i.positionList[0]), tuple(i.positionList[1]), color, thickness)

                    # text showing how many available spots out of total
                    cvzone.putTextRect(stable_frame, str(count) + "/" + str(len(spacesList)) + " available spots", (0, 20),
                                       scale=1.5,
                                       thickness=2, offset=0)

                    # commenting out where the video would be shown
                    cv2.imshow("Image", stable_frame)
                    c = cv2.waitKey(10)

                    # currently will stop when user inputs spacebar
                    if c > -1:
                        # write parking spot availability data to a csv in "available spots, total spots" format
                        # With a live camera this would activate at predetermined time intervals
                        with open("lot_availability.csv", 'w') as csvfile:
                            csvwriter = csv.writer(csvfile)
                            csvwriter.writerow([lot_name, str(count), str(len(spacesList))])
                        print("main finished execution")
                        cv2.destroyAllWindows()
                        break

# parking_availability()
# print("main finished execution")
