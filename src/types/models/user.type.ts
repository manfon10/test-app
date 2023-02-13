import { Optional } from "sequelize";

// Interface UserModel

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

// Interface LevelModel

export interface ILevelAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILevelInput extends Optional<ILevelAttributes, "id"> {}
export interface ILevelOutput extends Required<ILevelAttributes> {}

// Interface AreaModel

export interface IAreaAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAreaInput extends Optional<IAreaAttributes, "id"> {}
export interface IAreaOutput extends Required<IAreaAttributes> {}

// Interface RolModel

export interface IRolAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRolInput extends Optional<IRolAttributes, "id"> {}
export interface IRolOutput extends Required<IRolAttributes> {}
