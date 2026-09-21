"""Pack generated alpha sprites, with row gutters detected rather than assumed.
The user authorized local cutout/packing. No painting or image-model calls here.
"""
from pathlib import Path
from PIL import Image
import cv2
import numpy as np
import json
root = Path(__file__).resolve().parents[1]
counts = [6,8,8,4,5,8,6,6,6,8,8,8]
names = ['idle','running-right','running-left','waving','jumping','failed','waiting','running','review','look-0-7','look-8-15','grabbed']
canvas = Image.new('RGBA',(2048,3072))
for sheet, letter in enumerate('abc'):
    src = Image.open(root/f'assets/pet/v2/actions-{letter}.png').convert('RGBA')
    alpha = np.array(src.getchannel('A'))
    density = (alpha>180).sum(axis=1)
    bounds = [0]
    for i in range(1,4):
        # Generated grids can drift vertically. Split at the actual empty gutter.
        lo,hi=int(src.height*i/4-40),int(src.height*i/4+40)
        candidates = np.flatnonzero(density[lo:hi] <= density[lo:hi].min()+2)+lo
        bounds.append(int(np.median(candidates)))
    bounds.append(src.height)
    cells=[]
    for r in range(4):
        row=[]
        for c in range(8):
            cell=src.crop((round(c*src.width/8),bounds[r],round((c+1)*src.width/8),bounds[r+1]))
            a=np.array(cell.getchannel('A'))
            # Connect nearby antialiased parts, then discard detached dust and
            # neighboring tails that crossed the generator's cell boundary.
            joined=cv2.dilate((a>75).astype('uint8'),np.ones((5,5),np.uint8),iterations=1)
            _,labels,stats,_=cv2.connectedComponentsWithStats(joined,8)
            largest=1+int(np.argmax(stats[1:,cv2.CC_STAT_AREA]))
            keep=(labels==largest).astype('uint8')*255
            a[(keep==0)|(a<35)]=0
            cell.putalpha(Image.fromarray(a))
            box=cell.getbbox()
            assert box, (letter,r,c,'empty')
            row.append(cell.crop(box))
        cells.append(row)
    reference = cells[2] if sheet==1 else cells[0]
    scale=208/float(np.median([im.height for im in reference]))
    for r,row in enumerate(cells):
        target_row=sheet*4+r
        for c,figure in enumerate(row[:counts[target_row]]):
            factor=min(scale,228/figure.width,228/figure.height)
            figure=figure.resize((round(figure.width*factor),round(figure.height*factor)),Image.Resampling.LANCZOS)
            lift = [0,4,16,22,0][c] if target_row==4 else 8 if target_row==11 else 0
            x=(256-figure.width)//2; y=244-figure.height-lift
            assert x>=8 and y>=0,(target_row,c,x,y)
            canvas.alpha_composite(figure,(c*256+x,target_row*256+y))
    print(letter, 'row gutters', bounds, 'scale',round(scale,3))
for row,count in enumerate(counts):
    for col in range(8):
        cell=canvas.crop((col*256,row*256,(col+1)*256,(row+1)*256))
        box=cell.getbbox()
        if col<count:
            assert box and box[0]>=5 and box[1]>=0 and box[2]<=251 and box[3]<=249,(row,col,box)
        else: assert box is None,(row,col,'unused frame must be empty')
canvas.save(root/'app/ui/pet/sprites-v2.png')
(root/'app/ui/pet/sprites-v2.json').write_text(json.dumps({'columns':8,'rows':12,'cellWidth':256,'cellHeight':256,'validFrames':sum(counts),'states':[{'name':name,'row':r,'frames':counts[r]} for r,name in enumerate(names)]},indent=2)+'\n')
print('Packed',sum(counts),'valid frames; unused cells remain transparent')
