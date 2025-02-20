import { Router } from "express";
import { generateOtp, verifyOtp } from "../controllers/otpControllers.js";

const router = Router();

router.route("/generateOtp").post(generateOtp);
router.route("/verifyOtp").put(verifyOtp);

export default router;