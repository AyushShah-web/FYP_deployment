import { Router } from "express";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import {
  deleteUser,
  getAllLandlord,
  getAllTenant,
  getRentedRooms,
  getRoomsOfCertainLandlord,
  getUserCounts,
} from "../controllers/adminControllers.js";

const router = Router();

router.route("/deleteUser/:id").delete(verifyJwtToken, deleteUser);
router.route("/getAllLandlords").get(verifyJwtToken, getAllLandlord);
router.route("/getAllTenants").get(verifyJwtToken, getAllTenant);
router.route("/getUserCounts").get(verifyJwtToken, getUserCounts);
router.route("/getRentedRooms").get(verifyJwtToken, getRentedRooms);
router
  .route("/getRoomsOfCertainLandlord/:id")
  .get(verifyJwtToken, getRoomsOfCertainLandlord);

export default router;
