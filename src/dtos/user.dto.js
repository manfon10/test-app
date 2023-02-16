const Joi = require("joi");

const names = Joi.string();
const surnames = Joi.string();
const email = Joi.string().email();
const level_id = Joi.number();
const area_id = Joi.number();
const rol_id = Joi.number();

const createUserDto = Joi.object({
  names: names.required(),
  surnames: surnames.required(),
  email: email.required(),
  level_id: level_id.required(),
  area_id: area_id.required(),
  rol_id: rol_id.required(),
});

module.exports = { createUserDto };
