from PIL import Image, ImageDraw, ImageFont

# create white background
img = Image.new("RGB", (400, 120), color="white")
draw = ImageDraw.Draw(img)

# if you have a font file, use it; otherwise default
try:
    font = ImageFont.truetype("arial.ttf", 32)
except:
    font = ImageFont.load_default()

# add text
draw.text((10, 40), "Hello OCR Test 123", font=font, fill="black")

# save
img.save("ocr_test.png")
print("✅ Test image saved as ocr_test.png")
