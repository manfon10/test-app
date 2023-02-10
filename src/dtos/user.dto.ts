import Joi from "joi";

const names = Joi.string();
const surnames = Joi.string();
const email = Joi.string().email();
const level_id = Joi.number();
const area_id = Joi.number();

export const createUserDto = Joi.object({
  names: names.required(),
  surnames: surnames.required(),
  email: email.required(),
  level_id: level_id.required(),
  area_id: area_id.required(),
});
