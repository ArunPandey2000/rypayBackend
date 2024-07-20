import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    logging: ["error" , "warn" , "info" , "log"],
    migrations: ['src/migrations/**/*.ts'],
    dropSchema: process.env.DB_DROP_SCHEMA === 'true' ? true : false,
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true' ? true : false,
    migrationsTableName: 'migrations_history',
    extra: {
      connectionLimit: Number(process.env.DB_CONNECTION_LIMIT ?? 50),
    },
  };
export default new DataSource(dataSourceOptions);