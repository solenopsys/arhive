import {ActionButton} from "@solenopsys/ui-controls";

export type MenuItemData = {
    name: string,
    link: string,
    icon?: string,
    items?: MenuItemData[],
}

export  type MenuItem = {
    name: string;
    link: string;
    icon: string;
    submenus: string[]
    items: any[]
}

export  type Tab ={
    id: string,
    title: string
}

export  type TabsState = {
    current: string,
    tabs: Tab[],
}

export  type TopPaneConfig = {
    tabsState: TabsState,
    actions: ActionButton[];
}
