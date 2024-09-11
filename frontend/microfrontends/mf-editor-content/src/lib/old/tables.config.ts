import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {DgraphDataBuffered} from "@solenopsys/fl-dgraph";

export const FRAGMENTS: DataPageConfig = {
  title: 'Host',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'fragment', title: 'Name', type: FieldType.STRING},
    {key: 'scope', title: 'Scope', type: FieldType.EUID, link: {titleField: 'content.scope', multiple: true}},
  ],
  commands: ['edit', 'show', 'delete'],
  listQ: 'has(fragment),orderasc:fragment ',
  deleteQ: 'fragment',
  dataProvider: DgraphDataBuffered,
};

export const SCOPES: DataPageConfig = {
  title: 'Scopes',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'content.scope', title: 'Scope', type: FieldType.STRING},
  ],
  commands: ['edit'],
  listQ: 'has(content.scope)',
  dataProvider: DgraphDataBuffered,
};


export const GROUPS: DataPageConfig = {
  title: 'Groups',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'content.group', title: 'Group', type: FieldType.STRING},
    {key: 'content.group.path', title: 'Path', type: FieldType.STRING},
    {
      key: 'content.group.fragment',
      title: 'Fragment',
      type: FieldType.EUID,
      link: {titleField: 'fragment', multiple: true}
    },
    {
      key: 'content.group.children',
      title: 'Children',
      type: FieldType.EUID,
      link: {titleField: 'content.group', multiple: true}
    },
  ],
  commands: ['edit', 'delete'],
  listQ: 'has(content.group)',
  deleteQ: 'content.group',
  dataProvider: DgraphDataBuffered,
};

export const TABLES = {
  fragments: FRAGMENTS,
  scopes: SCOPES,
  groups: GROUPS,
};
