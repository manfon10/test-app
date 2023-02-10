import { DataTypes, Model } from "sequelize";

import { sequelize } from ".";
import { ILevelAttributes, ILevelInput } from "../../types/models/level.type";

class Level
  extends Model<ILevelAttributes, ILevelInput>
  implements ILevelAttributes
{
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Level.init(
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

export default Level;
