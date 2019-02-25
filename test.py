import requests

r = requests.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCO_w8U7D9kmtgObpM4qzgqkYifsu9_Oi4')

with open("log.txt") as log:
    log.write(r.json())
