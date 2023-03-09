const Router = require("express");

const {
  getAllProducts,
  getProductByid,
  deleteProductById,
  updateProductById,
  createProduct,
} = require("../controllers/product.controller");

const {
  filterProductByParamsDto,
  createProductDto,
} = require("../dtos/product.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_productos"), getAllProducts);

router.get(
  "/:id",
  checkPermissions("visualizar_producto"),
  validatorHandler(filterProductByParamsDto, "params"),
  getProductByid
);

router.delete(
  "/:id",
  checkPermissions("eliminar_producto"),
  validatorHandler(filterProductByParamsDto, "params"),
  deleteProductById
);

router.patch(
  "/:id",
  checkPermissions("actualizar_producto"),
  validatorHandler(filterProductByParamsDto, "params"),
  updateProductById
);

router.post(
  "/",
  checkPermissions("crear_producto"),
  validatorHandler(createProductDto, "body"),
  createProduct
);

module.exports = router;
