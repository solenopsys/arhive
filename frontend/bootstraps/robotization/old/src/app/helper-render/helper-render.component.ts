import {Component, ElementRef, Input, ViewChild} from '@angular/core';


@Component({
    selector: 'helper-render',
    templateUrl: './helper-render.component.html',
    styleUrls: ['./helper-render.component.css']
})
export class HelperRenderComponent {

    diagrams = [
        {
            name: "system",
            url: "/assets/arch/fdm-3d-printer.json"
        }
    ]

}
