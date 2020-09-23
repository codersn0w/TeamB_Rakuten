#MIT License
#Created by Daichi Azuma on 22/09/20.
#Copyright (c) 2020 Daichi Azuma
#https://github.com/dachii-azm/
#

import cv2
import numpy as np
from pylsd.lsd import lsd

class Book_Extractor():
    AREA_THRESHOLD =  1000
    IMAGE_SIZE_W = 200
    LINE_THRESHOLD = 5000

    def __init__(self, img_name):
        self.img_name = img_name
    
    def get_image(self):
        img = cv2.imread(self.img_name)
        return img

    def align_image_size(self, img):
        ratio = self.IMAGE_SIZE_W/img.shape[1]
        img = cv2.resize(img, (self.IMAGE_SIZE_W, int(ratio * img.shape[0])))
        return img

    def detect_lines(self, img):
        gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
        gray1 = cv2.GaussianBlur(gray,(3,3),5)
        gray2 = cv2.GaussianBlur(gray,(5,5),5)
        gray3 = cv2.GaussianBlur(gray,(15,15),3)
        linesL1 = lsd(gray1)
        linesL2 = lsd(gray2)
        linesL3 = lsd(gray3)
        linesL = np.vstack([linesL1, linesL2])
        linesL = np.vstack([linesL, linesL3])
        linesL = np.unique(linesL, axis=0)
        return linesL

    def detect_goodLines(self, linesL, img):
        goodLines = []
        for line in linesL:
            x1, y1, x2, y2 = map(int,line[:4])
            dx = x2 - x1
            dy = y2 - y1
            if (dx)**2 + (dy)**2 > self.LINE_THRESHOLD:
                goodP = [x1, y1, x2, y2]
                goodLines.append(goodP)
                #cv2.line(img,(x1 - (dx*200),y1 - (dy*200)),(x1 + (dx*200),y1 + (dy*200)),(0,255,0),2)
                cv2.line(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        goodLines = self.get_unique_list(goodLines)
        return goodLines

    def get_unique_list(self, seq):
        seen = []
        return [x for x in seq if x not in seen and not seen.append(x)]

    def get_cosine_bet_lines(self, p1, p2, p3, p4):
        vector1 = np.array([p1[0]-p3[0], p1[1]-p3[1]], dtype='f8')
        vector2 = np.array([p2[0]-p4[0], p2[1]-p4[1]], dtype='f8')
        norm1 = float(np.sqrt(vector1[0]**2 + vector1[1]**2))
        norm2 = float(np.sqrt(vector2[0]**2 + vector2[1]**2))
        inner_pd = float(np.dot(vector1, vector2))
        cosine  = float(inner_pd) / float((norm1 * norm2))
        return cosine

    def calc_cross_point(self, p1, p2, p3, p4):
        cp = [0, 0]
        ref = False
        s1 = ((p4[0]-p2[0])*(p1[1]-p2[1])-(p4[1]-p2[1])*(p1[0]-p2[0]))/2
        s2 = ((p4[0]-p2[0])*(p2[1]-p3[1])-(p4[1]-p2[1])*(p2[0]-p3[0]))/2
        if(abs(self.get_cosine_bet_lines(p1, p2, p3, p4))<=0.25):
            #print(abs(self.get_cosine_bet_lines(p1,p2,p3,p4)))
            cp = (int(p1[0] + (p3[0]-p1[0])*s1 / (s1+s2)), int(p1[1] + (p3[1]-p1[1])*s1 / (s1+s2)))
            ref = True
        return ref, cp

    def get_good_points(self, goodLines, img):
        cps = []
        for i in range(len(goodLines)-1):
            for j in range(i+1, len(goodLines)):
                p1 = (goodLines[i][0], goodLines[i][1])
                p3 = (goodLines[i][2], goodLines[i][3])
                p2 = (goodLines[j][0], goodLines[j][1])
                p4 = (goodLines[j][2], goodLines[j][3])
                ref, cp = self.calc_cross_point(p1, p2, p3, p4)
                if(ref):
                    if(cp[0]>=0 and cp[0]<=img.shape[1] and cp[1]>=0 and cp[1]<=img.shape[0] and np.any(img[cp[1], cp[0]] != np.array([0, 0, 255]))):
                        cps.append(cp)
                        img = cv2.circle(img, cp, 2, (0,0,255), 5)
        cps = self.get_unique_list(cps)
        return cps


    def calc_ptp_dists(self, cps):
        dists = []
        for i in range(len(cps)-1):
            for j in range(i+1, len(cps)):
                dx = cps[i][0] - cps[j][0]
                dy = cps[i][1] - cps[j][1]    
                dist = np.sqrt((dx)**2 + (dy)**2)
                if(dist>=60 and dist<=200):
                    dists.append(dist)
        dists.sort()
        return dists

    def calc_dist(self, cp1, cp2):
        dx = cp1[0] - cp2[0]
        dy = cp1[1] - cp2[1]
        dist = float(np.sqrt((dx)**2 + (dy)**2))
        return dist
    
    def choose_rect(self, cps, frame):
        rects = []
        for i in range(len(cps)-3):
            for j in range(i+1, len(cps)-2):
                for r in range(j+1, len(cps)-1):
                    for l in range(r+1, len(cps)):
                        dists = []
                        dist_ij = self.calc_dist(cps[i], cps[j])
                        dist_ir = self.calc_dist(cps[i], cps[r])
                        dist_il = self.calc_dist(cps[i], cps[l])
                        dist_jr = self.calc_dist(cps[j], cps[r])
                        dist_jl = self.calc_dist(cps[j], cps[l])
                        dist_rl = self.calc_dist(cps[r], cps[l])
                        dists.append(dist_ij)
                        dists.append(dist_ir)
                        dists.append(dist_il)
                        dists.append(dist_jr)
                        dists.append(dist_jl)
                        dists.append(dist_rl)
                        rect = [cps[i], cps[j], cps[r], cps[l]]
                        dists.sort()
                        judge_good_rect = False
                        for m in range(3):
                            if(abs(float(dists[2*m]) - float(dists[2*m+1])) <=34):
                                judge_good_rect = True
                            else: 
                                judge_good_rect = False
                                break

                        if(judge_good_rect):
                            rects.append(rect)
                            print(dists)
                            cv2.circle(frame, rect[0], 2, (0,0,255), 5)
                            cv2.circle(frame, rect[1], 2, (0,0,255), 5)
                            cv2.circle(frame, rect[2], 2, (0,0,255), 5)
                            cv2.circle(frame, rect[3], 2, (0,0,255), 5)



        return rects

            

    def run(self):
        #img = cv2.imread('./sample_image.jpg')
        img = self.get_image()
        img = self.align_image_size(img)
        frame = img.copy()
        linesL = self.detect_lines(img)
        goodLines = self.detect_goodLines(linesL, img)
        cps = self.get_good_points(goodLines, img)
        print(cps)
        good_rect = self.choose_rect(cps,frame)
        print(good_rect)
        #print(good_rect)
        #print(cps)
        #print(self.calc_ptp_dists(cps))
        cv2.namedWindow('window')
        cv2.imshow('window', frame)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
