import { Response, Request, Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;

const router = Router();

router.get("/", (_: Request, res: Response) =>
  res.json({ "adv-tech-api": "v1.0.0" })
);

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
