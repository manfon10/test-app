const Joi = require("joi");

const name = Joi.string();
const part_number = Joi.string();
const cycle_time = Joi.string();
const auditor_id = Joi.number();
const project_id = Joi.number();
const engineering_level = Joi.string();

const createProductDto = Joi.object({
  name: name.required(),
  part_number: part_number.required(),
  cycle_time: cycle_time.required(),
  auditor_id: auditor_id.required(),
  project_id: project_id.required(),
  engineering_level: engineering_level.required(),
});

const product_id = Joi.string();

const filterProductByParamsDto = Joi.object({
  id: product_id.required(),
});

module.exports = { createProductDto, filterProductByParamsDto };
