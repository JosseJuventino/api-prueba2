import * as dotenv from "dotenv";
import path from "path";
import { Dialect } from "sequelize";

dotenv.config({ path: path.join(__dirname, "../../.env") });

interface DbConfig {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: Dialect; // Cambiado a tipo Dialect
  dialectOptions: {
    options: {
      encrypt: boolean;
      trustServerCertificate: boolean;
      instanceName?: string;
    };
  };
  logging: boolean | ((sql: string, timing?: number) => void);
}

interface Config {
  development: DbConfig;
  test?: DbConfig;
  production?: DbConfig;
  [key: string]: DbConfig | undefined;
}

const config: Config = {
  development: {
    database: process.env.DB_NAME || "task_manager_db",
    username: process.env.DB_USERNAME || "sa",
    password: process.env.DB_PASSWORD || "NuevaContraseñaFuerte123",
    host: process.env.DB_HOST || "localhost\\SQLEXPRESS",
    port: parseInt(process.env.DB_PORT || "1433"),
    dialect: "mssql" as Dialect, // Aseguramos el tipo Dialect
    dialectOptions: {
      options: {
        encrypt: false,
        trustServerCertificate: true,
        instanceName: (process.env.DB_HOST || "").includes("\\")
          ? (process.env.DB_HOST || "").split("\\")[1]
          : undefined,
      },
    },
    logging: console.log,
  },
};

export default config;
