import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import {  UITemplatesModule, TABLE_PAGE } from "@solenopsys/ui-templates";
import { ObjectsStatComponent } from "./objects-stat/objects-stat.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TABLES_CONFS } from "./tables.config";
import { UIListsModule } from "@solenopsys/ui-lists";
import { FormsModule } from "@angular/forms";
import { DashboardComponent } from "./dashboard/dashboard.component";


const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'stat', component: ObjectsStatComponent},
  TABLE_PAGE(':table'),
];

export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES_CONFS},
  {provide: 'assets_dir', useValue: "/fm/modules/mf-inventory"},
  {provide: 'mod_name', useValue: "inventory"}
]


export const IMPORTS_CONF = [
  CommonModule,
  BrowserModule,  FormsModule,
  UIListsModule,
  UITemplatesModule,
  RouterModule.forChild(routes),
]

@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF,
  ],
  providers: [...PROVIDERS_CONF],
})
export class RemoteEntryModule {}
