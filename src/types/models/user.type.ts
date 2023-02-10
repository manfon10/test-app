import { Optional } from "sequelize";

export interface IUserAttributes {
  id: number;
  names: string;
  surnames: string;
  email: string;
  password: string | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserInput
  extends Optional<IUserAttributes, "id" | "password"> {}
export interface IUserOutput extends Required<IUserAttributes> {
  dataValues: IUserAttributes;
}
