import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {calcOffset, drawItem, drawRect, extractOutline} from '../draw/drawingFunction';
import { SAMSUNG_SCALE } from "../ui-electronic.module";


@Component({
  selector: 'ui-element-view',
  templateUrl: './element-view.component.html',
  styleUrls: ['./element-view.component.scss']
})
export class ElementViewComponent implements OnInit {
  @ViewChild('canvasElement', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  drawSize = {w: 100, h: 100};

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx)
      this.ctx.imageSmoothingEnabled = true;
  }

  @Input('config')
  set setConfig(confData: any[]) {

    const res = extractOutline(confData);

    const offsetPoint = calcOffset(res, this.drawSize);
    console.log(res);

    if (this.ctx) {
      drawRect({x: 0, y: 0}, {x: 0, y: 0, w: this.drawSize.w, h: this.drawSize.h}, this.ctx, 'white', SAMSUNG_SCALE);
      confData.forEach(graph => {
        if (this.ctx) {
          drawItem(graph.type, offsetPoint, graph, this.ctx, 'black');
        }
      });
    }

  }

}
