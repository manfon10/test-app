import { DataTypes } from "sequelize";

import { sequelize } from ".";
import { IUserInstance } from "../../types/models/user.type";

const User = sequelize.define<IUserInstance>(
  "User",
  {
    id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
    },
    names: {
      type: DataTypes.STRING,
    },
    surnames: {
      type: DataTypes.STRING,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "users",
  }
);

export default User;
