import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from "./modal/modal.component";
import {DeclaredService} from "@solenopsys/ui-utils";


const components = [
  ModalComponent
];

@NgModule({
  imports: [CommonModule,  ],//UIFormsModule UtilsGlobalsModule
  exports: components,
  declarations: [ModalComponent]
})
export class UIModalsModule {
  constructor(private ds: DeclaredService) {
    ds.addComps("@solenopsys/ui-modals", components)
  }
}
