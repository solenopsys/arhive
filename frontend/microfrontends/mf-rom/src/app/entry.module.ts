import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {TABLES_CONFS} from "./rom-module/tables.config";
import {HttpClientModule} from "@angular/common/http";
import {BootstrapComponent, TABLE_PAGE, UITemplatesModule} from "@solenopsys/ui-templates";
import {NgxEchartsModule} from "ngx-echarts";
import {ResourcesState} from "./rom-module/stores/resources.store";
import {ProcessesState} from "./rom-module/stores/processes.store";
import {GoalState} from "./rom-module/stores/goals.store";
import {LinkState} from "./rom-module/stores/links.store";
import {VirtualPlanComponent} from "./rom-module/virtual-plan-component/virtual-plan.component";
import {NewPlanComponent} from "./rom-module/new-plan/new-plan.component";
import {PlanResourceEditorComponent} from "./rom-module/plan-resource-editor/plan-resource-editor.component";
import {PlanProcessEditorComponent} from "./rom-module/plan-process-editor/plan-process-editor.component";
import {RunningPageComponent} from "./rom-module/running-page/running-page.component";
import {ROMModule} from "./rom-module/r-o-m.module";
import {UIListsModule} from "@solenopsys/ui-lists";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";


export const routes: Routes = [
  //{path: '', component: TextPageComponent, data: {uid: '0x2994d'}},
  {
    path: 'goals/plan', component: VirtualPlanComponent, children: [{
      path: ':id', component: NewPlanComponent, children: [
        {
          path: 'resource/:id', component: PlanResourceEditorComponent
        },
        {
          path: 'process/:id', component: PlanProcessEditorComponent
        },
      ]
    }]
  },
  {path: 'running', component: RunningPageComponent},
  {path: 'data', redirectTo: 'rom/data/time',pathMatch:'full'},
  TABLE_PAGE(':table'),
];



export class MarkedLogger {

  constructor(private label:string) {}

  log(value: any, ...rest: any[]) {
    if (true) {
      console.log(this.label,": ",value, ...rest);
    }
  }

  error(error: Error) {
    //  this.errorHandler.handleError(error);
  }

  warn(value: any, ...rest: any[]) {
    console.warn(this.label,": ",value, ...rest);
  }
}

const log=new MarkedLogger(" ROM")


export const STATES=[ResourcesState, ProcessesState, GoalState, LinkState]


export const IMPORTS_CONF = [
  HttpClientModule,
  ROMModule,
  NgxEchartsModule,
  UIListsModule,
  UITemplatesModule,
  RouterModule.forChild(routes),
  BrowserModule,
  CommonModule,
]


export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES_CONFS},
  {provide: 'assets_dir', useValue: "/fm/modules/mf-rom"},
  {provide: 'mod_name', useValue: "rom"}
]


@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [
    ...PROVIDERS_CONF
  ]})
export class RemoteEntryModule {
}
