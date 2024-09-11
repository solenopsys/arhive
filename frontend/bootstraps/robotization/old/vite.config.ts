import {defineConfig} from 'vite';
//import {angular} from 'C:/dev/sources/federation-pilot/tools/vite-micro-federation-min/src/plugin/index'
//import {solemon} from 'C:/dev/sources/federation-pilot/tools/solemon/src/index'
import {splitVendorChunkPlugin} from 'vite'

const external =
    ['rxjs', "@angular/core", "zonejs",
        "@angular/forms",
        "@angular/common",
        "@angular/compiler",
        "@angular/core",
        "@angular/platform-browser",
        "@angular/platform-browser-dynamic",
        "@angular/router",
    ];

import {angular} from "../../../../tools/vite-micro-federation/src/plugin";

//import {angular} from '../../../tools/solenopsys/vite-micro-federation-min/src/plugin/index'
export default defineConfig({
    plugins: [angular(), splitVendorChunkPlugin()],
    build: {
        rollupOptions: {
            external: ["@angular/core","three"]
        },
    }

});
