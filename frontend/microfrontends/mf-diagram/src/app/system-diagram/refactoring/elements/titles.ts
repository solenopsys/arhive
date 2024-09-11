import {AbstractElement} from "../abstract";
import {TextConf, TitlesConf} from "../model";
import canvasTxt from 'canvas-txt'
import {TextElement} from "./text";

export class TitlesElement extends AbstractElement<TitlesConf> {

    titleHeight = 1

    constructor(conf: TitlesConf) {
        super()
        this.conf = conf
        this.addTitle()
        this.addDescription()
    }

    addTitle() {
        const titleText: TextConf = {
            text: this.conf.title,
            color: this.conf.color,
            size: this.theme().titleFontSize,
            bold: true,
            maxWidth: this.conf.exWidth - this.theme().titlesPadding * 2,
            maxHeight: this.titleHeight,
        }
        this.elements.push(
            {
                transform: {
                    x: this.theme().titlesPadding,
                    y: this.theme().titlesPadding,
                    angle: 0
                },
                element: new TextElement(titleText)
            }
        );

    }

    addDescription() {
        const titleText: TextConf = {
            text: this.conf.description,
            color: this.conf.color,
            size: this.theme().descriptionFontSize,
            bold: false,
            maxWidth: this.conf.exWidth - this.theme().titlesPadding * 2,
            maxHeight: this.conf.exWidth - this.theme().titlesPadding * 2 - this.titleHeight,
        }
        this.elements.push(
            {
                transform: {
                    x: this.theme().titlesPadding,
                    y: this.theme().titlesPadding+ this.titleHeight,
                    angle: 0
                },
                element: new TextElement(titleText)
            }
        );

    }


    draw(ctx: CanvasRenderingContext2D): void {
        this.drawItems(ctx)
    }
}

