const { cookieResponse } = require("../middlewares/cookie.handler");

const authService = require("../services/auth.service");

const loginUser = async (req, res, next) => {
  try {
    const body = req.body;

    const responseLogin = await authService.login(body);

    return cookieResponse(res, { ...responseLogin });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser };
