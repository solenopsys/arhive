import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionButton} from "../model";




@Component({
    selector: 'ui-button-group',
    templateUrl: './button-group.component.html',
    styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {
    @Input()
    actions!: ActionButton[];

    @Output()
    emmitAction = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }
}
