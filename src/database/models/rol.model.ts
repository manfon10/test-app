import { DataTypes, Model } from "sequelize";

import { sequelize } from ".";

import { IRolAttributes, IRolInput } from "../../types/models/user.type";
import MenuSlug from "./menuSlug.model";

class Rol extends Model<IRolAttributes, IRolInput> implements IRolAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rol.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

Rol.belongsToMany(MenuSlug, { as: "menu_slugs", through: "rols_menu_slugs" });
MenuSlug.belongsToMany(Rol, { as: "menu_slugs", through: "rols_menu_slugs" });

export default Rol;
