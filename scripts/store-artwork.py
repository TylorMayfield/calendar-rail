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
d.text((78,216),'Calendar below Meet',font=font(52,True),fill=ink)
d.text((80,300),'Open Google Calendar from',font=font(28),fill=ink)
d.text((80,340),"Gmail’s left navigation.",font=font(28),fill=ink)
d.text((80,423),'Free. No ads or tracking.',font=font(24),fill=muted)
wrapped(d,'Uses the active account address to open the matching Calendar in a new tab. If the account is unclear, Google’s account chooser opens.',(80,490),660,21,muted)
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
# Actual macOS containing app, not a claim of installed Safari extension acceptance.
im=Image.new('RGB',(1280,800),bg);d=ImageDraw.Draw(im)
d.text((52,52),'Enable Calendar Rail in Safari',font=font(34,True),fill=ink)
capture=Image.open(root/'assets/safari-companion.png').convert('RGB')
# Crop only titlebar chrome, leaving the actual complete app interface intact.
capture=capture.crop((0,64,capture.width,capture.height))
capture.thumbnail((720,570),Image.Resampling.LANCZOS);im.paste(capture,(552,130))
wrapped(d,'Allow access to mail.google.com so Calendar Rail can add the shortcut and select the active account.',(54,182),400,24,ink)
wrapped(d,'No message or calendar content is read, stored or transmitted.',(54,365),390,23,muted)
d.text((54,560),'macOS companion app',font=font(18),fill=muted)
wrapped(d,'This extension is an independent product and is not affiliated with, endorsed by, or sponsored by Google or any Google product.',(54,730),1150,14,muted)
im.save(out/'safari-setup-1280x800.png')
print('Composed store images from actual Chrome rail and macOS companion captures.')
