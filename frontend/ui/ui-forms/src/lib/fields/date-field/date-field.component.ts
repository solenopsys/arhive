import {Component, Input} from '@angular/core';
import {AbstractField} from '../../abstract-field.component';

@Component({
  selector: 'ui-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['./date-field.component.scss'],
})
export class DateFieldComponent
  extends AbstractField<string>

{
  @Input()
  time = false;



  extract() {
    const string1: string = this.value;
    if (string1) {
      return string1.split('T')[0];
    } else {
      return string1;
    }
  }

  transformBack($event:any) {
    this.valueChange.emit($event);
  }
}
