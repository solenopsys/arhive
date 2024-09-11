import {Component, OnInit} from '@angular/core';
import {AbstractField} from '../../abstract-field.component';

@Component({
  selector: 'ui-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss'],
})
export class NumberFieldComponent
  extends AbstractField<number>
{

}
