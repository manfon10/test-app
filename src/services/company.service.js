const boom = require("@hapi/boom");

const Company = require("../models/company.model");

const companyService = {
  createCompany: async (data) => {
    const company = await Company.create(data);

    return company;
  },

  deleteCompny: async (filters) => {
    await companyService.findCompany(filters);

    return await Company.destroy({ where: filters });
  },

  findCompanies: async () => {
    const companies = await Company.findAll({
      attributes: ["id", "name", "business_name", "rfc"],
    });

    return companies;
  },

  findCompany: async (filters) => {
    const company = await Company.findOne({
      attributes: ["id", "name", "business_name", "rfc"],
      where: filters,
    });

    if (!company) {
      throw boom.badRequest("Company does not exist");
    }

    return company;
  },

  updateCompany: async (data, filters) => {
    await companyService.findCompany(filters);

    return await Company.update(data, { where: filters });
  },
};

module.exports = companyService;
