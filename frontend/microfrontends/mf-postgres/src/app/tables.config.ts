import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {PostgresqlDataProvider} from "./postgresql-data-provider.service";

export const PG_TABLES: DataPageConfig = {
  title: 'Tables',
  fields: [
    {key: 'name', title: 'Name', type: FieldType.STRING},
    {key: 'type', title: 'Name', type: FieldType.STRING},
  ],
  commands: [ ],
  listQ: "SELECT json_agg( json_build_object ('name',table_name,'type',table_type)) as json  FROM information_schema.tables",
  dataProvider: PostgresqlDataProvider,
};

export const TABLES = {
  tables: PG_TABLES,
};
