import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {DgraphDataBuffered} from "@solenopsys/fl-dgraph";


export const CAMERAS: DataPageConfig = {
  title: 'Камера',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'camera.folder', title: 'Folder', type: FieldType.STRING},
    {key: 'description', title: 'Description', type: FieldType.STRING},
    {key: 'port', title: 'Port', type: FieldType.NUMBER},
    {key: 'host', title: 'Host', type: FieldType.STRING},
    {key: 'enabled', title: 'Enabled', type: FieldType.BOOLEAN},
    {
      key: 'camera.convertors',
      title: 'Convertors',
      type: FieldType.EUID,
      link: {titleField: 'camera.stream', multiple: false}
    },
  ],
  commands: ['edit'],
  listQ: 'has(camera.folder)',
  dataProvider: DgraphDataBuffered,
};

export const STREAM_CONFIG: DataPageConfig = {
  title: 'Камера',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'camera.stream', title: 'Name', type: FieldType.STRING},
    {key: 'extension', title: 'File extension', type: FieldType.STRING},
    {key: 'command.client', title: 'Client command', type: FieldType.CODE, format: 'bash'},
    {key: 'command.server', title: 'Server command', type: FieldType.CODE, format: 'bash'},
    {key: 'command.browser', title: 'Web command', type: FieldType.CODE, format: 'bash'},
  ],
  commands: ['edit'],
  listQ: 'has(camera.stream)',
  dataProvider: DgraphDataBuffered,
};

export const TABLES = {
  cameras: CAMERAS,
  convertors: STREAM_CONFIG
};
