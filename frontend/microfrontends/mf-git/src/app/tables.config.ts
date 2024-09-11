import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {GitDataProvider} from "./git-data-provider.service";

export const REPOSITORIES: DataPageConfig = {
  title: 'Repositories',
  fields: [
    {key: 'name', title: 'Name', type: FieldType.STRING},
    {key: 'date', title: 'Last Commit', type: FieldType.DATE},
    {key: 'hash', title: 'Hash', type: FieldType.STRING},
    {key: 'ci', title: 'CI', type: FieldType.BOOLEAN},
    {key: 'size', title: 'Size', type: FieldType.NUMBER},
    {key: 'tags', title: 'Tags', type: FieldType.STRING_MULTILINE},
  ],
  commands: [ ],
  listQ: 'updateRepoCache', //repositoriesListWide
  dataProvider: GitDataProvider,
};

export const TABLES = {
  repositories: REPOSITORIES,
};
