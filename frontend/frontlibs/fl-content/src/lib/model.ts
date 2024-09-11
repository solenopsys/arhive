

export type ContentNode = {
  value: string,
  type: ContentNodeType
  items: ContentNode[]
}






export  type FragmentVersion = {
  uid: string,
  nodes: string[];
}





export  enum ContentNodeType {
  PARAGRAPH = 'PARAGRAPH',
  HEADER1 = 'HEADER1',
  HEADER2 = 'HEADER2',
  HEADER3 = 'HEADER3',
  IMAGE = 'IMAGE',
  CODE = 'CODE'
}
