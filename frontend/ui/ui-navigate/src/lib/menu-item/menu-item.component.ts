import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MenuItemData} from "../types";

@Component({
    selector: 'ui-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
    @Input()
    collapsed = false;

    @Input()
    data!: MenuItemData;


    @Output()
    clickEvent = new EventEmitter<string>();

}
