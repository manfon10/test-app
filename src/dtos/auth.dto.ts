import Joi from "joi";

const email = Joi.string().email();
const password = Joi.string();

export const loginUserDto = Joi.object({
  email: email.required(),
  password: password.required(),
});
