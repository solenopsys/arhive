import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {MenuItemData} from "../types";

@Component({
    selector: "ui-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {

    @Input()
    data!: MenuItemData[];

    @Input()
    current!: string;

    @Output()
    clickEvent = new EventEmitter<string>();
}


