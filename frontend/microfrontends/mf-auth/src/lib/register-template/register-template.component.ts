import {Component, ElementRef, Inject} from "@angular/core";
import {ColorSchemesService} from "@solenopsys/ui-themes";
import {Observable} from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./register-template.component.html",
    styleUrls: ["./register-template.component.scss"],
})
export class RegisterTemplateComponent {
    constructor(@Inject('logo') public $logo: Observable<string>, private cs: ColorSchemesService, private elementRef: ElementRef) {
        cs.initColors(this.elementRef.nativeElement.style);


    }
}
