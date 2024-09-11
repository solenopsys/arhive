import {Component, Input, ViewEncapsulation} from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'ui-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ChartComponent {

  @Input()
  options!: EChartsOption;
  constructor() {
  }
}
