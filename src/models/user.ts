import { DataTypes, Model, Sequelize } from "sequelize";
import { Task } from "./task";

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(128),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(128),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
      }
    );
  }

  static associate(models: { Task: typeof Task }) {
    this.hasMany(models.Task, {
      foreignKey: "userId",
      as: "tasks",
    });
  }
}
