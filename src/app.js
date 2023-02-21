require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { router } = require("./routes");

const {
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");
const { checkApiKey } = require("./middlewares/auth.handler");

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(checkApiKey);

app.use(router);

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
