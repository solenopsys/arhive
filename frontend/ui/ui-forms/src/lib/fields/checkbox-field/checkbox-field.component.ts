import {Component, Input, OnInit} from '@angular/core';
import {AbstractField} from '../../abstract-field.component';

@Component({
  selector: 'ui-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
})
export class CheckboxFieldComponent
  extends AbstractField<boolean>
  implements OnInit
{
  ngOnInit(): void {
    if (!this.value) {
      this.value = false;
    }
  }

  @Input('value')
  set setData(value:(string|boolean)){
    this.value = value === 'true' || value === true;
  }
}
