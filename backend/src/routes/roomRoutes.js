import { Router } from "express";
import {
  registerRoom,
  getAllRooms,
  getUserRooms,
  getRoomsFromId,
  updateRoom,
  deleteRoom,
  getRoomsBasedOnTypes,
  getRoomsBasedOnLocation,
  getRoomLocations,
  getRoomBasedOnCoordinates,
  getRentedRoomsOfUser,
} from "../controllers/roomControllers.js";
import { verifyJwtToken } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddlewares.js";

const router = Router();

router.route("/getAllRooms").get(getAllRooms);
router
  .route("/registerRoom")
  .post(verifyJwtToken, upload.single("image"), registerRoom);
router.route("/getUserRooms").get(verifyJwtToken, getUserRooms);
router.route("/getRoomFromId/:roomId").get(getRoomsFromId);
router
  .route("/updateRoom/:roomId")
  .patch(verifyJwtToken, upload.single("image"), updateRoom);
router.route("/deleteRoom/:roomId").delete(verifyJwtToken, deleteRoom);
router.route("/getUniqueLocations").get(getRoomLocations);
router.route("/getRoomsBasedOnTypes/:type").get(getRoomsBasedOnTypes);
router.route("/getRoomsBasedOnLocation/:location").get(getRoomsBasedOnLocation);
router.route("/getRoomBasedOnCoordinates").get(getRoomBasedOnCoordinates);
router.route("/getRentedRoomsOfUsers").get(verifyJwtToken,getRentedRoomsOfUser)

export default router;
