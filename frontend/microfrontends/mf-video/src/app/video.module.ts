import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CamerasListComponent} from './cameras-list/cameras-list.component';
import {CAMERAS, STREAM_CONFIG} from './tables.config';
import {VideoComponent} from "@solenopsys/ui-controls";
import {TABLE_PAGE} from "@solenopsys/ui-templates";


const routes: Routes = [
    {
        path: 'video/video', component: CamerasListComponent, children: [
            {path: ':camera', component: VideoComponent}
        ]
    },
    TABLE_PAGE('video/:table'),
    {path: 'video', redirectTo: 'video/video',pathMatch:'full'},
];

const CAMERAS_MENU = [{
    name: 'Video',
    link: '/video',
    icon: '/assets/icons/13-Images-Photography/02-Cameras/camera-1.svg',
    items: [
        {name: 'Video', link: '/video/video', icon: '/assets/icons/15-Video-Movies-TV/02-Movies/movies-film.svg'},
        {
            name: 'Cameras',
            link: '/video/cameras',
            icon: '/assets/icons/13-Images-Photography/01-Taking-Pictures/taking-pictures-cameras.svg'
        },
        {
            name: 'Convertors',
            link: '/video/convertors',
            icon: '/assets/icons/01-Interface-Essential/12-Settings/cog-play-1.svg'
        },
    ]
}];

const TABLES_CONFS = {
    cameras: CAMERAS,
    convertors: STREAM_CONFIG
};


@NgModule({
    declarations: [CamerasListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ], providers: [
        {provide: 'video.menu', useValue: CAMERAS_MENU},
        {provide: 'video.tables', useValue: TABLES_CONFS}]
})
export class VideoModule {
}
