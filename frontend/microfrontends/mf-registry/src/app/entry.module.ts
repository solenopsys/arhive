import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { RouterModule, Routes } from "@angular/router";
import { BootstrapComponent, TABLE_PAGE } from "@solenopsys/ui-templates";
import { FormsModule } from "@angular/forms";
import { TABLES } from "./tables.config";

const routes: Routes = [
  TABLE_PAGE(':table'),
];

export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES},
  {provide: 'assets_dir', useValue: "/fm/modules/mf-registry"},
  {provide: 'mod_name', useValue: "registry"}
]

export const IMPORTS_CONF = [
  BrowserModule,
  RouterModule.forChild(routes),
  FormsModule,
]


@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
  bootstrap: [BootstrapComponent],
})
export class RemoteEntryModule {}


