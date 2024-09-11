import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

import {EntityTitle} from "@solenopsys/ui-utils";


@Component({
  selector: 'ui-code-area',
  templateUrl: './code-area.component.html',
  styleUrls: ['./code-area.component.scss'],
})
export class CodeAreaComponent
  implements OnInit, OnDestroy
{
  @ViewChild('editor') editor: any;

  @Input()
  language!: string;

  editorOptions!: { theme: string; language: string }; // todo подключить тему и убрать хардкод


  @Input()
  value!: any;

  @Output()
  valueChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.editorOptions = {
      theme: true ? 'vs' : 'vs-dark',
      language: this.language,
    }; // todo подключить тему и убрать хардкод
  }

  public onInitEditor($event: any) {
    // See the editor component
    console.log('EDITOR', this.editor);
    console.log('EVENT', $event);
  }

  ngOnDestroy(): void {}
}
