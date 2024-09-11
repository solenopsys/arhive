import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BootstrapComponent, FuiTemplatesModule, TABLE_PAGE} from "@solenopsys/uimatrix-templates";
import {DataPageConfig, FieldType} from "@solenopsys/lib-dgraph";
import {FormsModule} from "@angular/forms";
import {createNgxs} from "@solenopsys/lib-storage";
import { FuiGridModule} from "@solenopsys/uimatrix-lists";
import {DgraphDataBuffered} from "@solenopsys/lib-dgraph";
import {CommonModule} from "@angular/common";
import {environment} from "../environments/environment";

export const FILE: DataPageConfig = {
  title: 'File',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'file', title: 'Path', type: FieldType.STRING},
    {key: 'size', title: 'Size', type: FieldType.NUMBER},
    {key: 'temp', title: 'Temporary', type: FieldType.BOOLEAN},
    {key: 'date', title: 'Date & Time', type: FieldType.DATETIME},
    {key: 'file.name', title: 'Name', type: FieldType.STRING},
  ],
  commands: [],
  listQ: 'has(file)',
  dataProvider: DgraphDataBuffered,
};

const TABLES = {
  files: FILE,
};

export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES},
  {provide: 'assets_dir', useValue: "/fm/modules/alexstorm/files"},
  {provide: 'mod_name', useValue: "files"}
]


const routes: Routes = [
  TABLE_PAGE(':table'),
  {path: '', redirectTo: 'files',pathMatch:'full'},
];




export const IMPORTS_CONF = [
  BrowserModule,
  RouterModule.forChild(routes),
  FormsModule,
  FuiTemplatesModule,
  ...createNgxs(!environment.production),
  FuiGridModule,
  CommonModule,
]


@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
  bootstrap: [BootstrapComponent],
})
export class AppModule {}
