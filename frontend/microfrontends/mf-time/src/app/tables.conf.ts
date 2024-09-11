import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {DgraphDataBuffered} from "@solenopsys/fl-dgraph";


export const TIMES: DataPageConfig = {
  title: 'Time',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'rom.time', title: 'Time', type: FieldType.NUMBER},
    {key: 'description', title: 'Description', type: FieldType.STRING},
    {key: 'executionLink', title: 'Execution', type: FieldType.EUID, link: {titleField: 'rom.execution', multiple: false}},
    {key: 'date', title: 'Date', type: FieldType.DATE},
  ],
  commands: ['edit'],
  listQ: 'has(rom.time)',
  dataProvider: DgraphDataBuffered,
};
