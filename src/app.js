require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { router } = require("./routes");

const {
  boomErrorHandler,
  errorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");
const { checkApiKey, checkToken } = require("./middlewares/auth.handler");
const { checkCookie } = require("./middlewares/cookie.handler");

const app = express();

app.use(cors());

app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(checkApiKey);

router.use(checkCookie);

router.use(checkToken);

app.use(router);

app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;
