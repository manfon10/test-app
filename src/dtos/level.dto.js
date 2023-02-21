const Joi = require("joi");

const name = Joi.string();

const createLevelDto = Joi.object({
  name: name.required(),
});

const level_id = Joi.string();

const filterLevelByParamsDto = Joi.object({
  id: level_id.required(),
});

module.exports = { createLevelDto, filterLevelByParamsDto };
