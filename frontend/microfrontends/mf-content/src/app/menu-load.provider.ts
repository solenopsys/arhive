import {MenuLoaderProvider} from "@solenopsys/ui-templates";
import {MenuItemData} from "@solenopsys/ui-navigate";
import {GroupService} from "@solenopsys/ui-publications";


export class IpfsMenuLoadProvider implements MenuLoaderProvider {

    constructor(private conf: GroupService) {
    }

    load(dataKey: string): Promise<MenuItemData[]> {
        return new Promise<MenuItemData[]>(resolve => {
            this.conf.loadMenu(dataKey).then(
                (menu: MenuItemData[]) => {
                    resolve(menu);
                }
            );
        })

    }

}