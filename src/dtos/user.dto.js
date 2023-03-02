const Joi = require("joi");

const names = Joi.string();
const surnames = Joi.string();
const email = Joi.string().email();
const level_id = Joi.number();
const area_id = Joi.number();
const rol_id = Joi.number();
const is_manager = Joi.boolean();

const createUserDto = Joi.object({
  names: names.required(),
  surnames: surnames.required(),
  email: email.required(),
  level_id: level_id.required(),
  area_id: area_id.required(),
  rol_id: rol_id.required(),
  is_manager: is_manager.required(),
});

const user_id = Joi.number();
const permission_id = Joi.number();

const assignPermissionToUserDto = Joi.object({
  user_id: user_id.required(),
  permission_id: permission_id.required(),
});

const filterUserByParamsDto = Joi.object({
  id: user_id.required(),
});

const current_password = Joi.string();
const new_password = Joi.string();

const updatePasswordDto = Joi.object({
  current_password: current_password.required(),
  new_password: new_password.required(),
});

module.exports = {
  createUserDto,
  assignPermissionToUserDto,
  filterUserByParamsDto,
  updatePasswordDto,
};
