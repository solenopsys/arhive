import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';

import {UIControlsModule} from '@solenopsys/ui-controls';

import {UIIconsModule} from "@solenopsys/ui-icons";
import {ManualEditorPageComponent} from "./manual-editor-page.component";

import {TABLES} from "./tables.config";
import {CommonModule} from "@angular/common";
import {NgxsModule} from "@ngxs/store";
import {IpfsContentService} from "./store/content.service";
import {FragmentState} from "./store/fragment.store";


export const routes: Routes = [...([
   // {path: 'move', component: MovePageComponent},

    {path: '', component: ManualEditorPageComponent},

    // {
    //     path: ':table',
    //     component: TablePageComponent,
    //     children: [
    //         {path: ':id/form', component: FormPanelComponent},
    //         {path: ':id/editor', component: FragmentEditorPanelComponent},
    //         {path: ':id/editor/:version', component: FragmentEditorPanelComponent},
    //     ],
    // },
]), {path: '', redirectTo: 'fragments', pathMatch: 'full'}]


@NgModule({
    declarations: [
        ManualEditorPageComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        UIIconsModule,
        UIControlsModule,
        NgxsModule.forRoot([ FragmentState]),
    ],
    providers: [
        {provide: 'contentService', useValue: IpfsContentService},
        {provide: 'tables', useValue: TABLES},
        {provide: 'mod_name', useValue: 'content'},
        {provide: 'Logger', useValue: 'LoggerMock'}],
    exports: []
})
export class EditorModule {
    constructor() {
    }
}
