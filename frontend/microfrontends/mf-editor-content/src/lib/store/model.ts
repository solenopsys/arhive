import { ContentNodeType} from "@solenopsys/fl-content";

export type Uid = string;

// it data from ipfs
export  type Fragment = {
    uid: Uid;
    blocks: Uid[];
    beforeVersion?: Uid;
}

export  type ContentNodesGroup = {
    fid: string;
    edited: boolean;
} & Fragment

// it data from ipfs
export  type ContentNode = {
    uid?: Uid; // current ipfs hash
    beforeVersion?: Uid; // previous node ipfs hash
    type: ContentNodeType; // type of node
    content: Uid; // link to content
}


