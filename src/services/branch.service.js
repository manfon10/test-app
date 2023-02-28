const boom = require("@hapi/boom");

const Branch = require("../models/branch.model");
const Company = require("../models/company.model");

const branchService = {
  /**
   * Create an branch
   * @param { Object } data - Area branch
   * @returns { Object } Branch data created
   */

  createBranch: async (data) => {
    const branchCreate = await Branch.create(data);

    const branch = await branchService.findBranch({ id: branchCreate.id });

    return branch;
  },

  /**
   * Delete an branch
   * @param { Object } filters - filters
   * @returns { Object } Affected rows
   */

  deleteBranch: async (filters) => {
    await branchService.findBranch(filters);

    return await Branch.destroy({ where: filters });
  },

  /**
   * Get area
   * @param { Object } filters - filters
   * @returns { Array } Branc
   */

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

  /**
   * Get branches
   * @param { Object } filters - filters
   * @returns { Array } Branches
   */

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

  /**
   * Update an branch
   * @param { Object } data - Branch data to update
   * @param { Object } filters - filters
   * @returns { Object } Branch updated
   */

  updateBranch: async (data, filters) => {
    await Branch.update(data, { where: filters });

    return await branchService.findBranch(filters);
  },
};

module.exports = branchService;
