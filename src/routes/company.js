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

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkToken);
router.use(checkCookie);

// Routes super admin

router.get("/", findAllCompanies);

router.get(
  "/:id",
  validatorHandler(filterCompanyByParamsDto, "params"),
  findCompanyById
);

router.delete(
  "/:id",
  validatorHandler(filterCompanyByParamsDto, "params"),
  deleteCompanyById
);

router.patch(
  "/:id",
  validatorHandler(filterCompanyByParamsDto, "params"),
  updateCompanyById
);

router.post(
  "/create_company",
  validatorHandler(createCompanyDto, "body"),
  createCompany
);

module.exports = router;
