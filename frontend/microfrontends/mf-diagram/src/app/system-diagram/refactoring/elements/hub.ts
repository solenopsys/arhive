import {AbstractElement, DrawElement} from "../abstract";
import {PinElement} from "./pin";
import {HubConf} from "../model";
import {RectElement} from "./rect";
import {TitlesElement} from "./titles";

export class HubElement extends AbstractElement<HubConf> {


    constructor(conf: HubConf) {
        super();
        this.conf = conf;
        const v = conf.sideConnectors;
        let sizes = this.addRect();
        this.addTitles(sizes)
        this.addPins()
    }


    draw(ctx: CanvasRenderingContext2D): void {
        super.drawItems(ctx)
    }

    addTitles(sizes: { w: number, h: number }) {
        this.elements.push({
            element: new TitlesElement({
                exWidth: sizes.w,
                exHeight: sizes.h,
                title: this.conf.title,
                description: this.conf.description,
                color: this.theme().hubFontColor
            })
        })
    }

    addRect(): { w: number, h: number } {
        let conCount = this.conf.sideConnectors;
        let mWidth =  conCount * this.theme().moduleWidth + (conCount - 1) * this.theme().gap ;
        let mHeight = this.theme().moduleWidth;
        this.elements.push(
            {
                element: new RectElement({
                    x: 0,
                    y: 0,
                    width: mWidth,
                    height: mHeight,
                    color: this.theme().hubColor
                })
            }
        )
        return {w: mWidth, h: mHeight};
    }


    addPins() {
        for (let i = 0; i < this.conf.sideConnectors; i++) {
            const xPos = i * (this.theme().moduleWidth + this.theme().gap) - this.theme().moduleWidth + this.theme().padding + -0.5 //rect.x - 2
            const yPos: number = +0.5 // ;

            let basePin = new PinElement({firstArrow: true, secondArrow: true, width: 2, title: "uic"});
            const leftContact: DrawElement = {
                transform: {
                    x: xPos,
                    y: yPos,
                    angle: -90
                },
                element: basePin
            };
            this.elements.push(leftContact)
            const rightContact: DrawElement = {
                transform: {
                    x: xPos ,
                    y: yPos+ this.theme().moduleWidth + this.theme().gap,
                    angle: -90
                },
                element: basePin
            };
            this.elements.push(rightContact)
        }
    }
}