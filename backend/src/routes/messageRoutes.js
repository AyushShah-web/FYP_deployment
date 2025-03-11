import { Router } from "express";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import {
  getChatMessages,
  getUniquePersons,
  registerMessage,
} from "../controllers/messageControllers.js";

const router = Router();

router.route("/").post(verifyJwtToken, registerMessage);
router.route("/").get(verifyJwtToken, getChatMessages);
router.route("/getUniquePersons").get(verifyJwtToken, getUniquePersons);

export default router;
