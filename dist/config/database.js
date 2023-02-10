"use strict";
require("dotenv/config");
const config = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: process.env.NODE_ENV === "production"
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
module.exports = config;
