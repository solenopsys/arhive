import {RemoteEntryModule} from "./app/entry.module";

export * from './app/entry.module';

import {XsModule, XsModuleType} from "@solenopsys/fl-globals";
import {ElectronicModule} from "./lib/electronic.module";

export const ENTRY: XsModule<RemoteEntryModule> = {
    module: RemoteEntryModule,
    type: XsModuleType.LAYOUT,
};
