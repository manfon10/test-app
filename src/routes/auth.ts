import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";
import { loginUserDto } from "../dtos/auth.dto";
import validatorHandler from "../middlewares/validator.handler";

const router = Router();

router.post("/login", validatorHandler(loginUserDto, "body"), loginUser);

export { router };
