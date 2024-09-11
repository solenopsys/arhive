import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RouterModule} from "@angular/router";
import {UIIconsModule} from "@solenopsys/ui-icons";
import {DeclaredService, UtilsModule} from "@solenopsys/ui-utils";
import {LayoutComponent} from "./layout.compoent";

const components:any = [
  LayoutComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    RouterModule,
    UtilsModule,
    UIIconsModule,
  ],
  exports: [

  ]
})
export class UILayoutsModule {
  constructor(private ds: DeclaredService) {
    ds.addComps("@solenopsys/ui-layouts", components)
  }
}
