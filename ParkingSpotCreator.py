import cv2
import dill
import numpy as np
import cvzone

posList = []


class ParkingSpaces:
    def __init__(self, pos):
        self.positionList = pos.copy()

    def click_detection(self, pos):
        x, y = pos

        x1, y1 = self.positionList[0]
        x2, y2 = self.positionList[1]

        if (x1 <= x <= x2) and (y1 <= y <= y2):
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

        # cv2.imshow(str(self.positionList[0]), img_crop)
        pixel_count = cv2.countNonZero(img_crop)
        cvzone.putTextRect(base_img, str(pixel_count), (min_x, min_y+20), scale=1.5, thickness=2, offset=0)

        if pixel_count < 800:
            available = True
        else:
            available = False

        return available


# loads the parking spaces that have been created from file
try:
    with open('CarSpacePos.pkl', 'rb') as f:
        spacesList = dill.load(f)
except FileNotFoundError:
    # if there is no pre-existing file with the spacesList to load from make blank one
    spacesList = []
except dill.UnpicklingError:
    print('Error Loading pickle data')


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

    # logs the parking spaces that have been created into a file
    with open('CarSpacePos.pkl', 'wb') as f:
        dill.dump(spacesList, f)


def create_parking_spots():
    cap = cv2.VideoCapture('parkinglot.mp4')
    success, img = cap.read()

    cv2.imwrite("frame_0.jpg", img)

    # this is called every "frame"
    # it uses opencv to read in the given image or video
    while True:
        img = cv2.imread('frame_0.jpg')

        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        img_blur = cv2.GaussianBlur(img_gray, (3, 3), 1)
        img_thresh = cv2.adaptiveThreshold(img_blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                           cv2.THRESH_BINARY_INV, 25, 16)

        # manipulate the image to make it easier to detect empty spaces
        img_med = cv2.medianBlur(img_thresh, 5)
        kernel = np.ones((3,3), np.int8)
        img_dil = cv2.dilate(img_med, kernel, iterations=1)

        for space in spacesList:
            cv2.rectangle(img, tuple(space.positionList[0]), tuple(space.positionList[1]), (255, 0, 255), 2)

        count = 0

        # checks each parking space for car
        for i in spacesList:
            available = i.check_parking_space(img_dil, img)
            if available:
                color = (0, 255, 0)
                thickness = 5
                count += 1
            else:
                color = (0, 0, 255)
                thickness = 2

            cv2.rectangle(img, tuple(i.positionList[0]), tuple(i.positionList[1]), color, thickness)

        cvzone.putTextRect(img, str(count)+"/"+str(len(spacesList))+" available spots", (0, 20), scale=1.5, thickness=2, offset=0)

        # displays the image
        cv2.imshow("Image", img)

        cv2.setMouseCallback("Image", mouse_click, posList)
        cv2.waitKey(1)
