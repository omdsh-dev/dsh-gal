"""Normalize generated sprite cells and append the meme series to the existing atlas.
Mechanical atlas packing only: preserve generated character pixels and alpha.
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image
root=Path(__file__).resolve().parents[1]
source=Image.open(root/'assets/pet/memes/generated-sheet.png').convert('RGBA')
assert source.size==(2048,768)
canvas=Image.new('RGBA',(2048,3840))
canvas.paste(Image.open(root/'app/ui/pet/sprites-v2.png'),(0,0))
cells=[]
for row in range(3):
    frames=[]
    for col in range(8):
        cell=source.crop((col*256,row*256,(col+1)*256,(row+1)*256))
        alpha=np.array(cell.getchannel('A'))
        # Remove only near-transparent model matte dust, not white clothing.
        alpha[alpha<35]=0
        cell.putalpha(Image.fromarray(alpha))
        box=cell.getbbox()
        assert box,(row,col)
        frames.append(cell.crop(box))
    cells.append(frames)
# One common scale preserves natural seated height and limb proportions.
scale=min(208/np.median([f.height for f in cells[0]]),228/max(f.width for row in cells for f in row))
for row,frames in enumerate(cells):
    for col,figure in enumerate(frames):
        figure=figure.resize((round(figure.width*scale),round(figure.height*scale)),Image.Resampling.LANCZOS)
        canvas.alpha_composite(figure,(col*256+(256-figure.width)//2,(row+12)*256+244-figure.height))
        box=canvas.crop((col*256,(row+12)*256,(col+1)*256,(row+13)*256)).getbbox()
        assert box and box[0]>=5 and box[1]>=8 and box[2]<=251 and box[3]<=246,(row,col,box)
canvas.save(root/'app/ui/pet/sprites-v3.png')
manifest=json.loads((root/'app/ui/pet/sprites-v2.json').read_text())
manifest['rows']=15;manifest['validFrames']=105
manifest['states'] += [{'name':name,'row':row+12,'frames':8,'series':'meme'} for row,name in enumerate(['meme-rice','meme-nap','meme-book'])]
(root/'app/ui/pet/sprites-v3.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Packed 105 frames, including 24 meme frames; scale',round(scale,4))
