const boom = require("@hapi/boom");

const Branch = require("../models/branch.model");
const Company = require("../models/company.model");

const companyService = {
  assignBranch: async (data) => {
    const company = await companyService.findCompany({ id: data.company_id });

    if (company.branch_id) {
      throw boom.notFound("The company already has an assigned branch!");
    }

    return await companyService.updateCompany(
      { branch_id: data.branch_id },
      { id: company.id }
    );
  },

  createBranch: async (data) => {
    const branch = await Branch.create(data);

    return branch;
  },

  createCompany: async (data) => {
    const company = await Company.create(data);

    return company;
  },

  deleteCompny: async (filters) => {
    await companyService.findCompany(filters);

    return await Company.destroy({ where: filters });
  },

  findCompany: async (filters) => {
    const company = await Company.findOne({
      include: {
        model: Branch,
        as: "branch",
        attributes: [
          "id",
          "address",
          "city",
          "state",
          "postal_code",
          "email_contact",
          "phone",
          "email_administrator",
          "country",
        ],
      },
      attributes: ["id", "name", "business_name", "rfc"],
      where: filters,
    });

    if (!company) {
      throw boom.badRequest("Company does not exist");
    }

    return company;
  },

  updateCompany: async (data, filters) => {
    return await Company.update(data, { where: filters });
  },
};

module.exports = companyService;
