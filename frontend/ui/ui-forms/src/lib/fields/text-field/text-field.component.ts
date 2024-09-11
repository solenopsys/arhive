import {Component, EventEmitter, Input, OnInit} from "@angular/core";
import {AbstractField} from '../../abstract-field.component';

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent
  extends AbstractField<string>
  implements OnInit
{
  @Input()
  password=false;


  ngOnInit(): void {}
}
