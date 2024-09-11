import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {RegistryDataProvider} from "./git-data-provider.service";

export const CONTAINERS: DataPageConfig = {
  title: 'Containers',
  fields: [
    {key: 'name', title: 'Name', type: FieldType.STRING},
  ],
  commands: [ ],
  listQ: '/v2/_catalog',
  dataProvider: RegistryDataProvider,
};

export const TABLES = {
  containers: CONTAINERS,
};
