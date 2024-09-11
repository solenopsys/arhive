import {AbstractElement} from "../abstract";
import {TextConf} from "../model";
import canvasTxt from 'canvas-txt'

export class TextElement extends AbstractElement<TextConf> {


    constructor(conf: TextConf) {
        super()
        this.conf = conf
    }

    draw(ctx:CanvasRenderingContext2D): void {

        const txData: TextConf = this.conf

        ctx.fillStyle = txData.color;
        ctx.imageSmoothingEnabled = true;


        let scaleWidth = this.scale(txData.maxWidth)
        let scaleHeight = this.scale(this.conf.maxHeight);

        canvasTxt.fontWeight = txData.bold ? "bold" : "normal";
        canvasTxt.font = this.theme().font
        canvasTxt.fontSize = txData.size
        canvasTxt.align = 'left'
        canvasTxt.vAlign = 'top'
        canvasTxt.lineHeight = txData.size
        canvasTxt.debug = false
        canvasTxt.justify = false

        canvasTxt.drawText(ctx, txData.text, 0, 0, scaleWidth, scaleHeight)
    }
}

