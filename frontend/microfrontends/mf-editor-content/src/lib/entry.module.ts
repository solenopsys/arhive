import {NgModule} from "@angular/core";
import {DevPageComponent} from "./dev-page.component";
import {RouterModule, Routes} from "@angular/router";
import {MdRendererComponent} from "../../../../../libraries/solenopsys/ui-publications/src/lib/markdown.component";
import {MarkdownModule} from "ngx-markdown";




@NgModule({
    declarations: [
        DevPageComponent,
        MdRendererComponent,
    ],
    imports: [
        RouterModule.forChild([{path: '', component: MdRendererComponent},]),
        MarkdownModule.forRoot()

    ],
    providers: [
    ],
    exports: []
})
export class EntryModule{

}