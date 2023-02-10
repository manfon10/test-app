import "dotenv/config";

import { Sequelize } from "sequelize";

import { config } from "../../config/database";

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

export { Sequelize, sequelize };
