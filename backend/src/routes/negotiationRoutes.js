import { Router } from "express";

import {
  acceptNegotiation,
  counterNegotiation,
  deleteNegotiation,
  getRequestedNegotiations,
  getUsersNegotiations,
  registerNegotiation,
} from "../controllers/negotiationControllers.js";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").post(verifyJwtToken, registerNegotiation);
router
  .route("/:negotiationId")
  .put(verifyJwtToken, acceptNegotiation)
  .post(verifyJwtToken, registerNegotiation)
  .delete(verifyJwtToken, deleteNegotiation);

router.route("/getUsersNegotiation").get(verifyJwtToken, getUsersNegotiations);
router.route("/counterNegotiation/:negotiationId").put(verifyJwtToken, counterNegotiation);
router.route("/getRequestedNegotiations").get(verifyJwtToken, getRequestedNegotiations);

export default router;
