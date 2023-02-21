const Joi = require("joi");

const name = Joi.string();

const createAreaDto = Joi.object({
  name: name.required(),
});

const area_id = Joi.string();

const filterAreaByParamsDto = Joi.object({
  id: area_id.required(),
});

module.exports = { createAreaDto, filterAreaByParamsDto };
