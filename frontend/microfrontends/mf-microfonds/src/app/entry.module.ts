import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Route, RouterModule} from '@angular/router';
import {PromotionComponent} from "./promotion/promotion.component";
import {MicrofondsComponent} from "./microfonds/microfonds.component";
import {FondationTitleComponent} from "./fondation-title/fondation-title.component";

@NgModule({
    declarations: [MicrofondsComponent, PromotionComponent, FondationTitleComponent],
    imports: [
        RouterModule.forChild([{
            path: "",
            component: MicrofondsComponent,
        }]),
    ],
    providers: [],
})
export class RemoteEntryModule {
}
