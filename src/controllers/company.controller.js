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

const findCompanyById = async (req, res, next) => {
  try {
    const id = req.params;

    const company = await companyService.findCompany(id);

    res.status(200).json({ company });
  } catch (error) {
    next(error);
  }
};

const deleteCompanyById = async (req, res, next) => {
  try {
    const id = req.params;

    await companyService.deleteCompny(id);

    res.status(201).json({ message: "Company deleted!" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBranch,
  createCompany,
  assignBranchCompany,
  findCompanyById,
  deleteCompanyById,
};
