import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {StagesComponent} from "../stages/stages.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [StagesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{
      path: "",
      component: StagesComponent,
    }]),
  ],
  providers: [],
})

export class RemoteEntryModule {}
