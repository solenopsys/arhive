import {XsModule, XsModuleType} from "@solenopsys/fl-globals";
import {UICodeEditorModule} from "./app/ui-editor.module";



export const ENTRY:XsModule<UICodeEditorModule> ={
    module: UICodeEditorModule,
    type: XsModuleType.PLATFORM,
};
