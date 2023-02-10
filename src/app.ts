import "dotenv/config";

import express from "express";

import cors from "cors";
import morgan from "morgan";

import { router } from "./routes";
import {
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} from "./middlewares/error.handler";
import { checkApiKey } from "./middlewares/auth.handler";

const app = express();

app.use(cors());

app.use(checkApiKey);

app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

export default app;
