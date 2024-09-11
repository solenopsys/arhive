import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickOutsideDirective} from "./click-outside.directive";
import {BaseDirPipe} from './base-dir.pipe';

@NgModule({
  declarations: [ClickOutsideDirective, BaseDirPipe],
  exports: [ClickOutsideDirective, BaseDirPipe],
  imports: [CommonModule],
})
export class UtilsModule {
}
