const companyService = require("../services/company.service");

const createCompany = async (req, res, next) => {
  try {
    const body = req.body;

    const newCompany = await companyService.createCompany(body);

    res.status(201).json({ newCompany });
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

const findAllCompanies = async (_, res, next) => {
  try {
    const companies = await companyService.findCompanies();

    res.status(200).json({ companies });
  } catch (error) {
    next(error);
  }
};

const updateCompanyById = async (req, res, next) => {
  try {
    const id = req.params;
    const body = req.body;

    const company = await companyService.updateCompany(body, id);

    res.status(201).json({ message: "Company update!", company });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCompany,
  findCompanyById,
  deleteCompanyById,
  findAllCompanies,
  updateCompanyById,
};
