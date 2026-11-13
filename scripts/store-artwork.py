"""Compose store artwork from real, private-data-free captures and original icon assets.
No synthetic inbox is represented as a real Google account or Safari extension test.
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import textwrap
root=Path(__file__).resolve().parents[1]
fontroot=Path('/System/Library/Fonts/Supplemental')
def font(size,bold=False):return ImageFont.truetype(str(fontroot/('Arial Bold.ttf' if bold else 'Arial.ttf')),size)
def wrapped(draw,text,xy,width,size,color):
 x,y=xy
 words=text.split();line=''
 for word in words:
  candidate=(line+' '+word).strip()
  if draw.textlength(candidate,font=font(size))>width and line:
   draw.text((x,y),line,font=font(size),fill=color);y+=size*1.35;line=word
  else:line=candidate
 if line:draw.text((x,y),line,font=font(size),fill=color);y+=size*1.35
 return y
out=root/'store';out.mkdir(exist_ok=True)
bg='#f8fafd';ink='#303437';muted='#555d63'
im=Image.new('RGB',(1280,800),bg);d=ImageDraw.Draw(im)
icon=Image.open(root/'extension/icons/icon-128.png').convert('RGBA');im.paste(icon,(72,58),icon)
d.text((78,216),'Calendar in Gmail',font=font(52,True),fill=ink)
d.text((80,300),'Open Calendar in the same tab',font=font(28),fill=ink)
d.text((80,340),"from Gmail’s left navigation.",font=font(28),fill=ink)
d.text((80,423),'Free. No ads or tracking.',font=font(24),fill=muted)
wrapped(d,'Expands Gmail’s built-in Calendar companion across the center workspace. Select Mail, Chat or Meet to return.',(80,490),660,21,muted)
# Actual Chrome screenshot: only navigation, no message or event content.
rail=Image.open(root/'assets/chrome-rail-dark.png').convert('RGB')
d.rounded_rectangle((872,64,1184,668),radius=22,fill='#303134')
rail=rail.resize((136,560),Image.Resampling.LANCZOS);im.paste(rail,(960,84))
d.text((886,682),'Installed Chrome extension',font=font(16),fill=muted)
wrapped(d,'This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.',(80,734),1120,14,muted)
im.save(out/'chrome-shortcut-1280x800.png')
im=Image.new('RGB',(440,280),bg);d=ImageDraw.Draw(im);icon=icon.resize((72,72),Image.Resampling.LANCZOS);im.paste(icon,(24,24),icon)
d.text((26,114),'Calendar Rail',font=font(32,True),fill=ink)
d.text((28,163),'Calendar shortcut for Gmail',font=font(19),fill=ink)
d.text((28,222),'Free · No ads or tracking',font=font(16),fill=muted)
im.save(out/'chrome-promo-440x280.png')
# Current, private-data-free installed Chrome captures. No synthetic inbox.
im=Image.new('RGB',(1280,800),bg);d=ImageDraw.Draw(im)
d.text((64,48),'Calendar in the same workspace',font=font(44,True),fill=ink)
d.text((66,115),"Gmail’s built-in Calendar companion, expanded into the center.",font=font(23),fill=muted)
rail=Image.open(root/'assets/chrome-rail-dark.png').convert('RGB');rail.thumbnail((136,480),Image.Resampling.LANCZOS);im.paste(rail,(80,200))
capture=Image.open(root/'assets/chrome-sizing-scrolled-mail.png').convert('RGB');capture.thumbnail((930,180),Image.Resampling.LANCZOS);im.paste(capture,(276,220))
wrapped(d,'Actual installed Chrome extension: left navigation and center workspace header. Captures are cropped to exclude private mail and calendar content.',(276,370),875,20,muted)
wrapped(d,'Calendar companion views are provided by Google. Requires Gmail’s right side panel. No message or event content is read by the extension.',(276,500),850,22,ink)
wrapped(d,'This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.',(64,734),1150,14,muted)
im.save(out/'chrome-workspace-1280x800.png')
print('Composed current Chrome store images from private-data-free installed captures. Safari images require installed Safari acceptance.')
