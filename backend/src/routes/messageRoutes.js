import { Router } from "express";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import {
  getChatMessages,
  getUniquePersons,
  registerMessage,
  uploadChatImage,
} from "../controllers/messageControllers.js";
import { upload } from "../middlewares/multerMiddlewares.js";

const router = Router();

router.route("/").post(verifyJwtToken, registerMessage);
router.route("/").get(verifyJwtToken, getChatMessages);
router.route("/getUniquePersons").get(verifyJwtToken, getUniquePersons);
router
  .route("/uploadImage")
  .post(verifyJwtToken, upload.single("image"), uploadChatImage);

export default router;
