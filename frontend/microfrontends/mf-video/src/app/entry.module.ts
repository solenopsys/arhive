import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {RouterModule, Routes} from '@angular/router';
import {BootstrapComponent, TABLE_PAGE, UITemplatesModule} from "@solenopsys/ui-templates";
import {TABLES} from "./tables.config";
import {CamerasListComponent} from "./cameras-list/cameras-list.component";
import {FormsModule} from "@angular/forms";
import {UIListsModule} from "@solenopsys/ui-lists";
import {CommonModule} from "@angular/common";
import {VideoComponent} from "@solenopsys/ui-controls";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor-v2";
import {UtilsModule} from "@solenopsys/ui-utils";
import {VideoModule} from "./video.module";


export const PROVIDERS_CONF = [
  {provide: 'tables', useValue: TABLES},
  {provide: 'assets_dir', useValue: "/fm/modules/mf-video"},
  {provide: 'mod_name', useValue: "video"}
]


export function onMonacoLoad() {

  console.log('MONACO OK', (window as any).monaco);
  (window as any).monaco.languages.typescript.typescriptDefaults.addExtraLib('export function drawPins() {\n' +
      '    console.log(\'OK\');\n' +
      '}\n');
}

const routes: Routes = [
  {
    path: 'video', component: CamerasListComponent, children: [
      {path: ':camera', component: VideoComponent}
    ]
  },
  TABLE_PAGE(':table'),
  {path: 'video', redirectTo: 'video/video',pathMatch:'full'},
];



const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: {scrollBeyondLastLine: false},
  onMonacoLoad
};

export const IMPORTS_CONF = [
  BrowserModule,
  RouterModule.forRoot(routes),
  FormsModule,
  UITemplatesModule,

  MonacoEditorModule.forRoot(monacoConfig),
  UIListsModule,
  VideoModule,
  CommonModule,
  UtilsModule,
]


@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
  bootstrap: [],
})
export class RemoteEntryModule {}
