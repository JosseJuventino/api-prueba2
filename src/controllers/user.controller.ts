import { Request, Response, RequestHandler } from "express";
import { User, Task } from "../models";

export const userController = {
  // Crear usuario
  create: (async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;

      // Validación básica
      if (!name || !email) {
        return res.status(400).json({ error: "Nombre y email son requeridos" });
      }

      const user = await User.create({ name, email });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(500).json({
        error: "Error al crear usuario",
        details: error.message,
      });
    }
  }) as RequestHandler,

  // Obtener todos los usuarios con sus tareas
  getAll: (async (req: Request, res: Response) => {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Task,
            as: "tasks",
          },
        ],
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.json(users);
    } catch (error: any) {
      res.status(500).json({
        error: "Error al obtener usuarios",
        details: error.message,
      });
    }
  }) as RequestHandler,

  // Obtener usuario por ID
  getById: (async (req: Request, res: Response) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [{ model: Task, as: "tasks" }],
      });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.json(user);
    } catch (error: any) {
      res.status(500).json({
        error: "Error al obtener usuario",
        details: error.message,
      });
    }
  }) as RequestHandler,

  // Actualizar usuario
  update: (async (req: Request, res: Response) => {
    try {
      const [updated] = await User.update(req.body, {
        where: { id: req.params.id },
      });

      if (!updated) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(500).json({
        error: "Error al actualizar usuario",
        details: error.message,
      });
    }
  }) as RequestHandler,

  // Eliminar usuario
  delete: (async (req: Request, res: Response) => {
    try {
      const deleted = await User.destroy({
        where: { id: req.params.id },
      });

      if (!deleted) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({
        error: "Error al eliminar usuario",
        details: error.message,
      });
    }
  }) as RequestHandler,
};
