import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ui-dynamic-icon',
    templateUrl: './dynamic-icon.component.html',
    styleUrls: ['./dynamic-icon.component.scss']
})
export class DynamicIconComponent implements OnInit {

    @Input()
    name!: string ;

    @Input()
    src!: string ;

    constructor() {
    }

    ngOnInit(): void {
    }

}
