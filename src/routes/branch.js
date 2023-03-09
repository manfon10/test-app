const Router = require("express");

const {
  createBranch,
  findBranchById,
  findAllBranches,
  deleteBranchById,
  updateBranchById,
} = require("../controllers/branch.controller");

const {
  createBranchDto,
  filterBranchByParamsDto,
} = require("../dtos/branch.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_sucursales"), findAllBranches);

router.get(
  "/:id",
  checkPermissions("visualizar_sucursal"),
  validatorHandler(filterBranchByParamsDto, "params"),
  findBranchById
);

router.delete(
  "/:id",
  checkPermissions("eliminar_sucursal"),
  validatorHandler(filterBranchByParamsDto, "params"),
  deleteBranchById
);

router.patch(
  "/:id",
  checkPermissions("actualizar_sucursal"),
  validatorHandler(filterBranchByParamsDto, "params"),
  updateBranchById
);

router.post(
  "/create_branch",
  checkPermissions("crear_sucursal"),
  validatorHandler(createBranchDto, "body"),
  createBranch
);

module.exports = router;
