import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { RunningPageComponent } from "./running-page/running-page.component";
import { GoalPathTreeComponent } from "./goal-path-tree/goal-path-tree.component";
import { FormsModule } from "@angular/forms";
import { NgxEchartsModule } from "ngx-echarts";
import { VirtualPlanComponent } from "./virtual-plan-component/virtual-plan.component";
import { NewPlanComponent } from "./new-plan/new-plan.component";
import { PlanResourceEditorComponent } from "./plan-resource-editor/plan-resource-editor.component";
import { PlanProcessEditorComponent } from "./plan-process-editor/plan-process-editor.component";
import { PlanLinkComponent } from "./plan-link/plan-link.component";
import { PlanLinksGroupComponent } from "./plan-links-group/plan-links-group.component";
import { ItemsListComponent } from "./items-list/items-list.component";
import { LinkedFieldComponent } from "./linked-field/linked-field.component";
import { UtilsGlobalsModule } from "@solenopsys/fl-globals";
import { UIIconsModule } from "@solenopsys/ui-icons";
import { ProcessIOComponent } from "./process-io/process-io.component";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { UtilsModule } from "@solenopsys/ui-utils";
import {UINavigateModule} from "@solenopsys/ui-navigate";
import {UIControlsModule} from "@solenopsys/ui-controls";


@NgModule({
  declarations: [
    RunningPageComponent,
    GoalPathTreeComponent,
    ProcessIOComponent,
    NewPlanComponent,
    PlanResourceEditorComponent,
    PlanLinkComponent,
    VirtualPlanComponent,
    PlanLinksGroupComponent,
    PlanProcessEditorComponent,
    ItemsListComponent,
    LinkedFieldComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    UtilsModule,
    UINavigateModule,
    UIControlsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts")
    }),
    UtilsGlobalsModule,
    UIIconsModule


  ],
  exports: [RouterModule],
  providers: []
})
export class ROMModule {

}
