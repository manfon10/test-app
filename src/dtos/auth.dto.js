const Joi = require("joi");

const email = Joi.string().email();
const password = Joi.string();

const loginUserDto = Joi.object({
  email: email.required(),
  password: password.required(),
});

module.exports = { loginUserDto };
