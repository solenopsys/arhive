import {Component, Input, OnInit} from '@angular/core';
import { ViewType,DataView } from "@solenopsys/ui-utils";

@Component({
  selector: 'ui-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss'],
})
export class DataViewComponent implements OnInit {
  @Input()
  config!: DataView;

  data!: any;

  SYMBOL = ViewType.ELECTRONIC_SYMBOL;
  LAYOUT = ViewType.ELECTRONIC_LAYOUT;
  PART_SYMBOL = ViewType.PART_SYMBOL;
  CELL = ViewType.CELL;

  constructor() {}

  @Input('data')
  set setData(data: string) {
    console.log('INPUT', data);
    this.data = JSON.parse(data);
    console.log('OUTPUT', this.data);
  }

  ngOnInit(): void {}
}
