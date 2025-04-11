import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUserData,
  logoutUser,
  checkUserInDb,
  uploadProfileImage,
} from "../controllers/userControllers.js";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddlewares.js";

const router = Router();

// router.route("/register").post()
router.route("/signUpFormData").post(registerUser);
router.route("/LoginFormData").post(loginUser);
router.route("/userData").get(verifyJwtToken, getUserData);
router.route("/logout").get(verifyJwtToken, logoutUser);
router.route("/checkUserInDb/:userEmail").get(checkUserInDb);
router
  .route("/uploadProfileImage/:id")
  .post(verifyJwtToken, upload.single("image"), uploadProfileImage);

export default router;
