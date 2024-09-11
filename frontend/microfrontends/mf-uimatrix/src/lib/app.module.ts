import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule, Routes} from "@angular/router";
import {
     InterfaceState,
    MenuLoaderService, MenuState,
    SetLeftPanel,
    SetTabs,
    UITemplatesModule
} from "@solenopsys/ui-templates";
import {UIListsModule} from "@solenopsys/ui-lists";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {
    ExhibitFreeSelectComponent,
    ExhibitFreeSelectSaveComponent,
    ExhibitIconButtonComponent,
    ExhibitInfinityTableComponent,
    ExhibitModalComponent,
    ExhibitPathTreeComponent,
    ExhibitSelectEntityComponent,
    ExhibitSubMenuComponent,
    ExhibitTopPanelComponent,
    ExhibitTreeComponent
} from "./comps";

export const STATES=[InterfaceState, MenuState]

import {ExhibitionListComponent} from "./exhibition-list/exhibition-list.component";
import {ExhibitComponent} from "./exhibit/exhibit.component";
import {BlockChainComponent} from "./block-chain/block-chain.component";
import {UIIconsModule} from "@solenopsys/ui-icons";
import {BehaviorSubject} from "rxjs";
import {UIControlsModule} from "@solenopsys/ui-controls";
import {UIModalsModule} from "@solenopsys/ui-modals";
import {UIFormsModule} from "@solenopsys/ui-forms";
import {UINavigateModule} from "@solenopsys/ui-navigate";
import {UIChartsModule} from "@solenopsys/ui-charts";
import {NgxsModule, NoopNgxsExecutionStrategy, Store} from "@ngxs/store";
import {IconMenuProvider} from "./menu/icon-menu-provider";
import {ExbeditMenuProvider} from "./menu/ex-menu-provider";
import {ThemesMenuProvider} from "./menu/themes-menu-provider";
import {ColorSchemesService} from "@solenopsys/ui-themes";
import {ThemeConfigComponent} from './theme-config/theme-config.component';
import {ThemesParentComponent} from './themes-parent/themes-parent.component';
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";


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


export const URL_MAPPING_SUBJECT$: BehaviorSubject<{ [key: string]: string }> =
    new BehaviorSubject<{ [p: string]: string }>(undefined);


const routes: Routes = [
    {
        path: "components", component: ExhibitionListComponent,
        children: [{
            path: "**", component: ExhibitComponent
        }]
    },
    {
        path: "themes", component: ThemesParentComponent,
        children: [{path: ':theme', component: ThemeConfigComponent}]
    }
];



export const PROVIDERS_CONF = [
    {provide: "assets_dir", useValue: ""},
    {provide: "mod_name", useValue: "exhibition"},
    {provide: 'logo', useValue: "matrix"},
];


@NgModule({
    bootstrap: [],
    declarations: [
        ExhibitSubMenuComponent,
        ExhibitSelectEntityComponent,
        ExhibitTopPanelComponent,
        ExhibitTreeComponent,
        ExhibitFreeSelectSaveComponent,
        ExhibitFreeSelectComponent,
        ExhibitModalComponent,
        ExhibitIconButtonComponent,
        ExhibitPathTreeComponent,
        ExhibitInfinityTableComponent,
        ExhibitionListComponent,
        ExhibitComponent,
        BlockChainComponent,
        ThemeConfigComponent,
        ThemesParentComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        BrowserModule,
        UIListsModule,
        UIControlsModule,
        UINavigateModule,
        UIFormsModule,
        UIIconsModule,
        UIModalsModule,
        UITemplatesModule,
        UIChartsModule,
        RouterModule.forRoot(routes),
        ...createNgxs(false, STATES, true),

    ],
    providers: [...PROVIDERS_CONF]
})
export class AppModule {
    constructor(
        private http: HttpClient,
        private store: Store, menuLoaderService: MenuLoaderService,
        private colorService: ColorSchemesService) {


        menuLoaderService.addProvider("exMenuProvider", new ExbeditMenuProvider(URL_MAPPING_SUBJECT$, http))
        menuLoaderService.addMapping("components", "exMenuProvider")

        menuLoaderService.addProvider("iconMenuProvider", new IconMenuProvider(http))
        menuLoaderService.addMapping("icons", "iconMenuProvider")

        menuLoaderService.addProvider("themesMenuProvider", new ThemesMenuProvider(colorService))
        menuLoaderService.addMapping("themes", "themesMenuProvider")


        store.dispatch(new SetTabs([
            {id: 'components', title: 'Components'},
            {id: 'icons', title: 'Icons'},
            {id: 'themes', title: 'Themes'},]))


        store.dispatch(new SetLeftPanel({
            component: 'menu',
            store: "menu",
            id: "menuIdBla"
        }));


    }
}








