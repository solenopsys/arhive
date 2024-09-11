import {drawItem} from './drawingFunction';


const GAP = 10;
const PIN_LENGTH = 10;

const FIELD_SIZE = 30;

export type IcInterface ={
    size: { width: number; height: number };
    pins: {
        sides: { [key: string]: string[] },
        params?: { [key: string]: { color?: string, n?: number } }
    };
    view: { box: boolean; title: boolean };
    symbol?: any[];
}

export type Point = {
    x: number;
    y: number;
}

export type SchemeConf = {
    width: number;
    height: number;
    elements: { angle: number; position: Point, element: IcInterface }[];
    wires: Point[][];
}


export enum Side {
    LEFT,
    RIGHT,
    TOP,
    BOTTOM
}

export interface GraphObj {
    draw(ctx: CanvasRenderingContext2D);
}

export class ElementBox implements GraphObj {

    bodyW = 80;
    bodyH = 100;


    readonly angleRad = 90 * Math.PI / 180;

    pins = {}; // : { key: Side, val: BoxPin }

    symbolConfig;

    constructor(x: number, y: number) {
        this.bodyW = GAP + x * GAP;
        this.bodyH = GAP + y * GAP;
    }


    public addPin(n: number, name: string, color: string, side?: Side) {
        console.log('SIDE', side);
        const mirrored = Side.RIGHT === side || Side.TOP === side;
        if (this.pins[side] === undefined) {
            this.pins[side] = [];
        }
        this.pins[side].push(new BoxPin(mirrored, n, name, color));
    }

    public draw(ctx: CanvasRenderingContext2D) {

        ctx.beginPath();

        let bw = this.bodyW + PIN_LENGTH;
        let bh = this.bodyH + PIN_LENGTH;

        let leftT = false;
        let topT = false;


        if (this.pins[Side.LEFT]) {
            leftT = true;
            bw = bw + FIELD_SIZE;
        }

        if (this.pins[Side.RIGHT]) {
            bw = bw + FIELD_SIZE;
        }

        if (this.pins[Side.TOP]) {
            topT = true;
            bh = bh + FIELD_SIZE;
        }

        if (this.pins[Side.BOTTOM]) {
            bh = bh + FIELD_SIZE;
        }


        ctx.rect(0, 0, bw + PIN_LENGTH, bh + PIN_LENGTH);
        ctx.fillStyle = '#f1f0f0';
        ctx.fill();
        const pns = this.pins;

        Object.keys(this.pins).forEach(key => {
            const rotateOk = Side.TOP + '' === key || Side.BOTTOM + '' === key;

            const bhf = bh + PIN_LENGTH;
            if (rotateOk) {
                ctx.rotate(-this.angleRad);
                ctx.translate(-bhf, 0);
            }

            pns[key].forEach(item => {
                const offset = (item.n) * GAP - GAP / 2 + PIN_LENGTH + (leftT && rotateOk || topT && !rotateOk ? FIELD_SIZE : 0);
                const x = item.mirrored ? (rotateOk ? bh : bw) : 0;

                ctx.translate(x, offset);
                item.draw(ctx);
                ctx.translate(-x, -offset);

            });

            if (rotateOk) {
                ctx.translate(bhf, 0);
                ctx.rotate(this.angleRad);
            }


        });

        if (this.symbolConfig) {
            const symbol = new Symbol(this.symbolConfig);
            symbol.draw(ctx);
        }

    }


}

export class Symbol implements GraphObj {

    constructor(public configData) {
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.configData.forEach(graph => {
            drawItem(graph.type, {x: 0, y: 0}, graph, ctx, 'black');
        });
    }

}

export class BoxPin implements GraphObj {
    readonly TEXT_GAP = 5;
    readonly PIN_HEIGHT = 8;

    constructor(public mirrored: boolean, public n: number, private name: string, private color: string) {
    }

    draw(ctx: CanvasRenderingContext2D) {

        let x: number;
        let textX: number;
        x = 0;
        if (!this.mirrored) {
            textX = this.TEXT_GAP + PIN_LENGTH;
        } else {
            textX = -this.TEXT_GAP;
        }


        ctx.beginPath();
        console.log('TRANSFORM', this.name, x, PIN_LENGTH, this.PIN_HEIGHT, ctx.getTransform().e, ctx.getTransform().f);
        ctx.rect(x, 1, PIN_LENGTH, this.PIN_HEIGHT);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = this.color;

        const yGap = GAP / 2;
        const xGap = GAP / 2;
        if (!this.mirrored) {
            ctx.lineTo(x + PIN_LENGTH, yGap);
            ctx.lineTo(x + PIN_LENGTH + xGap, yGap);
        } else {
            ctx.textAlign = 'right';

            ctx.lineTo(x, yGap);
            ctx.lineTo(x - xGap, yGap);
        }


        ctx.stroke();


        ctx.fillStyle = 'black';
        ctx.font = '8px roboto';


        ctx.textAlign = !this.mirrored ? 'left' : 'right';

        ctx.fillText(this.name, textX, 3, FIELD_SIZE);
    }
}

export function drawElem(ic: any, ctx: CanvasRenderingContext2D): any {
    const eb = new ElementBox(ic.size.width, ic.size.height);

    Object.keys(ic.pins.sides).forEach(side => {
        console.log('SIDE1', side);
        const sidesConf = ic.pins.sides[side];
        sidesConf.forEach((pinConfName, index) => {
            console.log('PIN_NAME', pinConfName);

            const pinSide = Side[side.toUpperCase()];

            const pinConf: { pin: string, n?: number, color?: string } = ic.pins.params ? ic.pins.params [pinConfName] : undefined;
            const id = pinConf?.n ? pinConf.n : index + 1;
            const pinColor = pinConf?.color ? pinConf.color : 'black';


            eb.addPin(id, pinConfName, pinColor, pinSide);
        });
    });
    eb.symbolConfig = ic.symbol;
    eb.draw(ctx);
}

export function drawWire(wire: Point[], ctx: CanvasRenderingContext2D) {
    const scale = 10;
    wire.forEach(point => {
        ctx.lineWidth = 1;
        // ctx.lineCap = 'round';
        ctx.lineTo(point.x * scale, point.y * scale);
        ctx.stroke();
    });
}
