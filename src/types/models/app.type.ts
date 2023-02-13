import { Optional } from "sequelize";

export interface IMenuSlugAttributes {
  id: number;
  name: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMenuSlugInput extends Optional<IMenuSlugAttributes, "id"> {}
export interface IMenuSlugOutput extends Required<IMenuSlugAttributes> {
  dataValues: IMenuSlugAttributes;
}
