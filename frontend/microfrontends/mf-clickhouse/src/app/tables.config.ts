import {DataPageConfig, FieldType} from "@solenopsys/fl-dgraph";
import {ClickhouseDataProvider} from "./clickhouse-data-provider.service";

export const CH_TABLES: DataPageConfig = {
  title: 'Tables',
  fields: [
    {key: 'column_1', title: 'column_1', type: FieldType.NUMBER},
  ],
  commands: [ ],
  listQ: "select column_1 from test_table",
  dataProvider: ClickhouseDataProvider,
};

export const TABLES = {
  tables: CH_TABLES,
};
