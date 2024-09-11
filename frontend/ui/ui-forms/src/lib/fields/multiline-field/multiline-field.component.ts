import {Component, OnInit} from '@angular/core';
import {AbstractField} from '../../abstract-field.component';

@Component({
  selector: 'ui-multiline-field',
  templateUrl: './multiline-field.component.html',
  styleUrls: ['./multiline-field.component.scss'],
})
export class MultilineFieldComponent
  extends AbstractField<string>
  implements OnInit
{
  ngOnInit(): void {}
}
