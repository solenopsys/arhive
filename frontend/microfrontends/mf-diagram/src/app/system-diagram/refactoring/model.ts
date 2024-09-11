export type Titles = {
    title: string
    description: string
}


export type HubConf = Titles &{
    sideConnectors: number
    skip: number[]
}

export type ContactConf = {
    title: string,
    firstArrow: boolean,
    secondArrow: boolean,
    width: number,
}

export type TextConf = {
    text: string,
    color: string,
    size: number,
    maxWidth: number,
    maxHeight: number,
    bold: boolean
}

export type TitlesConf = {
    exWidth: number,
    exHeight: number,
    color: string,
} & Titles

export type Point = {
    x: number,
    y: number,
}

export type RectMin = {
    width: number,
    height: number,
}

export type RectConf = {
    color: string,
} & RectMin & Point;


export type PolygonConf = {
    points: Point[]
}

export enum ModuleSize {
    ExtraSmall = "XS",//16
    Small = "S",// 26
    Medium = "M",// 30
    Large = "L",// 38
    ExtraLarge = "XL", // 42
    DoubleExtraLarge = "XXL" // 60
}

export enum PowerLineType {
    PcbLines = "PCB", // small power
    Tube = "TUBE", // middle power
    Rod = "ROD", // big power
    Sheet = "SHEET", // large power
}


