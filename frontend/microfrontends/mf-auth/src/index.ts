import {AppModule} from "./lib/app.module";
import {XsModule, XsModuleLayout} from "@solenopsys/fl-globals";

export * from './lib/app.module';

export const ENTRY:XsModule<AppModule> =new XsModuleLayout<AppModule>(AppModule);


