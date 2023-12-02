import cv2
import dill
import numpy as np
import cvzone
from vidstab import VidStab
import tkinter as tk
from tkinter import filedialog
import os

posList = []


class ParkingSpaces:
    def __init__(self, pos):
        self.positionList = pos.copy()

    def click_detection(self, pos):
        x, y = pos

        x1, y1 = self.positionList[0]
        x2, y2 = self.positionList[1]

        max_y = max(y1, y2)
        min_y = min(y1, y2)

        max_x = max(x1, x2)
        min_x = min(x1, x2)

        if (min_x <= x <= max_x) and (min_y <= y <= max_y):
            return True
        else:
            return False

    def check_parking_space(self, processed_image, base_img):
        # cv2.rectangle(img, tuple(self.positionList[0]), tuple(self.positionList[1]), (255, 0, 255), 2)
        x1, y1 = self.positionList[0]
        x2, y2 = self.positionList[1]

        max_y = max(y1, y2)
        min_y = min(y1, y2)

        max_x = max(x1, x2)
        min_x = min(x1, x2)

        img_crop = processed_image[min_y:max_y, min_x:max_x]

        pixel_count = cv2.countNonZero(img_crop)

        if pixel_count < 200:
            available = True
        else:
            available = False

        return available


def create_parking_spots():
    # defines the actions on mouse click
    def mouse_click(events, x, y, flags, params):
        # on mouse click, log the x and y coordinates of the click
        if events == cv2.EVENT_LBUTTONDOWN:
            posList.append((x, y))

        # on letting off the mouse, log the position and create the parking space
        if events == cv2.EVENT_LBUTTONUP:
            posList.append((x, y))
            new_space = ParkingSpaces(posList)
            spacesList.append(new_space)
            posList.clear()

        # right click checks if the user right-clicked inside a space and removes that space
        if events == cv2.EVENT_RBUTTONDOWN:
            click = (x, y)
            for i in range(len(spacesList)):
                if spacesList[i].click_detection(click):
                    # COLLISION DETECTED
                    spacesList.pop(i)
                    break
                # otherwise no collision detected

    # prompt the user-admin for a lot's footage to create a new lot or edit an existing one

    # creates the window and hides a tkinter window that appears, but isn't used
    app_window = tk.Tk()
    app_window.overrideredirect(True)
    app_window.attributes("-alpha", 0)

    # what file are we expecting
    my_filetypes = [('mp4 files', '.mp4')]

    # the actual select file box
    answer = filedialog.askopenfilename(parent=app_window,
                                        initialdir=os.getcwd(),
                                        title="Please select a feed",
                                        filetypes=my_filetypes)

    # collecting the filename for the selected feed
    file_name = os.path.basename(answer)
    file_name = (os.path.splitext(file_name)[0])

    directory = 'lots/' + file_name
    os.makedirs(directory, exist_ok=True)
    os.replace(answer, 'lots/' + file_name + '/' + file_name + '.mp4')

    # remove the tkinter window since it is no longer needed
    app_window.destroy()

    # loads the parking spaces that have been created from file
    try:
        with open('lots/' + file_name + '/' + file_name + '.pkl', 'rb') as f:
            spacesList = dill.load(f)
    except FileNotFoundError:
        # if there is no pre-existing file with the spacesList to load from make blank one
        spacesList = []
    except dill.UnpicklingError:
        print('Error Loading pickle data')

    # load the selected feed with cv2
    cap = cv2.VideoCapture('lots/' + file_name + '/' + file_name + '.mp4')
    stabilizer = VidStab()
    success, img = cap.read()
    stable_frame = stabilizer.stabilize_frame(input_frame=img, border_type='black', border_size=50)

    cv2.imwrite("frame_0.jpg", img)

    # this is called every "frame"
    # it uses opencv to read in the given image or video
    while True:
        img = cv2.imread('frame_0.jpg')

        stable_frame = stabilizer.stabilize_frame(input_frame=img, border_type='black', border_size=50)
    ##starts to open the project here
        with open('lots/' + file_name + '/' + file_name + '.pkl', 'wb') as f:
            dill.dump(spacesList, f)

        img_gray = cv2.cvtColor(stable_frame, cv2.COLOR_BGR2GRAY)
        img_blur = cv2.GaussianBlur(img_gray, (3, 3), 1)
        img_thresh = cv2.adaptiveThreshold(img_blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                           cv2.THRESH_BINARY_INV, 25, 16)

        # manipulate the image to make it easier to detect empty spaces
        img_med = cv2.medianBlur(img_thresh, 1)
        kernel = np.ones((2, 2), np.int8)
        img_dil = cv2.dilate(img_med, kernel, iterations=1)

        for space in spacesList:
            cv2.rectangle(stable_frame, tuple(space.positionList[0]), tuple(space.positionList[1]), (255, 0, 255), 2)

        count = 0

        # checks each parking space for car
        for i in spacesList:
            available = i.check_parking_space(img_dil, stable_frame)
            if available:
                color = (0, 255, 0)
                thickness = 5
                count += 1
            else:
                color = (0, 0, 255)
                thickness = 2

            cv2.rectangle(stable_frame, tuple(i.positionList[0]), tuple(i.positionList[1]), color, thickness)

        cvzone.putTextRect(stable_frame, str(count) + "/" + str(len(spacesList)) + " available spots", (0, 20),
                           scale=1.5, thickness=2, offset=0)

        # displays the image
        cv2.imshow("Image", stable_frame)
        # cv2.imshow("processed", img_dil)

        cv2.setMouseCallback("Image", mouse_click, posList)
        c = cv2.waitKey(1)

        if c > -1:
            break
