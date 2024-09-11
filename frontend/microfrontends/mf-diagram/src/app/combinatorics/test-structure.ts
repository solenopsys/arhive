import {BladeConfig, ModuleConf} from "../system-diagram/refactoring/old/loader";
import {ModuleSize} from "../system-diagram/refactoring/model";


const hubs = [
    {sideConnectors: 2, skip: [1],title: "Hub 1", description: "Hub 1 description"},
    {sideConnectors: 4, skip: [],title: "Hub 2", description: "Hub 2 description"}];

const leftIdiModules: (ModuleConf|undefined )[]= [
    {
        len: ModuleSize.Medium,
        width: 1,
        ioConnectors: {
            "UIC": 1,
        },
        powerConnectors: ["25v"],
        title: "Inverter",
        description: "Converts 400 volts to 48 volts",
    },
    undefined,
    {
        len: ModuleSize.Medium,
        width: 1,
        ioConnectors: {
            "UIC": 1,
        },
        powerConnectors: ["25v"],
        title: "Inverter",
        description: "Converts 400 volts to 48 volts",
    },
    {
        len: ModuleSize.Large,
        width: 2,
        ioConnectors: {
            "UIC": 1,
        },
        powerConnectors: ["25v"], title: "Inverter",
        description: "Converts 400 volts to 48 volts",
    },
    , {
        len: ModuleSize.Large,
        width: 1,
        ioConnectors: {},
        powerConnectors: ["40v"]
        , title: "Inverter",
        description: "Converts 400 volts to 48 volts",
    }
];
const rightIdiModules: (ModuleConf|undefined )[]= [
    undefined,
    {
        len: ModuleSize.Medium,
        width: 2,
        ioConnectors: {
            "UIC1": 1,
            "UIC2": 1,
        },
        powerConnectors: ["40v"]
        ,
        title: "Inverter",
        description: "Download a platform to simplify the development of your projects. Download a platform to simplify the development of your projects.",
    },
    {
        len: ModuleSize.Large,
        width: 1,
        ioConnectors: {},
        powerConnectors: ["40v"]
        , title: "Inverter",
        description: "Converts 400 volts to 48 volts",
    }, {
        len: ModuleSize.Large,
        width: 1,
        ioConnectors: {},
        powerConnectors: ["40v"]
        , title: "Inverter",
        description: "Converts 400 volts to 48 volts",
    }

];
const powerGroup = [[
    "25v", "40v"], [
    "25v", "40v"]];


export const BC: BladeConfig = {
    hubs: hubs,
    leftIdiModules: leftIdiModules,
    rightIdiModules: rightIdiModules,
    powerGroup: powerGroup,
}


