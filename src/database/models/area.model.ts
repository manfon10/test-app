import { DataTypes, Model } from "sequelize";

import { sequelize } from ".";

import { IAreaAttributes, IAreaInput } from "../../types/models/area.type.";

class Area
  extends Model<IAreaAttributes, IAreaInput>
  implements IAreaAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Area.init(
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

export default Area;
