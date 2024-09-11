import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

import {drawLayout, drawRect} from '../draw/drawingFunction';
import { SAMSUNG_SCALE } from "../ui-electronic.module";

@Component({
  selector: 'ui-element-layout',
  templateUrl: './element-layout.component.html',
  styleUrls: ['./element-layout.component.scss']
})
export class ElementLayoutComponent implements OnInit {

  @ViewChild('canvasLayout', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  drawSize = {w: 300, h: 100};

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if(this.ctx)
    this.ctx.imageSmoothingEnabled = true;
  }


  @Input('config')
  set setConfig(confData: { copper: [] }) {
    console.log('PRINT CONFIG', confData);

    if(this.ctx){
      drawRect({x: 0, y: 0}, {x: 0, y: 0, w: this.drawSize.w, h: this.drawSize.h}, this.ctx, 'white', SAMSUNG_SCALE);

      drawLayout({x: 0, y: 0}, confData, this.ctx, SAMSUNG_SCALE);
    }

  }
}
