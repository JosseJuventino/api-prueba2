import express from "express";
import router from "./routes/index.route";
import { checkDatabase } from "./models"; // Si implementaste la función que sugerí anteriormente
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

app.use(cors());

async function startServer() {
  try {
    await checkDatabase();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor listo en http://localhost:${PORT}/api`);
      console.log(`🔵 Ruta de usuarios: http://localhost:${PORT}/api/users`);
      console.log(`🔵 Ruta de tareas: http://localhost:${PORT}/api/tasks`);
    });
  } catch (error) {
    console.error("🔥 Error al iniciar:", error);
    process.exit(1);
  }
}

startServer();
