import {describe} from 'vitest'


describe('Diagram test', () => {
    // let diagramConfig: DiagramConfig;
    // beforeEach(() => {
    //     let hubs = [
    //         {sideConnectors: 2, skip: [1],  title: "Hub1",
    //             description: "Description 1",},
    //         {sideConnectors: 3, skip: [],  title: "Hub2",
    //             description: "Description 2",}];
    //
    //     let leftIdiModules: ModuleConf[] = [
    //         {
    //             len: ModuleSize.Medium,
    //             width: 1,
    //             ioConnectors: {
    //                 "UIC": 1,
    //             },
    //             title: "Inverter",
    //             description: "Converts 400 volts to 48 volts",
    //             powerConnectors: ["25v"]
    //         }
    //     ];
    //     let rightIdiModules: ModuleConf[] = [
    //         {
    //             len: ModuleSize.Small,
    //             width: 2,
    //             ioConnectors: {
    //                 "UIC1": 1,
    //                 "UIC2": 1,
    //             },
    //             title: "UIC Adapter",
    //             description: "Covert IDI interface to 2 UIC interface   power module solution",
    //             powerConnectors: ["40v"]
    //             ,
    //         }];
    //     let powerGroup = [[
    //         "25v", "40v"], [
    //         "25v", "40v"]];
    //
    //
    //     const bc: BladeConfig = {
    //         hubs: hubs,
    //         leftIdiModules: leftIdiModules,
    //         rightIdiModules: rightIdiModules,
    //         powerGroup: powerGroup,
    //     }
    //
    //     const dl = new DiagramLayout(BASE_THEME);
    //      diagramConfig = dl.transformData(bc)
    // });
    // it('should be 4 modules', () => {
    //     let actual = diagramConfig.draws.length;
    //     expect(actual).toBe(4);
    // });

    // it('should correct modules widths', () => {
    //     let modules = diagramConfig.modules;
    //     expect(modules[0].width).toBe(4);
    //     expect(modules[1].width).toBe(4);
    //     expect(modules[2].width).toBe(8);
    //     expect(modules[3].width).toBe(4);
    // });
    //
    // it('should correct modules heights', () => {
    //     let modules = diagramConfig.modules;
    //     expect(modules[0].height).toBe(10);
    //     expect(modules[1].height).toBe(16);
    //     expect(modules[2].height).toBe(4);
    //     expect(modules[3].height).toBe(10);
    // })
    //
    // it('should correct diagram size', () => {
    //     let size = diagramConfig.diagramSize;
    //     expect(size.width).toBe(28);
    //     expect(size.height).toBe(6 * 2 + 5 * 4 + 4 * 2 + 4);
    // });
    //
    // it('should correct coordinates X', () => {
    //     let modules = diagramConfig.modules;
    //     expect(modules[0].x).toBe(16);
    //     expect(modules[1].x).toBe(16);
    //     expect(modules[2].x).toBe(6);
    //     expect(modules[3].x).toBe(22);
    // });
    //
    // it('should correct coordinates Y', () => {
    //     let modules = diagramConfig.modules;
    //     expect(modules[0].y).toBe(6);
    //     expect(modules[1].y).toBe(18);
    //     expect(modules[2].y).toBe(6);
    //     expect(modules[3].y).toBe(6);
    // });
    //
    // it('should correct text count', () => {
    //     let texts = diagramConfig.texts;
    //     expect(texts.length).toBe(4);
    // });
    //
    //
    // it('should correct text X', () => {
    //     let texts = diagramConfig.texts;
    //     expect(texts[0].point.x).toBe(19);
    //     expect(texts[1].point.x).toBe(19);
    //     expect(texts[2].point.x).toBe(7);
    //     expect(texts[3].point.x).toBe(23);
    // });
    //
    // it('should correct text Y', () => {
    //     let texts = diagramConfig.texts;
    //     expect(texts[0].point.y).toBe(6+1);
    //     expect(texts[1].point.y).toBe(18+1);
    //     expect(texts[2].point.y).toBe(6+1);
    //     expect(texts[3].point.y).toBe(6+1);
    // });

});