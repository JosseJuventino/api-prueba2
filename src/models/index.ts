import { Sequelize } from "sequelize";
import { User } from "./user";
import { Task } from "./task";
import config from "../config/db";

const env =
  (process.env.NODE_ENV as "development" | "test" | "production") ||
  "development";

const dbConfig = config[env];

if (!dbConfig) {
  throw new Error(`
    Configuración de base de datos no encontrada para el entorno: ${env}
    Verifica tu archivo config/db.ts
  `);
}

console.log("Usando configuración:", dbConfig); // Para debug

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
    logging: dbConfig.logging,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

User.initialize(sequelize);
Task.initialize(sequelize);

User.associate({ Task });
Task.associate({ User });

export async function checkDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida");

    // Estrategia diferente por entorno
    if (process.env.NODE_ENV === "development") {
      // Elimina el alter y realiza migraciones manuales
      console.log("🔧 En desarrollo se usarán migraciones manuales");
    } else if (process.env.NODE_ENV === "test") {
      await sequelize.sync({ force: true }); // Recrea tablas (para tests)
      console.log("🔄 Tablas recreadas (FORCE)");
    } else {
      console.log("🔧 En producción usa migraciones manuales");
    }

    // Verificación de tablas (opcional)
    const [tables] = await sequelize.query(
      `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`
    );
    console.log(
      "📊 Tablas existentes:",
      tables.map((t: any) => t.TABLE_NAME)
    );
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}

export { sequelize, User, Task };
