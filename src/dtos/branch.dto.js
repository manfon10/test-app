const Joi = require("joi");

const address = Joi.string();
const city = Joi.string();
const state = Joi.string();
const postal_code = Joi.string();
const email_contact = Joi.string().email();
const phone = Joi.string();
const email_administrator = Joi.string().email();
const country = Joi.string();
const company_id = Joi.number();

const createBranchDto = Joi.object({
  address: address.required(),
  city: city.required(),
  state: state.required(),
  postal_code: postal_code.required(),
  email_contact: email_contact.required(),
  phone: phone.required(),
  email_administrator: email_administrator.required(),
  country: country.required(),
  company_id: company_id.required(),
});

const branch_id = Joi.string();

const filterBranchByParamsDto = Joi.object({
  id: branch_id.required(),
});

module.exports = { createBranchDto, filterBranchByParamsDto };
