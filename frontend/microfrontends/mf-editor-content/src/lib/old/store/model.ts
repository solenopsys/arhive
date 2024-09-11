export const LAST_POSITION = -1;
export const FIRST_POSITION = 0;

//move
import {ContentNode, ContentNodeType} from "@solenopsys/fl-content";

export  type DragPoint ={
    groupID: string,
    index: number
}

//move
export  type DragState ={
    active: boolean,
    start: DragPoint,
    moving: DragPoint
}

//move



//move
export  type BlockNode = {
    id: string;
    uid?: Uid;
    before?: Uid;
    edited: boolean;
    type: ContentNodeType;
    value: string;
}

