import { DataTypes, Model } from "sequelize";

import { sequelize } from ".";

import {
  IMenuSlugAttributes,
  IMenuSlugInput,
} from "../../types/models/app.type";

class MenuSlug
  extends Model<IMenuSlugAttributes, IMenuSlugInput>
  implements IMenuSlugAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MenuSlug.init(
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
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

export default MenuSlug;
