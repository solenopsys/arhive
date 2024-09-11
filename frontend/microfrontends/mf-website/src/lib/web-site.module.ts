import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {ActivatedRouteSnapshot, CanActivateFn, RouterModule, UrlTree} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {TextGroupByPatchResolver, TextPageGroupComponent} from "@solenopsys/ui-publications";

import {MenuItemData, UINavigateModule} from "@solenopsys/ui-navigate";
import {UIFormsModule} from "@solenopsys/ui-forms";
import {MainPageComponent,  UITemplatesModule} from "@solenopsys/ui-templates";
import {NgxsModule, NoopNgxsExecutionStrategy} from "@ngxs/store";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
export function createNgxs(develop = false, stores = [], forRoot = false): any[] {
    return [
        forRoot ? NgxsModule.forRoot(
                [...stores],
                {
                    developmentMode: develop,
                    selectorOptions: {injectContainerState: true},
                    executionStrategy: NoopNgxsExecutionStrategy
                }) :
            NgxsModule.forFeature(
                [...stores],
            ),
        NgxsLoggerPluginModule.forRoot(),
        NgxsRouterPluginModule.forRoot(),
        //  NgxsReduxDevtoolsPluginModule.forRoot()
        //   NgxsFormPluginModule.forRoot(),
    ]
}


const menu: MenuItemData[] = [
    {
        name: "Documentation", link: "docs"
    },
    {
        name: "Community", link: "community"
    },
    {
        name: "Ecosystem", link: "ecosystem"
    }
];

export function AllowedEntitiesGuard(allowedEntities: string[]): CanActivateFn {
    return (route: ActivatedRouteSnapshot): boolean | UrlTree => {
        const currentUrl = route.url;
        if (currentUrl.toString().endsWith('/')) {
            return true;
        }
        return false;
    };
}

function createRoute(section: string, sectionId: string) {
    return {
        path: section,
        // component: LeftMenuLayoutComponent, children: [{
        //     path: "**",
            component: TextPageGroupComponent, resolve: {
                groups: TextGroupByPatchResolver
            },
        //     data: {rootId: sectionId}
        // }
       // ],
        data: {rootId: sectionId}
    };
}

@NgModule({
    declarations: [
        AppComponent,
        // LeftMenuLayoutComponent,
        // BaseLayoutComponent,
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        FormsModule,
        BrowserModule.withServerTransition({appId: "solenopsys"}),
        BrowserModule,
        RouterModule.forRoot([
            {
                path: "",
              //  component: BaseLayoutComponent,
                children: [{
                    path: "",
                    component: MainPageComponent
                }, createRoute("docs", "bafyreiex6h53h3dckkozu44xfdq2g3ez7yt5ojrxfvhagke6yg7co6c7fe"),
                    createRoute("community", "bafyreig7p5xff3j32i6wzmconoyeggmrbbmi75ab74coepe6ji5m6svw5e"),
                    createRoute("ecosystem", "bafyreiakcsqjgpxzevinxdfjrtgdhcaaw4xtax7u7cc7txnnjdbtxhezbi")]
            },
        ], {initialNavigation: "enabledBlocking"}),


        UINavigateModule,
        UIFormsModule,
        UITemplatesModule,
        ...createNgxs(false, [], true),
    ],
    providers: [
        {provide: "assets_dir", useValue: ""},
        {provide: 'logo', useValue: "solenopsys"},
    ],
    bootstrap: [AppComponent]
})
export class WebSiteModule {
}



