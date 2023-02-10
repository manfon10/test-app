import { DataTypes, Model } from "sequelize";

import { sequelize } from ".";

import { IUserAttributes, IUserInput } from "../../types/models/user.type";
import Area from "./area.model";

import Level from "./level.model";

class User
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes
{
  public id!: number;
  public names!: string;
  public surnames!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    names: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surnames: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Level.hasMany(User, { foreignKey: "level_id" });
User.belongsTo(Level, { as: "level", foreignKey: "level_id" });

Area.hasMany(User, { foreignKey: "area_id" });
User.belongsTo(Area, { as: "area", foreignKey: "area_id" });

export default User;
