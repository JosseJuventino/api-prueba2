import { DataTypes, Model, Sequelize } from "sequelize";
import { User } from "./user";

export class Task extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public userId!: number;
  public description!: string;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING(256),
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(512),
          allowNull: true,
        },
        completed: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Task", // Corregido de "User" a "Task"
        tableName: "tasks", // Cambiado a nombre de tabla correcto
        timestamps: true,
      }
    );
  }

  static associate(models: { User: typeof User }) {
    this.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
