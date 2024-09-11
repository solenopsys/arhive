import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Store} from "@ngxs/store";
import {DialogConfig} from "../model";


@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input()
  visible = false;

  @Output()
  visibleChange = new EventEmitter<true>();

  @Input()
  config!: DialogConfig;

  eventSubject = new Subject<boolean>();

//  subscription: Subscription;

  constructor(private store: Store) {
    // this.subscription = this.eventSubject
    //   // .pipe(debounceTime(2,))
    //   .subscribe((value) => {
    //     console.log('set visible', value);
    //     this.visible = value;
    //   });
  }

  ngOnInit(): void {

  }

  setShow(value: any) {
    this.visible = value
    this.visibleChange.emit(value);
    //    this.eventSubject.next(value);
  }

  ngOnDestroy(): void {
//    this.subscription.unsubscribe();
  }

  applyAction(actionWrapper: () => any) {
    this.store.dispatch(actionWrapper())
    this.setShow(false);
  }
}

