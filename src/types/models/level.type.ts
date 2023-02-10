import { Optional } from "sequelize";

export interface ILevelAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILevelInput extends Optional<ILevelAttributes, "id"> {}
export interface ILevelOutput extends Required<ILevelAttributes> {
  dataValues: ILevelAttributes;
}
