const boom = require("@hapi/boom");

const Company = require("../models/company.model");

const companyService = {
  /**
   * Create an company
   * @param { Object } data - Company data
   * @returns { Object } Compnay data created
   */

  createCompany: async (data) => {
    const company = await Company.create(data);

    return company;
  },

  /**
   * Delete an company
   * @param { Object } filters - filters
   * @returns { Object } Affected rows
   */

  deleteCompny: async (filters) => {
    await companyService.findCompany(filters);

    return await Company.destroy({ where: filters });
  },

  /**
   * Get companies
   * @param { Object } filters - filters
   * @returns { Array } Companies
   */

  findCompanies: async () => {
    const companies = await Company.findAll({
      attributes: ["id", "name", "business_name", "rfc"],
    });

    return companies;
  },

  /**
   * Get company
   * @param { Object } filters - filters
   * @returns { Array } Company
   */

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

  /**
   * Update an Company
   * @param { Object } data - Company data to update
   * @param { Object } filters - filters
   * @returns { Object } Company updated
   */

  updateCompany: async (data, filters) => {
    await Company.update(data, { where: filters });

    return await companyService.findCompany(filters);
  },
};

module.exports = companyService;
