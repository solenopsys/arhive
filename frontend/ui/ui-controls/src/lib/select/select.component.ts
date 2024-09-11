import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FreeProvider, IdTitle} from "../model";




@Component({
  selector: 'ui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent   {


  text!: string;

  @Output()
  textChange = new EventEmitter();

  filteredEntities!: Observable<IdTitle[]>;


  dataProvider!: FreeProvider;


  value!: IdTitle;

  strObservable = new Subject<any>();

  @Output()
  public valueChange = new EventEmitter();


  visible = false;

  
 

  @Input("dataProvider")
  set setDataProvider(dataProvider: FreeProvider) {// todo   warning
    if (dataProvider) {
      this.dataProvider = dataProvider;
      this.filteredEntities = this.dataProvider.initFilterSelector(this.strObservable.asObservable());
      this.strObservable.asObservable().subscribe(z => this.visible = true);
    }
  }

  ngOnDestroy(): void {
    this.strObservable.unsubscribe();
  }

  @Input("value")
  set setValue(value: any) {
    this.showChanges(value);
  }

  showChanges(entity: IdTitle) {
    this.value = entity;
    this.text = this.value?.title;
    this.visible = false;
  }

  selectEntity(entity: IdTitle) {
    this.showChanges(entity);

    this.valueChange.emit(this.value);
  }
}


