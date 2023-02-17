const Joi = require("joi");

const name_company = Joi.string();
const business_name = Joi.string();
const rfc = Joi.string();

const createCompanyDto = Joi.object({
  name: name_company.required(),
  business_name: business_name.required(),
  rfc: rfc.required(),
});

const address = Joi.string();
const city = Joi.string();
const state = Joi.string();
const postal_code = Joi.string();
const email_contact = Joi.string().email();
const phone = Joi.string();
const email_administrator = Joi.string().email();
const country = Joi.string();

const createBranchDto = Joi.object({
  address: address.required(),
  city: city.required(),
  state: state.required(),
  postal_code: postal_code.required(),
  email_contact: email_contact.required(),
  phone: phone.required(),
  email_administrator: email_administrator.required(),
  country: country.required(),
});

const company_id = Joi.number();
const branch_id = Joi.number().integer();

const assignBranchCompanyDto = Joi.object({
  company_id: company_id.required(),
  branch_id: branch_id.required(),
});

const filterCompanyByParamsDto = Joi.object({
  id: company_id.required(),
});

module.exports = {
  createCompanyDto,
  createBranchDto,
  assignBranchCompanyDto,
  filterCompanyByParamsDto,
};
