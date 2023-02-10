import { Model, Optional } from "sequelize";

interface IUserAttributes {
  id: string | number;
  names: string;
  surnames: string;
  email: string;
  password: string;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, "id"> {}

export interface IUserInstance
  extends Model<IUserAttributes, IUserCreationAttributes>,
    IUserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
