const Joi = require("joi");

const name = Joi.string();
const rol_id = Joi.number();
const menu_slug_id = Joi.number();

const createPermissionDto = Joi.object({
  name: name.required(),
  rol_id: rol_id.required(),
  menu_slug_id: menu_slug_id.required(),
});

const permission_id = Joi.string();

const filterPermissionByParamsDto = Joi.object({
  id: permission_id.required(),
});

module.exports = { createPermissionDto, filterPermissionByParamsDto };
