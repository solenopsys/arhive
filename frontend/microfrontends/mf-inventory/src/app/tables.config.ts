import {DataPageConfig, FacetType, FieldType} from "@solenopsys/fl-dgraph";
import {DgraphDataBuffered} from "@solenopsys/fl-dgraph";






export const RESOURCE_TYPES: DataPageConfig = {
  title: 'Resource Type',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'rom.resource.type', title: 'Resource Type', type: FieldType.STRING},
    {key: 'material', title: 'Material', type: FieldType.BOOLEAN},
  ],
  commands: ['edit'],
  listQ: 'has(rom.resource.type)',
  dataProvider: DgraphDataBuffered,
};
export const OBJECTS: DataPageConfig = {
  title: 'Object',

  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'name', title: 'Name', type: FieldType.STRING},
    {key: 'rom.object', title: 'Resource', type: FieldType.EUID, link: {titleField: 'rom.resource', multiple: false}},
    {key: 'date', title: 'Date', type: FieldType.DATE},
    {key: 'where_is', title: 'Where is', type: FieldType.EUID, link: {titleField: 'name', multiple: false}},
    {key: 'integrated', title: 'Integrated with', type: FieldType.EUID, link: {titleField: 'name', multiple: true}},
  ],
  commands: ['edit'],
  listQ: 'has(rom.object)',
  dataProvider: DgraphDataBuffered,
};

export const RESOURCES: DataPageConfig = {
  title: 'Resource',
  nameField: 'rom.resource',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'rom.resource', title: 'Resource', type: FieldType.STRING},
    {key: 'comment', title: 'Comment', type: FieldType.STRING},
    {key: 'resourceType', title: 'Type', type: FieldType.EUID, link: {titleField: 'rom.resource.type', multiple: false}},
  ],
  commands: ['edit', 'delete'],
  listQ: 'has(rom.resource)',
  deleteQ: 'rom.resource',
  dataProvider: DgraphDataBuffered,
};
export const TABLES_CONFS = {
  resources: RESOURCES,
  objects: OBJECTS,
  resource_types: RESOURCE_TYPES
};
