import {AbstractElement} from "../abstract";
import {HubConf, RectConf} from "../model";


export class RectElement extends AbstractElement<RectConf> {

    constructor(conf: RectConf) {
        super()
        this.conf = conf
    }
    draw(ctx:CanvasRenderingContext2D): void {
        ctx.fillStyle = this.conf.color;
        ctx.fillRect(
            this.scale(this.conf.x),
            this.scale(this.conf.y),
            this.scale(this.conf.width),
            this.scale(this.conf.height)
        );
    }
}
