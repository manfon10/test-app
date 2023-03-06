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

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", getAllProducts);

router.get(
  "/:id",
  validatorHandler(filterProductByParamsDto, "params"),
  getProductByid
);

router.delete(
  "/:id",
  validatorHandler(filterProductByParamsDto, "params"),
  deleteProductById
);

router.patch(
  "/:id",
  validatorHandler(filterProductByParamsDto, "params"),
  updateProductById
);

router.post("/", validatorHandler(createProductDto, "body"), createProduct);

module.exports = router;
