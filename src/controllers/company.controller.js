const companyService = require("../services/company.service");

const createBranch = async (req, res, next) => {
  try {
    const body = req.body;

    const newBranch = await companyService.createBranch(body);

    res.status(201).json({ newBranch });
  } catch (error) {
    next(error);
  }
};

const createCompany = async (req, res, next) => {
  try {
    const body = req.body;

    const newCompany = await companyService.createCompany(body);

    res.status(201).json({ newCompany });
  } catch (error) {
    next(error);
  }
};

const assignBranchCompany = async (req, res, next) => {
  try {
    const body = req.body;

    await companyService.assignBranch(body);

    res.status(201).json({ message: "Company uopdated!" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBranch, createCompany, assignBranchCompany };
