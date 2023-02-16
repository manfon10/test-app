const { Router } = require("express");

const { readdirSync } = require("fs");

const PATH_ROUTER = __dirname;

const router = Router();

const cleanFileName = (fileName) => {
  return fileName.split(".").shift();
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  if (cleanFileName(fileName) !== "index") {
    router.use(`/${cleanFileName(fileName)}`, require(`./${fileName}`));
  }
});

module.exports = { router };
