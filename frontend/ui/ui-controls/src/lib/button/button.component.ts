import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ButtonComponent implements OnInit {

  @Input()
  title:string|undefined;

  @Input()
  icon:string|undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
