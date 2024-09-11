import {IcInterface, SchemeConf} from './shematic.draw';

export const icSimple: IcInterface = {
    size: {width: 3, height: 5},
    pins: {
        sides: {
            left: ['IN1', 'IN2', 'IN3'],
            right: ['OUT1', 'OUT2', 'OUT4', 'OUT5'],
            top: ['OUT1', 'OUT2', 'OUT3'],
            bottom: ['OUT1', 'OUT2', 'OUT3'],
        },
        params: {
            IN2: {color: 'blue'},
            IN3: {color: 'blue'},
            OUT4: {n: 4, color: 'red'},
            OUT5: {n: 5, color: 'red'},
            OUT3: {color: 'green'},
        }
    },
    view: {
        title: true,
        box: true
    }
};


function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}


export const icSimpleLeft: IcInterface = clone(icSimple);
icSimpleLeft.pins.sides['left'] = [];

export const icSimpleRight: IcInterface = clone(icSimple);
icSimpleRight.pins.sides['right'] = [];

export const icSimpleTop: IcInterface = clone(icSimple);
icSimpleTop.pins.sides['top'] = [];

export const icSimpleBottom: IcInterface = clone(icSimple);
icSimpleBottom.pins.sides['bottom'] = [];


export const capSimple: IcInterface = {
    size: {width: 0, height: 1},
    pins: {
        sides: {
            left: ['IN1'],
            right: ['OUT1']
        }
    },
    symbol: [
        {type: 'line', x1: 0, y1: 20, x2: 40, y2: 20},
        {
            type: 'line',
            x1: 40,
            y1: 0,
            x2: 40,
            y2: 40
        },
        {type: 'line', x1: 50, y1: 0, x2: 50, y2: 40},
        {type: 'line', x1: 50, y1: 20, x2: 80, y2: 20}
    ], view: {
        title: false,
        box: false
    }
};


export const schemeConf: SchemeConf = {
    width: 200,
    height: 100,
    elements: [
        {element: icSimple, position: {x: 1, y: 1}, angle: 0},
        {element: icSimpleLeft, position: {x: 1, y: 21}, angle: 0},
        {element: icSimpleRight, position: {x: 1, y: 41}, angle: 0},
        {element: icSimpleTop, position: {x: 1, y: 61}, angle: 0},
        {element: icSimpleBottom, position: {x: 1, y: 81}, angle: 0},
        {element: capSimple, position: {x: 20, y: 2}, angle: 0},
        {element: capSimple, position: {x: 40, y: 2}, angle: 90}
    ],
    wires: [
        [{x: 12, y: 9}, {x: 18, y: 9}, {x: 18, y: 4}, {x: 20, y: 4}],
        [{x: 12, y: 6}, {x: 15, y: 6}, {x: 15, y: 1}, {x: 38, y: 1}, {x: 38, y: 2}]
    ]
};



export const tt: SchemeConf = {
    width: 200,
    height: 100,
    elements: [
        {element:  {
                size: {width: 3, height: 5},
                pins: {
                    sides: {
                        left: ['IN1', 'IN2', 'IN3'],
                        right: ['OUT1', 'OUT2', 'OUT4', 'OUT5'],
                        top: ['OUT1', 'OUT2', 'OUT3'],
                        bottom: ['OUT1', 'OUT2', 'OUT3'],
                    },
                    params: {
                        IN2: {color: 'blue'},
                        IN3: {color: 'blue'},
                        OUT4: {n: 4, color: 'red'},
                        OUT5: {n: 5, color: 'red'},
                        OUT3: {color: 'green'},
                    }
                },
                view: {
                    title: true,
                    box: true
                }
            }, position: {x: 1, y: 1}, angle: 0},
    ],
    wires: [
        [{x: 12, y: 9}, {x: 18, y: 9}, {x: 18, y: 4}, {x: 20, y: 4}],
        [{x: 12, y: 6}, {x: 15, y: 6}, {x: 15, y: 1}, {x: 38, y: 1}, {x: 38, y: 2}]
    ]
};


const abstGraph = {
    items: {
        item1: 'BLA_BLA1',
        item2: 'BLA_BLA2'
    },
    links: [{
        from: {ic: 'item1', pin: 'out1'},
        to: {ic: 'item2', pin: 'in4'},
        flags: ['near', 'fr', 'hc']
    }]
};

const compressed = {
    d1: {w: 10, h: 10, data: [10, 22, 22, 22]},
    d2: {w: 10, h: 10, data: [10, 22, 22, 22]}
};


const compressedResponse = {
    size: {w: 10, h: 10},
    positions: {
        d1: {x: 10, y: 10, angle: 90},
        d2: {x: 10, y: 10, angle: 90},
    },
    points: [10, 22, 22, 22]
};
