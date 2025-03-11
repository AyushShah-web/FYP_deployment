import { Payment } from "../models/paymentModel";
import { RentedRoom } from "../models/rentedRoomSchema";
import { Room } from "../models/roomModel";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { initializeKhaltiPayment, verifyKhaltiPayment } from "../utils/khalti";

const initializeKhalti = asyncHandler(async (req, res) => {
  const { roomId, totalPrice, websiteUrl } = req.body;

  const roomData = await Room.findOne({
    _id: roomId,
    price: Number(totalPrice),
  });

  if (!roomData) {
    throw new ApiError(400, "All the room details didnt match.");
  }

  const rentedRoomData = await RentedRoom.create({
    room: roomId,
    paymentMethod: "khalti",
    totalPrice: totalPrice * 100,
  });

  const paymentInitate = await initializeKhaltiPayment({
    amount: totalPrice * 100,
    purchase_order_id: rentedRoomData._id,
    purchase_order_name: roomData.name,
    return_url: `${process.env.BACKEND_URL}/complete-khalti-payment`,
    website_url: websiteUrl,
  });

  if (!paymentInitate) {
    throw new ApiError(
      400,
      "Something went wrong while initializing khalti payment"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { rentedRoomData, payment: paymentInitate },
        "Payment initialized suscessfully"
      )
    );
});

const verifyKhaltiPaymentControllers = asyncHandler(async(req,res)=>{
    const {
        pidx,
        txnId,
        amount,
        mobile,
        purchase_order_id,
        purchase_order_name,
        transaction_id,
    } = req.query;


// Check if the payment is completed and details match

if(payment)


})