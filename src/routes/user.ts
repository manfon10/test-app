import { Router } from "express";

import { createUser } from "../controllers/user.controller";
import { createUserDto } from "../dtos/user.dto";
import validatorHandler from "../middlewares/validator.handler";

const router = Router();

router.post("/create", validatorHandler(createUserDto, "body"), createUser);

export { router };
