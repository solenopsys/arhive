import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {TopPaneConfig} from "../types";


@Component({
    selector: 'ui-top-pane',
    templateUrl: './top-pane.component.html',
    styleUrls: ['./top-pane.component.scss']
})
export class TopPaneComponent {

    @Input()
    config!: TopPaneConfig;
    @Output()
    tabSelect = new EventEmitter<string>();
    @Output()
    actionSelect = new EventEmitter<string>();

    @Input() public logo: string

    constructor(
       ) {
      //  console.log("LOGO",this.logo)
    }



}






