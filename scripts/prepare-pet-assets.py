"""Pack approved generated art. Sources: imagegen + macOS Vision alpha masks.
No model/network call. Keep each character on the same foot baseline.
"""
from pathlib import Path
from PIL import Image, ImageDraw
import cv2
import numpy as np
root = Path(__file__).resolve().parents[1]
src = Image.open(root/'assets/pet/sprites-cutout-source.png').convert('RGBA')
cw,ch=src.width//4,src.height//6
out=Image.new('RGBA',(1024,1536))
for row in range(6):
    for col in range(4):
        cell=src.crop((col*cw,row*ch,(col+1)*cw,(row+1)*ch))
        a=np.array(cell.getchannel('A'))
        # Remove isolated cutout dust; retain all connected parts of the main figure.
        _, labels, stats, _=cv2.connectedComponentsWithStats((a>90).astype('uint8'),8)
        keep=np.zeros_like(a)
        for i in range(1,len(stats)):
            if stats[i,cv2.CC_STAT_AREA]>25:keep[labels==i]=255
        keep=cv2.dilate(keep,np.ones((3,3),np.uint8),iterations=1)
        a[keep==0]=0
        a[a<30]=0
        cell.putalpha(Image.fromarray(a))
        bounds=cell.getbbox()
        figure=cell.crop(bounds)
        figure.thumbnail((224,236),Image.Resampling.LANCZOS)
        # Center on the face/body axis rather than tail-dependent bounding-box center.
        # Fixed cell coordinates already give the generator a common body anchor.
        x=(256-figure.width)//2
        out.alpha_composite(figure,(col*256+x,row*256+248-figure.height))
out.save(root/'app/ui/pet/sprites.png')
# Rebuild the icon's opaque dark plate, preserving the generated artwork alpha.
logo=Image.open(root/'assets/pet/logo-source.png').convert('RGBA').resize((1024,1024),Image.Resampling.LANCZOS)
plate=Image.new('RGBA',logo.size,'#20212b');plate.alpha_composite(logo)
mask=Image.new('L',logo.size);ImageDraw.Draw(mask).rounded_rectangle((0,0,1023,1023),radius=185,fill=255)
plate.putalpha(mask)
for name in ['assets/docs/logo.png','assets/docs/app-icon.png','characters/xiaoheiyu/avatar.png','app/src-tauri/icons/icon.png']:
    plate.save(root/name)
iconset=root/'output/pet/Aibo.iconset';iconset.mkdir(parents=True,exist_ok=True)
for size in [16,32,128,256,512]:
    for scale in [1,2]:
        plate.resize((size*scale,size*scale),Image.Resampling.LANCZOS).save(iconset/f'icon_{size}x{size}{"@2x" if scale==2 else ""}.png')
print('Prepared 24 frames and app icon')
