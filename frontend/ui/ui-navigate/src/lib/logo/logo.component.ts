import {Component, Input} from '@angular/core';

@Component({
    selector: 'ui-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

    @Input()
    logo!:string

    @Input()
    alt!: string


}
