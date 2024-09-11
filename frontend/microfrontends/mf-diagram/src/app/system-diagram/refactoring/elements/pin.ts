import {ContactConf, Point, PolygonConf, TextConf} from "../model";
import {AbstractElement} from "../abstract";
import {PolygonElement} from "./polygon";
import {TextElement} from "./text";

export class PinElement extends AbstractElement<ContactConf> {

    constructor(conf: ContactConf) {
        super();
        this.conf = conf
        this.addPolygon()
        this.addTitle()
    }

    draw(ctx:CanvasRenderingContext2D): void {
        this.drawItems(ctx)
    }

    addPolygon(){
        const half = 1 / 2
        const contact = this.conf
        const startPoint = {x: half, y: 0}
        const endPoint = {x: half+contact.width, y: 0}

        const topPoints = [
            startPoint,
            endPoint
        ]

        const bottomPoints = [
            {x: endPoint.x, y: endPoint.y+1},
            {x: startPoint.x, y: startPoint.y+1}]

        let rightArrow = contact.secondArrow ? [{x: endPoint.x + half, y: endPoint.y + half}] : [];
        let leftArrow = contact.firstArrow ? [{x: startPoint.x - half, y: startPoint.y + half}] : [];

        const points= [
            ...topPoints,
            ...rightArrow,
            ...bottomPoints,
            ...leftArrow
        ];

        let polygonConf:PolygonConf = {points };
        let polygonElement = new PolygonElement(polygonConf);
        this.elements.push({element: polygonElement})
    }


    addTitle() {
        const titleText: TextConf = {
            text: this.conf.title,
            color: this.theme().contactFontColor,
            size: this.theme().contactFontSize,
            bold: true,
            maxWidth: this.conf.width,
            maxHeight: 1,
        }
        this.elements.push(
            {
                transform: {
                    x: 0.75,
                    y: 0.15,
                    angle: 0
                },
                element: new TextElement(titleText)
            }
        );

    }

}
