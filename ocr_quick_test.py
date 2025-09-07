import easyocr
reader = easyocr.Reader(["en"])  # specify language
results = reader.readtext("ocr_test.png")  # path to your image
text = " ".join([res[1] for res in results])
print("OCR result:", text)
