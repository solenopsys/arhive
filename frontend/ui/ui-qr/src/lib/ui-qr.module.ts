import {NgModule} from '@angular/core';
import {DeclaredService} from "@solenopsys/ui-utils";
import {QrcodeComponent} from "./qrcode/qrcode.component";



@NgModule({
  declarations: [
    QrcodeComponent

  ],
  imports: [
  ],
  exports: [
    QrcodeComponent
  ]
})
export class UIQrModule {
  constructor(private ds: DeclaredService) {
    ds.addComps("@solenopsys/ui-qr", [
      QrcodeComponent

    ])
  }
}
