

export * from './lib/web-site.module';
export * from './lib/app.component';

import {XsModule, XsModuleType} from "@solenopsys/fl-globals";
import {WebSiteModule} from "./lib/web-site.module";

export const ENTRY: XsModule<WebSiteModule> = {
    module: WebSiteModule,
    type: XsModuleType.LAYOUT,
};
