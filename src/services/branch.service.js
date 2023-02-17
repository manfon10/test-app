const boom = require("@hapi/boom");

const Branch = require("../models/branch.model");
const Company = require("../models/company.model");

const branchService = {
  createBranch: async (data) => {
    const branch = await Branch.create(data);

    return branch;
  },

  deleteBranch: async (filters) => {
    await branchService.findBranch(filters);

    return await Branch.destroy({ where: filters });
  },

  findBranch: async (filters) => {
    const branch = await Branch.findOne({
      include: {
        model: Company,
        as: "company",
        attributes: ["id", "name", "business_name", "rfc"],
      },
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
      where: filters,
    });

    if (!branch) {
      throw boom.badRequest("Company does not exist");
    }

    return branch;
  },

  findBranches: async () => {
    const branches = await Branch.findAll({
      include: {
        model: Company,
        as: "company",
        attributes: ["id", "name", "business_name", "rfc"],
      },
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
    });

    return branches;
  },
};

module.exports = branchService;
