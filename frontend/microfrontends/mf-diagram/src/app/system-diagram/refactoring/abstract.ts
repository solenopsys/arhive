import {BASE_THEME, Theme} from "./config";

export function drawItem(ctx: CanvasRenderingContext2D, elementDraw: DrawElement, gridPith: number) {


    const transform = elementDraw.transform;
    if (transform) {
        ctx.save();
        const x = transform.x * gridPith;
        const y = transform.y * gridPith;
        ctx.translate(x, y);
        ctx.rotate(Math.PI * (transform.angle / 90) / 2);
        elementDraw.element.draw(ctx)
        ctx.translate(-x, -y);
        ctx.restore();
    } else {
        elementDraw.element.draw(ctx)
    }
}

export interface Element {
    draw(ctx: CanvasRenderingContext2D): void

    scale(value: number): number

    theme(): Theme
}

export type DrawElement = {
    element: Element
    transform?: { x: number, y: number, angle: number }
}

export abstract class AbstractElement<T> implements Element {
    protected conf: T
    elements: DrawElement[] = []


    abstract draw(ctx: CanvasRenderingContext2D): void


    drawItems(ctx: CanvasRenderingContext2D) {
        for (let elementDraw of this.elements) {
            drawItem(ctx, elementDraw, this.theme().gridPitch)
        }
    }

    public scale(value: number): number {
        return value * this.theme().gridPitch
    }

    theme(): Theme {
        return BASE_THEME;
    }
}