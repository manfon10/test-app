const Router = require("express");

const {
  createClient,
  getClientByid,
  getAllClients,
  deleteClientById,
  updateClientById,
} = require("../controllers/client.controller");

const {
  createClientDto,
  filterClientByParamsDto,
} = require("../dtos/client.dto");

const { checkToken, checkPermissions } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", checkPermissions("visualizar_clientes"), getAllClients);

router.get(
  "/:id",
  checkPermissions("visualizar_cliente"),
  validatorHandler(filterClientByParamsDto, "params"),
  getClientByid
);

router.delete(
  "/:id",
  checkPermissions("eliminar_cliente"),
  validatorHandler(filterClientByParamsDto, "params"),
  deleteClientById
);

router.patch(
  "/:id",
  checkPermissions("actualizar_cliente"),
  validatorHandler(filterClientByParamsDto, "params"),
  updateClientById
);

router.post(
  "/",
  checkPermissions("crear_cliente"),
  validatorHandler(createClientDto, "body"),
  createClient
);

module.exports = router;
