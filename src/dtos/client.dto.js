const Joi = require("joi");

const name = Joi.string();

const createClientDto = Joi.object({
  name: name.required(),
});

const client_id = Joi.string();

const filterClientByParamsDto = Joi.object({
  id: client_id.required(),
});

module.exports = { createClientDto, filterClientByParamsDto };
