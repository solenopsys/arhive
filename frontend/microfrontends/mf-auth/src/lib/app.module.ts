import {NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

import {Route, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {StatusComponent} from "./status/status.component";
import {UIControlsModule} from "@solenopsys/ui-controls";
import {UIFormsModule} from "@solenopsys/ui-forms";
import {UIQrModule} from "@solenopsys/ui-qr";
import {RegisterComponent} from "./register/register.component";

import {InterfaceState, SetTabs, UITemplatesModule,} from "@solenopsys/ui-templates";
import {NgxsModule, NoopNgxsExecutionStrategy, Store} from "@ngxs/store";
import {ConfirmComponent} from "./confirm/confirm.component";
import {CryptoModule} from "@solenopsys/fl-crypto";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {RegisterTemplateComponent} from "./register-template/register-template.component";
import {UINavigateModule} from "@solenopsys/ui-navigate";
import {Subject} from "rxjs";
const $logo = new Subject();

export function createNgxs(develop = false, stores = [], forRoot = false): any[] {
    return [
        forRoot ? NgxsModule.forRoot(
                [ ...stores],
                {
                    developmentMode: develop,
                    selectorOptions: {injectContainerState: true},
                    executionStrategy: NoopNgxsExecutionStrategy
                }) :
            NgxsModule.forFeature(
                [ ...stores],
            ),
        NgxsLoggerPluginModule.forRoot(),
        NgxsRouterPluginModule.forRoot(),
        //  NgxsReduxDevtoolsPluginModule.forRoot()
        //   NgxsFormPluginModule.forRoot(),
    ]
}

const ROUTERS: Route[] = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: 'full'
    },
    {
        path: "status",
        component: StatusComponent,
    },
    {
        path: "confirm",
        component: ConfirmComponent,
    },
    {
        path: "login",
        component: LoginComponent,
    },
    {
        path: "register",
        component: RegisterComponent,
    },

];


// noinspection AngularInvalidEntryComponent
@NgModule({
    imports: [
        HttpClientModule,
        CryptoModule,
        CommonModule,
        FormsModule,
        BrowserModule.withServerTransition({appId: "solenopsys"}),
        BrowserModule,
        RouterModule.forRoot(ROUTERS),
        UIQrModule,
        UIFormsModule,
        UIControlsModule,
        UITemplatesModule,
        ...createNgxs(false, [InterfaceState], true),
        UINavigateModule,
    ],
    declarations: [
        RegisterTemplateComponent,
        LoginComponent,
        StatusComponent,
        RegisterComponent,
        ConfirmComponent,

    ],
    providers: [...([
        {provide: "assets_dir", useValue: ""},
        {provide: "mod_name", useValue: "exhibition"},
        {provide: "logo", useValue: $logo},
    ])],
    bootstrap: [RegisterTemplateComponent],
})
export class AppModule {
    constructor(private store: Store, private http: HttpClient) {
        store.dispatch(
            new SetTabs([
                {id: "status", title: "Status"},
                {id: "login", title: "Login"},
                {id: "register", title: "Register"},
            ])
        );
    }
    public setConfigSource(
        data: { navigate: { [route: string]: { title: string } }, logo: string, title: string },
        func: any,
        mapping: { [key: string]: { module:string,data:any } }
    ) {
        $logo.next(data.logo)
    }
}
