require("dotenv").config();

const boom = require("@hapi/boom");

const cookieResponse = (res, data) => {
  if (data.user) {
    return res
      .status(201)
      .cookie("token", data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        expires: new Date(new Date().setDate(new Date().getDate() + 1)),
      })
      .json({
        ...data,
      });
  }

  throw boom.unauthorized();
};

const checkCookie = (req, _, next) => {
  if (req.headers.cookie) {
    return next();
  }

  throw boom.unauthorized();
};

module.exports = { checkCookie, cookieResponse };