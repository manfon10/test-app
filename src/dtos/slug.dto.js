const Joi = require("joi");

const name = Joi.string();
const slug = Joi.string();
const slug_root = Joi.string();
const icon = Joi.string();

const createSlugMenuDto = Joi.object({
  name: name.required(),
  slug: slug.required(),
  slug_root: slug_root.required(),
  icon: icon.required(),
});

const rol_id = Joi.number();
const menu_slug_id = Joi.number();

const assignSlugDto = Joi.object({
  rol_id: rol_id.required(),
  menu_slug_id: menu_slug_id.required(),
});

module.exports = { createSlugMenuDto, assignSlugDto };
