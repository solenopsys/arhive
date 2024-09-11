import {XsModule, XsModuleType} from "@solenopsys/fl-globals";
import {EntryModule} from "./lib/entry.module";

export const ENTRY:XsModule<EntryModule> ={
    module: EntryModule,
    type: XsModuleType.PLATFORM,
};
