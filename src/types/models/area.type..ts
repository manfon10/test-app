import { Optional } from "sequelize";

export interface IAreaAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAreaInput extends Optional<IAreaAttributes, "id"> {}
export interface IAreaOutput extends Required<IAreaAttributes> {
  dataValues: IAreaAttributes;
}
