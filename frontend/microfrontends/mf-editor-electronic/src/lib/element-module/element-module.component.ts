import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {drawElem, drawWire, SchemeConf} from '../draw/shematic.draw';

@Component({
  selector: 'ui-element-module',
  templateUrl: './element-module.component.html',
  styleUrls: ['./element-module.component.scss']
})
export class ElementModuleComponent implements OnInit, AfterViewInit {
  @Input()
  schemeConf!: SchemeConf;

  compW!: number;
  compH!: number;

  dimension = 10;


  @ViewChild('canvasElement12', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D | null;

  pins!: { top?: [], left?: [], right?: [], bottom?: [] };

  constructor() {
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx)
      this.ctx.imageSmoothingEnabled = true;
    this.compW = (this.schemeConf.width ? this.schemeConf.width : 200) * this.dimension;
    this.compH = (this.schemeConf.height ? this.schemeConf.width : 200) * this.dimension;
  }

  @Input('config')
  set setConfig(confData: SchemeConf) {
    this.schemeConf = confData;
    if (this.ctx) {
      this.draw();
    }
  }


  ngAfterViewInit(): void {
    if (this.ctx && this.schemeConf) {
      this.draw();
    }
  }

  private draw() {
    // @ts-ignore
    this.ctx.lineWidth = 0.2;
    //   this.drawGrid();


    console.log('CONF', this.schemeConf);
    this.schemeConf.wires.forEach(wire => {
      if (this.ctx) {
        this.ctx.beginPath();

        drawWire(wire, this.ctx);
      }
    });

    this.drawElements();

  }

  private drawGrid() {
    if (this.ctx) {
      for (let i = 0; i < this.schemeConf.width + 1; i++) {
        this.ctx.beginPath();
        this.ctx.lineTo(i * 10, 0);
        this.ctx.lineTo(i * 10, this.schemeConf.height * 10);
        this.ctx.stroke();
      }

      for (let i = 0; i < this.schemeConf.height + 1; i++) {
        this.ctx.beginPath();
        this.ctx.lineTo(0, i * 10);
        this.ctx.lineTo(this.schemeConf.width * 10, i * 10);
        this.ctx.stroke();
      }
    }

  }

  private drawElements() {
      this.schemeConf.elements.forEach(element => {
        const x = element.position.x * this.dimension;
        const y = element.position.y * this.dimension;
        const angle = element.angle;
        // @ts-ignore
        this.ctx.translate(x, y);
        // @ts-ignore
        this.ctx.rotate(angle * Math.PI / 180);
        // @ts-ignore
        drawElem(element.element, this.ctx);
        // @ts-ignore
        this.ctx.rotate(angle * Math.PI / 180);
        // @ts-ignore
        this.ctx.translate(-x, -y);
      });
  }

  click($event: MouseEvent) {
    console.log('CLICK', $event);
  }
}
