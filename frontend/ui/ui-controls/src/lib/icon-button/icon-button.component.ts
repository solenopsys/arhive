import {Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'ui-icon-button',
    templateUrl: './icon-button.component.html',
    styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit {


    @Input()
    icon: string | undefined;

    constructor() {
    }

    ngOnInit(): void {
    }

}



