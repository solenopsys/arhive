import {DataPageConfig, FacetType, FieldType} from "@solenopsys/fl-dgraph";
import {DgraphDataBuffered} from "@solenopsys/fl-dgraph";


export const PROCESSES: DataPageConfig = {
    title: 'Process',
    nameField: 'rom.process',
    fields: [
        {key: 'uid', title: 'UID', type: FieldType.UID},
        {key: 'rom.process', title: 'Process', type: FieldType.STRING},
        {
            key: 'inResources',
            title: 'Input',
            type: FieldType.EUID,
            link: {titleField: 'rom.resource', multiple: true, facets: [{name: 'count', type: FacetType.NUMBER}]}
        },
        {
            key: 'outResources',
            title: 'Output',
            type: FieldType.EUID,
            link: {titleField: 'rom.resource', multiple: true, facets: [{name: 'count', type: FacetType.NUMBER}]}
        },
        {key: 'internal', title: 'Internal', type: FieldType.BOOLEAN},
        {key: 'rom.time', title: 'Optimistic time', type: FieldType.NUMBER},
    ],
    commands: ['edit', 'delete'],
    listQ: 'has(rom.process)',
    deleteQ: 'rom.process',
  dataProvider: DgraphDataBuffered,
};


export const PROCESSES_TEMPLATES: DataPageConfig = {
    title: 'Process Templates',
    nameField: 'rom.process.template',
    fields: [
        {key: 'uid', title: 'UID', type: FieldType.UID},
        {key: 'rom.process.template', title: 'Process Template', type: FieldType.STRING},
    ],
    commands: ['edit'],
    listQ: 'has(rom.process.template)',
  dataProvider: DgraphDataBuffered,
};


export const GOALS: DataPageConfig = {
    title: 'Goal',
    fields: [
        {key: 'uid', title: 'UID', type: FieldType.UID},
        {key: 'rom.goal', title: 'Goal', type: FieldType.STRING},
        {key: 'description', title: 'Description', type: FieldType.STRING_MULTILINE},
        {
            key: 'resources',
            title: 'Resources',
            type: FieldType.EUID,
            link: {titleField: 'rom.resource', multiple: true}
        }, {
            key: 'processes',
            title: 'Processes',
            type: FieldType.EUID,
            link: {titleField: 'rom.process', multiple: true}
        },
        {key: 'achieved', title: 'Achieved', type: FieldType.BOOLEAN},
    ],
    commands: ['edit', 'delete'],
    listQ: 'has(rom.goal)',
    deleteQ: 'rom.goal',
  dataProvider: DgraphDataBuffered,
};





export const EXECUTIONS: DataPageConfig = {
    title: 'Execution',
    fields: [
        {key: 'uid', title: 'UID', type: FieldType.UID},
        {key: 'date', title: 'Date', type: FieldType.DATE},
        {key: 'rom.execution', title: 'Process', type: FieldType.EUID, link: {titleField: 'rom.process', multiple: false}},
        {key: 'description', title: 'Description', type: FieldType.STRING},
        {key: 'where_is', title: 'Results to', type: FieldType.EUID, link: {titleField: 'name', multiple: false}},
        {key: 'complete', title: 'Complete', type: FieldType.BOOLEAN},
    ],
    commands: [],
    listQ: 'has(rom.execution)',
  dataProvider: DgraphDataBuffered,
};




export const TABLES_CONFS = {
  executions: EXECUTIONS,
  processes: PROCESSES,
  processes_templates: PROCESSES_TEMPLATES,
  goals: GOALS,
};
