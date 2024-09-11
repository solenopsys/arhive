import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {drawElem} from '../draw/shematic.draw';

@Component({
    selector: 'ui-part-symbol',
    templateUrl: './part-symbol.component.html',
    styleUrls: ['./part-symbol.component.scss']
})
export class PartSymbolComponent implements OnInit, AfterViewInit {

    @ViewChild('canvasElement', {static: true})
    canvas: ElementRef<HTMLCanvasElement>;
    private ctx: CanvasRenderingContext2D;

    confData;

    drawSize = {w: 200, h: 200};

    constructor() {
    }

    ngOnInit(): void {
        this.ctx = this.canvas.nativeElement.getContext('2d');
        this.ctx.imageSmoothingEnabled = true;
    }

    @Input('config')
    set setConfig(confData: any[]) {
        this.confData = confData;
        drawElem(this.confData[0], this.ctx); // todo сделать обработку массива
    }

    ngAfterViewInit(): void {
        drawElem(this.confData[0], this.ctx);
    }
}
