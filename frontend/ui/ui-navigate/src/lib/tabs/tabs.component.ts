import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tab} from "../types";


@Component({
    selector: 'ui-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

    @Input()
    selected!: string | undefined;

    @Input()
    tabs!: Tab[];

    @Output()
    tabClick = new EventEmitter<string>();
}
