import {BladeConfig, DiagramConfig, ModuleConf} from "./old/loader";
import {DrawElement} from "./abstract";
import {SIZES_MAP} from "./config";
import type  {Theme} from "./config";
import {ModuleElement} from "./elements/module";
import {HubElement} from "./elements/hub";
import {HubConf} from "./model";


export class DiagramLayout {

    constructor(private theme: Theme) {
    }

    findMaxWidth(modules: ModuleConf[]): number {
        let mx = 0;
        modules.forEach((mod) => {
            if (mod) {
                const curW = SIZES_MAP[mod.len]
                if (curW > mx) {
                    mx = curW;
                }
            }
        });
        return mx;
    }


    transformData(conf: BladeConfig): {
        draws: DrawElement[],
        diagramSize: { width: number, height: number }
    } {
        const theme=this.theme;

        let draws: DrawElement[] = [];




        const leftMax = this.findMaxWidth(conf.leftIdiModules);
        const rightMax = this.findMaxWidth(conf.rightIdiModules);
        let xHub = leftMax + theme.padding + theme.gap;
        let hubsHeight = 0;
        let hubsCount = 0;

        let leftY = theme.padding;
        conf.leftIdiModules.forEach((mod) => {
            if (mod) {

                let moduleElement = new ModuleElement(mod);
                const height = mod.width * theme.moduleWidth + (mod.width - 1) * theme.gap;



                let moduleWidth = SIZES_MAP[mod.len];

                draws.push({
                    element: moduleElement,
                    transform: {
                        x: xHub - moduleWidth - theme.gap,
                        y: leftY,
                        angle: 0
                    }
                });
                leftY = leftY + height+ theme.gap ;
            } else {
                leftY = leftY + theme.moduleWidth + theme.gap ;
            }

        });

        let rightY = theme.padding;
        conf.rightIdiModules.forEach((mod, index) => {

            if (mod) {
                const height = mod.width * theme.moduleWidth + (mod.width - 1) * theme.gap;



                let moduleWidth = SIZES_MAP[mod.len];
                draws.push({
                    element: new ModuleElement(mod),
                    transform: {
                        x: xHub + theme.moduleWidth + theme.gap,
                        y: rightY,
                        angle: 0
                    }
                });
                rightY = rightY + height + theme.gap;
            } else {
                rightY = rightY + theme.moduleWidth + theme.gap;
            }


        });



        conf.hubs.forEach((hub, index) => {

            const height = hub.sideConnectors * theme.moduleWidth + (hub.sideConnectors - 1) * theme.gap;


            let newVar = {
                element: new HubElement(hub),
                transform: {
                    x: xHub+4 ,
                    y: hubsHeight+theme.padding,
                    angle: 90
                }
            };
            draws.push(newVar);

            hubsHeight += height + theme.gap;
            hubsCount++;
        });


        return {
            draws,
            diagramSize: {
                width: theme.gridPitch*(leftMax + rightMax + 2 * theme.padding + theme.moduleWidth+ theme.gap +2),
                height: theme.gridPitch*(hubsHeight + 2 * theme.padding- theme.gap)
            },
        };
    }
}