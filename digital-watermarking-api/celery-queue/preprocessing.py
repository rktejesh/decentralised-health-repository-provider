import cv2 
import numpy as np
from deskew import deskew
from crop_morphology import crop_morphology

# get np_array image
def np_array_image(image):
    image_np = np.asarray(image)
    return image_np

# get normalized image
def normalize(image):
    norm_img = np.zeros((image.shape[0], image.shape[1]))
    return cv2.normalize(image, norm_img, 0, 255, cv2.NORM_MINMAX)

def scale_image(image):
    return cv2.resize(image, None, fx=1.2, fy=1.2, interpolation=cv2.INTER_CUBIC)

# get grayscale image
def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# noise removal
def remove_noise(image):
    return cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 15)
    # return cv2.medianBlur(image,5)
 
#thresholding
def thresholding(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    # return cv2.adaptiveThreshold(cv2.GaussianBlur(image, (5, 5), 0), 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)
    # return cv2.adaptiveThreshold(cv2.bilateralFilter(image, 9, 75, 75), 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)
    # return cv2.adaptiveThreshold(cv2.medianBlur(image, 3), 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 31, 2)

#dilation
def dilate(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.dilate(image, kernel, iterations = 1)
    
#erosion
def erode(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.erode(image, kernel, iterations = 1)

#opening - erosion followed by dilation
def opening(image):
    kernel = np.ones((5,5),np.uint8)
    return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)

def erodendilate(image):
    clahe = cv2.createCLAHE(clipLimit=10, tileGridSize=(5, 5))
    image = clahe.apply(image)
    ret, thresh = cv2.threshold(image, 140, 150, cv2.THRESH_OTSU)
    morph = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, np.ones((5,5), np.uint8), iterations=1)
    morph = cv2.morphologyEx(morph, cv2.MORPH_CLOSE, np.ones((3,1), np.uint8), iterations=1)
    return morph

#canny edge detection
def canny(image):
    return cv2.Canny(image, 100, 200)


#pre-process the image
def pre_processing(image):
    cv2image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    norm_img = normalize(cv2image)
    deskew_img = deskew(norm_img)
    scale_img = scale_image(deskew_img)
    denoised_img = remove_noise(scale_img)
    grey = get_grayscale(denoised_img)
    crop_img = crop_morphology(grey)
    # threshold = thresholding(grey)
    # np_image = np_array_image(threshold)
    # erode_img = erode(np_image)
    # dilate_img = dilate(erode_img)
    # cany = canny(threshold)
    return crop_img