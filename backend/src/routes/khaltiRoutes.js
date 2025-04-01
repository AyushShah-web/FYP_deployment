import { Router } from "express";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import {
  initializeKhalti,
  verifyKhaltiPaymentControllers,
} from "../controllers/khaltiControllers.js";

const router = Router();

router.route("/initialize-khalti").post(verifyJwtToken, initializeKhalti);
router
  .route("/complete-khalti-payment")
  .get(verifyJwtToken, verifyKhaltiPaymentControllers);

export default router;
