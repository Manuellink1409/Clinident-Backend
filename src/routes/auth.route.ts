import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller";
import { zParse } from "../";
import { authSchema } from "../schema/auth.schema";
import { loginSchema } from "../schema/login.schema";

const router = Router();
router.route("/register").post(async (req, res, next) => {
  try {
    const { body } = await zParse(authSchema, req);
    const user = await createUser(body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});
router.route("/login").post(async (req, res, next) => {
  try {
    const { body } = await zParse(loginSchema, req);
    const token = await loginUser(body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
});
export default router;
