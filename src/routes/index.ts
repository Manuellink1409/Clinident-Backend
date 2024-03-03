import { Router } from "express";
import serviceRouter from "./service.routes";
import authRouter from "./auth.route";
import pacientRouter from "./pacient.route";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = Router();

router.use("/services", authenticateJWT, serviceRouter);
router.use("/auth", authRouter);
router.use("/pacient", pacientRouter);

export default router;
