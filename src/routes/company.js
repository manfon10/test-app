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

router.use(checkCookie);
router.use(checkToken);

router.get(
  "/",
  // checkPermissions("obtener_todas_las_empresas"),
  findAllCompanies
);

router.get(
  "/:id",
  // checkPermissions("obtener_empresa_por_id"),
  validatorHandler(filterCompanyByParamsDto, "params"),
  findCompanyById
);

router.delete(
  "/:id",
  // checkPermissions("eliminar_empresa_por_id"),
  validatorHandler(filterCompanyByParamsDto, "params"),
  deleteCompanyById
);

router.patch(
  "/:id",
  // checkPermissions("actualizar_empresa_por_id"),
  validatorHandler(filterCompanyByParamsDto, "params"),
  updateCompanyById
);

router.post(
  "/create_company",
  // checkPermissions("crear_empresa"),
  validatorHandler(createCompanyDto, "body"),
  createCompany
);

module.exports = router;
