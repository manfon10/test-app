import Joi from "joi";

const id = Joi.number().integer();
const names = Joi.string();
const surnames = Joi.string();
const password = Joi.string().min(8);
const email = Joi.string().email();

export const createUserDto = Joi.object({
  names: names.required(),
  surnames: surnames.required(),
  password: password.required(),
  email: email.required(),
});
