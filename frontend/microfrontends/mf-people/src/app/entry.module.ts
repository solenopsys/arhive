import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TeamComponent} from "./team/team.component";

@NgModule({
  declarations: [TeamComponent],
  imports: [
    RouterModule.forChild([{
      path: "",
      component: TeamComponent,
    }]),
  ],
  providers: [],
})
export class RemoteEntryModule {}
