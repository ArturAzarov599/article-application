import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config());

const DataSourceConfig = new DataSource({
  type: 'postgres',
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  entities: [process.env.DB_ENTITIES_PATH],
  migrations: [process.env.DB_MIGRATIONS_PATH],
  synchronize: false,
  migrationsRun: true,
});

export default DataSourceConfig;
