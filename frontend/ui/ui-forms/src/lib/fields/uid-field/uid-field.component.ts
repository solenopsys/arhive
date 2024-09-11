import {Component, OnInit} from '@angular/core';
import {AbstractField} from '../../abstract-field.component';

@Component({
  selector: 'ui-uid-field',
  templateUrl: './uid-field.component.html',
  styleUrls: ['./uid-field.component.scss'],
})
export class UIdFieldComponent
  extends AbstractField<string>
  implements OnInit
{
  ngOnInit(): void {}
}
