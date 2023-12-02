import csv

import cv2
import cvzone
import dill
import numpy as np
import os
from vidstab import VidStab
import random
import time

import createLots


def parking_availability():
    print("main starting execution")

    createLots.create_parking_spots()
    print("parking spots created")

    cv2.destroyAllWindows()


def update_availability():
    # get the current working directory which should be the location of manage.py
    directory = (os.getcwd())

    lot_info = []

    # look through each file in the lots folder and updating the availability of each lot via their feed
    for dirpath, dirnames, filenames in os.walk(directory + '/lots'):
        for filename in filenames:
            if filename.endswith('.pkl'):
                # each lot has a mp4 file representing their camera feed
                lot_name = (os.path.splitext(filename)[0])
                print(lot_name + ' begin update')

                # have open cv load the lot's footage
                cap = cv2.VideoCapture('lots/' + lot_name + '/' + lot_name + '.mp4')
                if not cap.isOpened():
                    print(lot_name + ' video file Could not be opened')

                # initialize the video stabilizer
                stabilizer = VidStab()

                # load the dill file that contains the location of the parking spots for that lot
                with open('lots/' + lot_name + '/' + lot_name + '.pkl', 'rb') as f:
                    spacesList = dill.load(f)

                # waiting about 50 frames is enough to have made it past the initial
                n_frames = 50
                n_frame = 0

                # ideally, you would capture the footage and read in a single frame to determine availability
                # the initial frames when starting capture might be distorted or black, giving false readings
                # to work around this, when updating availability, we process about 50 frames worth of footage
                # by the end, the initial distortion from capture will be gone, and the readings will be accurate
                while n_frame < n_frames:
                    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
                        randomframe = random.randint(1, cap.get(cv2.CAP_PROP_FRAME_COUNT))
                        cap.set(cv2.CAP_PROP_POS_FRAMES, randomframe-1)

                    # intended to simulate randomly checking a camera from the video
                    if n_frame == 1:
                        randomframe = random.randint(1, cap.get(cv2.CAP_PROP_FRAME_COUNT))
                        cap.set(cv2.CAP_PROP_POS_FRAMES, randomframe - 1)

                    # read in the captured video frame by frame
                    success, img = cap.read()

                    if not success:
                        # it failed to read in the video for some reason, so skip this frame and try again
                        continue

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
                        cv2.rectangle(stable_frame, tuple(space.positionList[0]), tuple(space.positionList[1]),
                                      (255, 0, 255), 2)

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
                        cv2.rectangle(stable_frame, tuple(i.positionList[0]), tuple(i.positionList[1]), color,
                                      thickness)

                    # text showing how many available spots out of total
                    # unnecessary for simply updating availability, but helpful for debugging
                    cvzone.putTextRect(stable_frame, str(count) + "/" + str(len(spacesList)) + " available spots",
                                       (0, 20),
                                       scale=1.5,
                                       thickness=2, offset=0)
                    # increment frame to control when we think we have read enough frames to determine availability
                    n_frame += 1

                # release the captured video
                cap.release()

                # write parking spot availability data to a csv in "lot name, available spots, total spots" format
                lot_info.append([lot_name, str(count), str(len(spacesList))])
                print(lot_name + ' updated')
                cv2.destroyAllWindows()

    # all the lots have been updated and we have temporarily stored their availability info
    # now it is written into a csv to be stored and easily accessed elsewhere
    with open("lot_availability.csv", 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        for lot in lot_info:
            csvwriter.writerow(lot)
