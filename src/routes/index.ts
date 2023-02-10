import { Router } from "express";

import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

const cleanFileName = (fileName: string) => {
  return fileName.split(".").shift();
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  if (cleanFileName(fileName) !== "index") {
    import(`./${cleanFileName(fileName)}`).then((moduleRoute) => {
      router.use(`/${cleanFileName(fileName)}`, moduleRoute.router);
    });
  }
});

export { router };
