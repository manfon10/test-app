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

const { checkToken } = require("../middlewares/auth.handler");
const { checkCookie } = require("../middlewares/cookie.handler");
const validatorHandler = require("../middlewares/validation.handler");

const router = Router();

router.use(checkCookie);
router.use(checkToken);

router.get("/", getAllClients);

router.get(
  "/:id",
  validatorHandler(filterClientByParamsDto, "params"),
  getClientByid
);

router.delete(
  "/:id",
  validatorHandler(filterClientByParamsDto, "params"),
  deleteClientById
);

router.patch(
  "/:id",
  validatorHandler(filterClientByParamsDto, "params"),
  updateClientById
);

router.post("/", validatorHandler(createClientDto, "body"), createClient);

module.exports = router;
