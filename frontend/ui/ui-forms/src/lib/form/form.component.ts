import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FacetType, FieldType, FormConfig, ICONS_TYPES } from "@solenopsys/ui-utils";

@Component({
  selector: 'ui-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input()
  config!: FormConfig ;
  ICONS = ICONS_TYPES;

  data: any;

  @Output()
  dataChange = new EventEmitter<any>();

  @Output()
  save = new EventEmitter<any>();

  EUID = FieldType.EUID;
  CODE = FieldType.CODE;
  FILE = FieldType.FILE;

  FT_NUMBER = FacetType.NUMBER;

  constructor() {
  }

  ngOnInit(): void {
  }

  @Input('data')
  set setData(data: any) {
    this.data = data;
    this.config?.fields.forEach((field: any) => {
      if (field.type === this.EUID || field.type === this.FILE) {
        const item = this.data[field.key];
        if (!item || item.length === 0) {
          this.data[field.key] = [{uid: '', title: ''}];
        }
      }
    });
  }

  addField(data: any, key: string) {
    if (!data[key]) {
      data[key] = [];
    }

    data[key].push({uid: '', title: ''});
    this.dataChange.emit(this.data);
  }

  deleteField(data: any, key: string, index: number) {
    console.log("REMOVE",data, key, index)
    this.data[key].splice(index, 1);
     this.dataChange.emit(this.data);
  }
}
