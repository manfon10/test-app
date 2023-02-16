const boom = require("@hapi/boom");

const Branch = require("../models/branch.model");
const Company = require("../models/company.model");

const companyService = {
  findCompny: async (filters) => {
    const company = await Company.findOne({ where: filters });

    if (!company) {
      throw boom.badRequest("Company does not exist");
    }

    return company;
  },

  assignBranch: async (data) => {
    const company = await companyService.findCompny({ id: data.company_id });

    if (company.branch_id) {
      throw boom.notFound("The company already has an assigned branch!");
    }

    return await companyService.updateCompany(
      { branch_id: data.branch_id },
      { id: company.id }
    );
  },

  createCompany: async (data) => {
    const company = await Company.create(data);

    return company;
  },

  createBranch: async (data) => {
    const branch = await Branch.create(data);

    return branch;
  },

  updateCompany: async (data, filters) => {
    return await Company.update(data, { where: filters });
  },
};

module.exports = companyService;
