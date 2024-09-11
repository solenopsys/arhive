import sys

from PIL import Image, ImageDraw, ImageFont
import qrcode
import os
import textwrap
import requests
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster
from os import listdir
from os.path import isfile, join


def gen_sticker(title, id, file):
    out = Image.new("RGB", (566, 165), (255, 255, 255))

    fnt = ImageFont.truetype("JetBrainsMono-Bold.ttf", 30)
    fnt2 = ImageFont.truetype("JetBrainsMono-Medium.ttf", 30)

    d = ImageDraw.Draw(out)

    lines = '\n'.join(textwrap.wrap(title, width=18))
    d.multiline_text((230, 0), lines, font=fnt, fill=(0, 0, 0))
    d.multiline_text((230, 120), "ID:" + id, font=fnt2, fill=(0, 0, 0))

    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=7,
        border=1,
    )
    qr.add_data(id)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    ant = Image.open("img_4.png", 'r')
    out.paste(ant, (0, 35))
    out.paste(img, (55, 0))

    transposed = out.transpose(Image.ROTATE_270)

    transposed.save(file)


gen_sticker("Ячейка открытая553 jlsjdfljsdlfsd   №144443", "0xea623", 'out.png')


def loadGroup(id):
    data = {
        "query": "{  res(func:  has(rom.object),orderasc: name)  @cascade{\n uid\n  rom.object\n    name\n     whereis @filter(uid(" + id + ")){     uid} }}",
        "variables": {}}
    headers = {'Content-type': 'application/json'}
    r = requests.post('http://dgraph.cluster.local:8080/query?timeout=20s', json=data, headers=headers)
    return r.json()['data']['res']


def getAll():
    i = 0
    storages = loadGroup('0x16188')
    for storage in storages:

        i = i + 1
        print(storage)

        storId = storage['uid']
        subs = loadGroup(storId)
        dir = "print/" + storage['name']
        # os.mkdir(dir)

        gen_sticker(storage['name'], storage['uid'], dir + "/" + storage['uid'] + '.png')

        for sub in subs:
            i = i + 1
            gen_sticker(sub['name'], sub['uid'], dir + "/" + sub['uid'] + '.png')
            print(sub)
            print(i)


def print_sticker(file):
    backend = "network"
    model = "QL-810W"
    printer = "tcp://192.168.88.251:9100"

    qlr = BrotherQLRaster(model)
    qlr.exception_on_warning = True
    kwargs = {}
    kwargs['cut'] =True
    kwargs['label'] = "17x54"
    ant = Image.open(file, 'r')
    kwargs['images'] = [ant]
    instructions = convert(qlr=qlr, **kwargs)
    send(instructions=instructions, printer_identifier=printer, backend_identifier=backend, blocking=True)

def print_dir(group):
    fullDir="print/"+group
    onlyfiles = [f for f in listdir(fullDir) if isfile(join(fullDir, f))]
    for fl in onlyfiles:
        fullPath=fullDir+"/"+fl

        print_sticker(fullPath)
print_dir("Органайзер №1")
