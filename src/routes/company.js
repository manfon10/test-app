const Router = require("express");

const {
  createCompany,
  createBranch,
  assignBranchCompany,
  findCompanyById,
  deleteCompanyById,
} = require("../controllers/company.controller");

const {
  createCompanyDto,
  createBranchDto,
  assignBranchCompanyDto,
  filterCompanyByParamsDto,
} = require("../dtos/company.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

// Routes super admin

// Create branch

router.post(
  "/create_branch",
  validatorHandler(createBranchDto, "body"),
  createBranch
);

// Create company

router.post(
  "/create_company",
  validatorHandler(createCompanyDto, "body"),
  createCompany
);

// Assign branch to company

router.post(
  "/assign_branch_company",
  validatorHandler(assignBranchCompanyDto, "body"),
  assignBranchCompany
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

module.exports = router;
