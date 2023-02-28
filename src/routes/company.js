const Router = require("express");

const {
  createCompany,
  deleteCompanyById,
  updateCompanyById,
  getAllCompanies,
  getCompanyById,
} = require("../controllers/company.controller");

const {
  createCompanyDto,
  filterCompanyByParamsDto,
} = require("../dtos/company.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_empresas"), getAllCompanies);

router.get(
  "/:id",
  checkPermissions("visualizar_empresa"),
  validatorHandler(filterCompanyByParamsDto, "params"),
  getCompanyById
);

router.delete(
  "/:id",
  checkPermissions("eliminar_empresa"),
  validatorHandler(filterCompanyByParamsDto, "params"),
  deleteCompanyById
);

router.patch(
  "/:id",
  checkPermissions("actualizar_empresa"),
  validatorHandler(filterCompanyByParamsDto, "params"),
  updateCompanyById
);

router.post(
  "/create_company",
  checkPermissions("crear_empresa"),
  validatorHandler(createCompanyDto, "body"),
  createCompany
);

module.exports = router;
