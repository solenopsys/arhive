import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {UIControlsModule} from '@solenopsys/ui-controls';
import {DeclaredService} from "@solenopsys/ui-utils";
import {CodeAreaComponent} from "./code-area/code-area.component";
import {FormsModule} from "@angular/forms";
import {MonacoEditorModule, NgxMonacoEditorConfig} from "ngx-monaco-editor-v2";
import {CodePageComponent} from "./code-page.component";

export function onMonacoLoad() {
  console.log('MONACO START');
 // console.log('MONACO OK', (window as any).monaco);
  // (window as any).monaco.languages.typescript.typescriptDefaults.addExtraLib('export function drawPins() {\n' +
  //     '    console.log(\'OK\');\n' +
  //     '}\n');
}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: {scrollBeyondLastLine: false},
  onMonacoLoad
};


@NgModule({
  declarations: [
    CodeAreaComponent,
    CodePageComponent
  ],
  imports: [


    FormsModule,
    CommonModule,
    RouterModule,
    UIControlsModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CodePageComponent,
      },
      //   TABLE_PAGE(':table'),
    ]),
    MonacoEditorModule.forRoot(monacoConfig),
    MonacoEditorModule,
  ],
  providers: [],
  exports: [
  ]
})
export class UICodeEditorModule {
  constructor(private ds: DeclaredService) {
    ds.addComps("@solenopsys/ui-editor-code", [
      CodeAreaComponent
    ])
  }
}
