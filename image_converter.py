import cv2
import math
import numpy as np


def create_orientation_kernel(angle, size=3):
    angle = math.radians(angle)
    cos_theta = math.cos(angle)
    sin_theta = math.sin(angle)
    sigma = 1
    half_size = size // 2

    kernel = np.zeros((size, size), dtype=np.float32)

    for i in range(size):
        for j in range(size):
            x = j - half_size
            y = half_size - i
            kernel[i, j] = math.exp(-(x * cos_theta - y * sin_theta) ** 2 / (2 * sigma ** 2))

    kernel /= kernel.sum()

    return kernel

#desired_orientation = 20
kernels = [create_orientation_kernel(30*i) for i in range(6)]

image = cv2.imread("1200px-Roy_SSBU.png", cv2.IMREAD_GRAYSCALE)
edges = cv2.Canny(image, 100, 200)


filtered_images = [cv2.filter2D(edges, -1, ker) for ker in kernels]

threshold_value = 150
binary_edges = [(fi > threshold_value).astype(np.uint8) * 255 for fi in filtered_images]



# Adding them back together
image = binary_edges[0]
for i in binary_edges:
    image = cv2.add(image, i) 

cv2.imshow("20 deg Edges thresholded", image)
cv2.waitKey(0)
