import cv2
import dill
import cvzone
import numpy as np

import ParkingSpotCreator

ParkingSpotCreator.create_parking_spots()

# Video
cap = cv2.VideoCapture('BirdsEyeViewParkingLot.mp4')

with open('CarSpacePos.pkl', 'rb') as f:
    spacesList = dill.load(f)

while True:

    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)

    success, img = cap.read()

    img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_blur = cv2.GaussianBlur(img_gray, (3, 3), 1)
    img_thresh = cv2.adaptiveThreshold(img_blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                       cv2.THRESH_BINARY_INV, 25, 16)

    # manipulate the image to make it easier to detect empty spaces
    img_med = cv2.medianBlur(img_thresh, 5)
    kernel = np.ones((3, 3), np.int8)
    img_dil = cv2.dilate(img_med, kernel, iterations=1)

    for space in spacesList:
        cv2.rectangle(img, tuple(space.positionList[0]), tuple(space.positionList[1]), (255, 0, 255), 2)

    count = 0

    # checks each parking space for car
    for i in spacesList:
        available = i.check_parking_space(img_dil, img)
        if available:
            color = (0, 255, 0)
            thickness = 2
            count += 1
        else:
            color = (0, 0, 255)
            thickness = 1

        cv2.rectangle(img, tuple(i.positionList[0]), tuple(i.positionList[1]), color, thickness)

    cvzone.putTextRect(img, str(count) + "/" + str(len(spacesList)) + " available spots", (0, 20), scale=1.5,
                       thickness=2, offset=0)

    cv2.imshow("Image", img)
    c = cv2.waitKey(10)

    if c > -1:
        break
