import {Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AbstractField} from "../../abstract-field.component";
import { DataProvider, EntityTitle } from "@solenopsys/ui-utils";

@Component({
  selector: 'ui-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss'],
})
export class SelectFieldComponent
  extends AbstractField<EntityTitle>
  implements OnInit, OnDestroy {
  @Input()
  dataProvider!: DataProvider;

  strObservable = new Subject<string>();
  filteredEntities!: Observable<EntityTitle[]>;

  // @ts-ignore
  value!: any;

  titleInf!: string;


  @Output()
    // @ts-ignore
  valueChange = new EventEmitter<EntityTitle>();

  visible = false;

  @Input('value')
  set setValue(value: any) {
    this.value = value;
    this.titleInf = this.value?.title;
  }

  ngOnInit(): void {
    this.filteredEntities = this.dataProvider.initObserver(
      this.strObservable.asObservable()
    );
    this.strObservable.asObservable().subscribe((z) => (this.visible = true));
  }

  ngOnDestroy(): void {
    this.strObservable.unsubscribe();
  }

  selectEntity(entity: EntityTitle) {
    console.log('UID', entity);
    this.value = entity;
    this.titleInf = this.value?.title;
    console.log('TITLE', this.titleInf);
    this.valueChange.emit(this.value);

    this.visible = false;
  }
}
