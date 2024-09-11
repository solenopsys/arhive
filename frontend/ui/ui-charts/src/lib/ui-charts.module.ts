import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartComponent} from './chart/chart.component';
import {NgxEchartsModule} from "ngx-echarts";
import {DeclaredService} from "@solenopsys/ui-utils";

const components = [
    ChartComponent
];

@NgModule({
    imports: [CommonModule, NgxEchartsModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        })],
    declarations: components,
})
export class UIChartsModule {
    constructor(private ds: DeclaredService) {
        ds.addComps("@solenopsys/ui-charts", components)
    }
}
