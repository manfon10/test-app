const Joi = require("joi");

const name = Joi.string();
const part_number = Joi.string();
const cycle_time = Joi.string();
const auditor_id = Joi.number();
const project_id = Joi.number();
const engineering_level = Joi.string();
const user_id = Joi.number();
const area_id = Joi.number();
const core_team = Joi.array().items(
  Joi.object({
    user_id: user_id.required(),
    area_id: area_id.required(),
  })
);

const createProductDto = Joi.object({
  name: name.required(),
  part_number: part_number.required(),
  cycle_time: cycle_time.required(),
  auditor_id: auditor_id.required(),
  project_id: project_id.required(),
  engineering_level: engineering_level.required(),
  core_team: core_team.required(),
});

const product_id = Joi.string();

const filterProductByParamsDto = Joi.object({
  id: product_id.required(),
});

module.exports = { createProductDto, filterProductByParamsDto };
