const Router = require("express");

const {
  createPermission,
  findPermissionById,
  deletePermissionByid,
  findAllPermissions,
  updatePermissionById,
} = require("../controllers/permission.controller");

const {
  createPermissionDto,
  filterPermissionByParamsDto,
} = require("../dtos/permission.dto");

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", findAllPermissions);

router.get(
  "/:id",
  validatorHandler(filterPermissionByParamsDto, "params"),
  findPermissionById
);

router.delete(
  "/:id",
  validatorHandler(filterPermissionByParamsDto, "params"),
  deletePermissionByid
);

router.patch(
  "/:id",
  validatorHandler(filterPermissionByParamsDto, "params"),
  updatePermissionById
);

router.post(
  "/",
  validatorHandler(createPermissionDto, "body"),
  createPermission
);

module.exports = router;
