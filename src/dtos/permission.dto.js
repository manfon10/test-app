const Joi = require("joi");

const name = Joi.string();
const rol_id = Joi.number();
const menu_slug_id = Joi.number();

const createPermissionDto = Joi.object({
  name: name.required(),
  rol_id: rol_id.required(),
  menu_slug_id: menu_slug_id.required(),
});

module.exports = { createPermissionDto };
