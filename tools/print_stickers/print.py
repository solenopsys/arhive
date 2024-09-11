
from PIL import Image
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster
import logging
import logging.handlers

def print_sticker(file):
    backend = "network"
    model = "QL-810W"
    printer = "tcp://192.168.188.216:9100"

    qlr = BrotherQLRaster(model)
    qlr.add_status_information()
    qlr.exception_on_warning = False

    ant = Image.open(file, 'r')

    instructions = convert(

        qlr=qlr,
        images=[ant],  # Takes a list of file names or PIL objects.
        label='62red',
        rotate='0',  # 'Auto', '0', '90', '270'
        threshold=70.0,  # Black and white threshold in percent.
        dither=False,
        compress=False,
        red=False,  # Only True if using Red/Black 62 mm label tape.
        dpi_600=False,
        hq=True,  # False for low quality.
        cut=True

    )
    return send(instructions=instructions, printer_identifier=printer, backend_identifier=backend, blocking=True)

logger = logging.getLogger('brother_ql')
logger.setLevel(logging.DEBUG)
handler = logging.handlers.RotatingFileHandler(
    "test.log", maxBytes=(1048576*5), backupCount=7
)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)
print(print_sticker("img_3.png"))