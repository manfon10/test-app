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

module.exports = { createSlugMenuDto };
