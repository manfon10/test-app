const Router = require("express");

const {
  createCompany,
  createBranch,
  assignBranchCompany,
} = require("../controllers/company.controller");

const {
  createCompanyDto,
  createBranchDto,
  assignBranchCompanyDto,
} = require("../dtos/company.dto");

const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

// Routes super admin

router.post(
  "/create_branch",
  validatorHandler(createBranchDto, "body"),
  createBranch
);

router.post(
  "/create",
  validatorHandler(createCompanyDto, "body"),
  createCompany
);

router.post(
  "/assign_branch_company",
  validatorHandler(assignBranchCompanyDto, "body"),
  assignBranchCompany
);

module.exports = router;
