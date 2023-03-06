const Joi = require("joi");

const name = Joi.string();
const client_id = Joi.number();

const createProjectDto = Joi.object({
  name: name.required(),
  client_id: client_id.required(),
});

const project_id = Joi.string();

const filterProjectByParamsDto = Joi.object({
  id: project_id.required(),
});

module.exports = { createProjectDto, filterProjectByParamsDto };
