import * as dotenv from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

const getDataSourceOptions = (): DataSourceOptions => {
  const baseConfig = {
    type: "postgres" as const,
    synchronize: false,
    logging: isDevelopment ? true : false,
    entities: [__dirname + "/../entities/*.{ts,js}"],
    migrations: [__dirname + "/../migrations/*.{ts,js}"],
    migrationsRun: isProduction,
    migrationsTableName: "migrations_history",
    subscribers: [],
  };

  if (process.env.DATABASE_URL) {
    return {
      ...baseConfig,
      url: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL_CA
        ? { rejectUnauthorized: true, ca: process.env.DB_SSL_CA }
        : { rejectUnauthorized: false },
    };
  }

  return {
    ...baseConfig,
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "candidates_db",
    ssl: false,
  };
};

export const AppDataSource = new DataSource(getDataSourceOptions());
