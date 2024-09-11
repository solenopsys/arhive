import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UIControlsModule} from "@solenopsys/ui-controls";
import {UtilsModule} from "@solenopsys/ui-utils";
import {DynamicIconComponent} from "./dynamic-icon/dynamic-icon.component";
import {ClipboardModule} from "ngx-clipboard";
import {SubMenuComponent} from "./sub-menu/sub-menu.component";

import {RouterModule, Routes} from '@angular/router';

import {UtilsGlobalsModule} from "@solenopsys/fl-globals";
import {IconsSectionPageComponent} from "./icons-section-page/icons-section-page.component";
import {IconsPageComponent} from "./icons-page/icons-page.component";


const routes: Routes = [

    {
        path: 'icons',
        component: IconsPageComponent,
        children: [{path: ':section', component: IconsSectionPageComponent}]
    },

];

export const PROVIDERS_CONF = [
    {provide: 'assets_dir', useValue: "/fm/modules/richteri/icons"},
    {provide: 'mod_name', useValue: "icons"}
]

export const IMPORTS_CONF = [

    RouterModule,
    ClipboardModule,
    CommonModule, UtilsModule, ClipboardModule, UIControlsModule,
    RouterModule.forChild(routes),
]


@NgModule({
    declarations: [IconsPageComponent, IconsSectionPageComponent, SubMenuComponent,DynamicIconComponent],
    imports: [
        ...IMPORTS_CONF,
        UtilsGlobalsModule,
        UtilsModule,

    ],
    providers: [...PROVIDERS_CONF],
    bootstrap: [],
    exports: [DynamicIconComponent, SubMenuComponent]
})
export class UIIconsModule {
}



