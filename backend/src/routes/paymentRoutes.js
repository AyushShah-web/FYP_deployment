import { Router } from "express";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import {
  getRoomPrice,
  registerPayment,
} from "../controllers/paymentControllers.js";

const router = Router();

router.route("/registerPayment").post(verifyJwtToken, registerPayment);
router.route("/getRoomPrice/:roomId").get(verifyJwtToken, getRoomPrice);

export default router;
