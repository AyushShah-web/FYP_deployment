import { Router } from "express";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import { registerMessage } from "../controllers/messageControllers.js";

const router = Router();

router.route("/").post(verifyJwtToken,registerMessage);

export default router;