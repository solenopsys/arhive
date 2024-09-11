import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {Route, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {PromotionComponent} from './promotion/promotion.component';
import { StagesComponent } from './stages/stages.component';
import { ConnectorSpecComponent } from './connector-spec/connector-spec.component';
import { FondationTitleComponent } from './fondation-title/fondation-title.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TeamComponent } from './team/team.component';
import { AboutComponent } from './about/about.component';
import { StructureComponent } from './structure/structure.component';
import { TechnologyComponent } from './technology/technology.component';
import { MicrofondsComponent } from './microfonds/microfonds.component';
import { HelperRenderComponent } from './helper-render/helper-render.component';

export const appRoutes: Route[] = [
    {
        path: "",
        redirectTo: "main/.",
        pathMatch: 'full'
    },
    {
        path: "main/.",
        component: MainPageComponent,
    },


    {
        path: "main/.",
        component: MainPageComponent,
    },

    {
        path: "microfonds/.",
        component: MicrofondsComponent,
    },

    // {
    //     path: "promotion",
    //     component: PromotionComponent,
    // },
    {
        path: "stages/.",
        component: StagesComponent,
    },
    {
        path: "team/.",
        component: TeamComponent,
    },  {
        path: "about/.",
        component: AboutComponent,
    }, {
        path: "structure/.",
        component: StructureComponent,
    }, {
        path: "technology/.",
        component: TechnologyComponent,
    },
    // {
    //     path: "connector",
    //     component: ConnectorSpecComponent,
    // }

];


// noinspection AngularInvalidEntryComponent
@NgModule({
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
    ],
    declarations: [
        AppComponent,
        PromotionComponent,
        StagesComponent,
        ConnectorSpecComponent,
        FondationTitleComponent,
        MainPageComponent,
        TeamComponent,
        AboutComponent,
        StructureComponent,
        TechnologyComponent,
        MicrofondsComponent,
        HelperRenderComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {

    }
}
