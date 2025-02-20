import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserData,
  logoutUser,
  checkUserInDb,
} from "../controllers/userControllers.js";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";

const router = Router();

// router.route("/register").post()
router.route("/signUpFormData").post(registerUser);
router.route("/LoginFormData").post(loginUser);
router.route("/userData").get(verifyJwtToken, getUserData);
router.route("/logout").get(verifyJwtToken, logoutUser);
router.route("/checkUserInDb/:userEmail").get(checkUserInDb);

export default router;
