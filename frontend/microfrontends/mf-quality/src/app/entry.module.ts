import {NgModule} from "@angular/core";
import {IMPORTS_CONF, PROVIDERS_CONF, ROUTES} from "./conf";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([...ROUTES]),
    ...IMPORTS_CONF,
  ],
  providers: [...PROVIDERS_CONF],
})
export class RemoteEntryModule {}
