import { Router } from "express";
import {
  getAllExperience,
  getRoomExperiences,
  registerExperience,
} from "../controllers/experienceControllers.js";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/getAllExperiences").get(getAllExperience);
router.route("/registerExperience").post(verifyJwtToken, registerExperience);
router.route("/getRoomExperiences/:roomId").get(getRoomExperiences);

export default router;
