import {Component} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";


@Component(
    {
        selector: 'ui-code-page',
        template: '<ui-code-area [value]="code" [language]="\'javascript\'" ></ui-code-area>',
    }
)
export class CodePageComponent {

    protected  code: string;

    constructor(private http: HttpClient, private ar: ActivatedRoute) {
        const url = this.ar.snapshot.data['url'];
        console.log("URL", url)
        // @ts-ignore
        this.http.get<string>(url, { responseType: 'text' }).subscribe(
            (response) => {
                // Assign the response to the code variable
                this.code = response.toString();
            },
            (error) => {
                console.error('An error occurred:', error);
            }
        );
    }
}