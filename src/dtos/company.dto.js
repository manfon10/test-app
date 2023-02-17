const Joi = require("joi");

const name_company = Joi.string();
const business_name = Joi.string();
const rfc = Joi.string();

const createCompanyDto = Joi.object({
  name: name_company.required(),
  business_name: business_name.required(),
  rfc: rfc.required(),
});

const company_id = Joi.number();

const filterCompanyByParamsDto = Joi.object({
  id: company_id.required(),
});

module.exports = {
  createCompanyDto,
  filterCompanyByParamsDto,
};
