import {AbstractElement} from "../abstract";
import {ContactConf, PolygonConf, RectConf} from "../model";


export class PolygonElement extends AbstractElement<PolygonConf> {

    constructor(conf: PolygonConf) {
        super();
        this.conf = conf
    }


    draw(ctx:CanvasRenderingContext2D): void {
        ctx.beginPath();
        const vertices= this.conf.points
        ctx.moveTo(super.scale(vertices[0].x), super.scale(vertices[0].y));
        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(super.scale(vertices[i].x), super.scale(vertices[i].y));
        }

        ctx.closePath();
        ctx.strokeStyle = super.theme().contactBorderColor;
        ctx.fillStyle = super.theme().contactColor;

        ctx.stroke();
        ctx.fill();
    }
}
