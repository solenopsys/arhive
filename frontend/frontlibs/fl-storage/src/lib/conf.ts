import {NgxsModule, NoopNgxsExecutionStrategy} from "@ngxs/store";
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
