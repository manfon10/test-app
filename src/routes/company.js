const Router = require("express");

const {
  createCompany,
  findCompanyById,
  deleteCompanyById,
  findAllCompanies,
  updateCompanyById,
} = require("../controllers/company.controller");

const {
  createCompanyDto,
  filterCompanyByParamsDto,
} = require("../dtos/company.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

// Routes super admin

// Create company

router.post(
  "/create_company",
  validatorHandler(createCompanyDto, "body"),
  createCompany
);

// Find company by id

router.get(
  "/:id",
  validatorHandler(filterCompanyByParamsDto, "params"),
  findCompanyById
);

// Delete company by id

router.delete(
  "/:id",
  validatorHandler(filterCompanyByParamsDto, "params"),
  deleteCompanyById
);

// Find all companies

router.get("/", findAllCompanies);

router.patch(
  "/:id",
  validatorHandler(filterCompanyByParamsDto, "params"),
  updateCompanyById
);

module.exports = router;
