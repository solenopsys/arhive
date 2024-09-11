import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {DgraphDataBuffered} from "@solenopsys/fl-dgraph";

export const BUGS: DataPageConfig = {
  title: 'Bugs',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'bug.name', title: 'Name', type: FieldType.STRING},
    {key: 'bug.description', title: 'Description', type: FieldType.STRING_MULTILINE},
    {key: 'bug.fixed', title: 'Fixed', type: FieldType.BOOLEAN},
    {key: 'scope', title: 'Scopes', type: FieldType.EUID, link: {titleField: 'quality.scope', multiple: true}},
  ],
  commands: ['edit','delete'],
  listQ: 'has(bug.name)',
  deleteQ: 'bug.name',
  dataProvider: DgraphDataBuffered,
};

export const TODOS: DataPageConfig = {
  title: 'Todos',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'todo.name', title: 'Name', type: FieldType.STRING},
    {key: 'todo.description', title: 'Description', type: FieldType.STRING_MULTILINE},
    {key: 'todo.closed', title: 'Done', type: FieldType.BOOLEAN},
    {key: 'scope', title: 'Scopes', type: FieldType.EUID, link: {titleField: 'quality.scope', multiple: true}},
  ],
  commands: ['edit','delete'],
  listQ: 'has(todo.name)',
  deleteQ: 'todo.name',
  dataProvider: DgraphDataBuffered,
};

export const SCOPES: DataPageConfig = {
  title: 'Scopes',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'quality.scope', title: 'Scope', type: FieldType.STRING},
  ],
  commands: ['edit'],
  listQ: 'has(quality.scope)',
  dataProvider: DgraphDataBuffered,
};
