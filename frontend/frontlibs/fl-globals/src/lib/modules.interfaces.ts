import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {Type} from "@angular/core";

export const APP_SELECTOR = 'app-root';

export enum XsModuleType {
    LAYOUT,
    PLATFORM,
    CLUSTER,
    COMMON,
}

export interface XsModule<T> {
    readonly  type: XsModuleType;
    readonly  module: Type<T>;
}



export interface XsModuleLayoutInterface<T> extends XsModule<T> {
    bootstrap(moduleClass: Type<any>): Promise<any>;
}

export interface LayoutEntry {
    setConfigSource(layoutConf,loadFunc,mapping)
}


export class XsModuleLayout<T extends LayoutEntry> implements XsModuleLayoutInterface<T> {
    readonly type = XsModuleType.LAYOUT;
    readonly module: Type<T >;

    constructor(module: Type<T>) {
        this.module = module;
    }
    public bootstrap(): Promise<T> {
        return new Promise<any>((resolve, reject) => {
            platformBrowserDynamic()
                .bootstrapModule(this.module).then((module) => {
                // @ts-ignore
                resolve(module.instance);
            })
                .catch((err) => reject(err));
        })
    }
}

