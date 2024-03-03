import { Router } from "express";
import serviceRouter from "./service.routes";
import authRouter from "./auth.route";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = Router();

router.use("/services", authenticateJWT, serviceRouter);
router.use("/auth", authRouter);

export default router;
