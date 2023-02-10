import "dotenv/config";

import { Dialect } from "sequelize";

export const config = {
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE as string,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT as Dialect,
  dialectOptions:
    process.env.NODE_ENV === "production"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeSeeds",
  define: {
    underscored: true,
  },
};
