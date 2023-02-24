const Joi = require("joi");

const name = Joi.string();

const createRolDto = Joi.object({
  name: name.required(),
});

const rol_id = Joi.string();

const filterRolByParamsDto = Joi.object({
  id: rol_id.required(),
});

module.exports = { createRolDto, filterRolByParamsDto };
