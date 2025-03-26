import { Request, Response, RequestHandler } from "express";
import { Task, User } from "../models";

export const taskController = {
  // Crear tarea para un usuario
  create: (async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res
          .status(400)
          .json({ error: "El userId debe ser un número válido" });
      }
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).json({ error: "El título es requerido" });
      }

      const task = await Task.create({
        title,
        description,
        userId,
        completed: false,
      });

      res.status(201).json(task);
    } catch (error: any) {
      res.status(500).json({
        error: "Error al crear tarea",
        details: error.message,
      });
    }
  }) as RequestHandler,

  // Obtener todas las tareas
  getAll: (async (req: Request, res: Response) => {
    try {
      const tasks = await Task.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
        ],
      });
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({
        error: "Error al obtener tareas",
        details: error.message,
      });
    }
  }) as RequestHandler,

  // Marcar tarea como completada
  complete: (async (req: Request, res: Response) => {
    try {
      const [updated] = await Task.update(
        { completed: true },
        { where: { id: req.params.id } }
      );

      if (!updated) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }

      res.json({ message: "Tarea marcada como completada" });
    } catch (error: any) {
      res.status(500).json({
        error: "Error al completar tarea",
        details: error.message,
      });
    }
  }) as RequestHandler,
};
