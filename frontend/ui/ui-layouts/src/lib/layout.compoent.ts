import {Component, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-layout',
    template: `
     
    <div class="layout-container">
      <ng-container *ngTemplateOutlet="leftNavTemplate"></ng-container>
      <router-outlet></router-outlet>
      <ng-container *ngTemplateOutlet="rightNavTemplate"></ng-container>
    </div>
  `
})
export class LayoutComponent implements OnInit {
   @Input()
   leftNavTemplate!: TemplateRef<any>;
    @Input()
    rightNavTemplate!: TemplateRef<any>;

    constructor() { }

    ngOnInit() {
    }
}