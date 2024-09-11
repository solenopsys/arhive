export * from './app/entry.module';
import {RemoteEntryModule} from "./app/entry.module";
import {XsModule, XsModuleType} from "@solenopsys/fl-globals";

export const ENTRY:XsModule<RemoteEntryModule> ={
    module: RemoteEntryModule,
    type: XsModuleType.COMMON,
};


