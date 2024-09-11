import {XsModule, XsModuleType} from "@solenopsys/fl-globals";
import {RemoteEntryModule} from "./app/entry.module";

export * from './app/entry.module';

export const ENTRY: XsModule<RemoteEntryModule> = {
    module: RemoteEntryModule,
    type: XsModuleType.PLATFORM,
};
