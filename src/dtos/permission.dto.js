const Joi = require("joi");

const name = Joi.string();

const createPermissionDto = Joi.object({
  name: name.required(),
});

const permission_id = Joi.number();

const filterPermissionByParamsDto = Joi.object({
  id: permission_id.required(),
});

const rol_id = Joi.number();

const assignPermissionDto = Joi.object({
  rol_id: rol_id.required(),
  permission_id: permission_id.required(),
});

module.exports = {
  createPermissionDto,
  filterPermissionByParamsDto,
  assignPermissionDto,
};
