import {Component, Input, OnInit} from '@angular/core';
import {ContentNode, ContentNodeType} from "@solenopsys/fl-content";

@Component({
  selector: 'ui-text-view',
  templateUrl: './text-view.component.html',
  styleUrls: ['./text-view.component.scss']
})
export class TextViewComponent implements OnInit {
  @Input()
  blocks: ContentNode[] | undefined;
  TN = ContentNodeType;


  constructor() {
  }


  id: string | undefined;

  ngOnInit(): void {


  }

}
