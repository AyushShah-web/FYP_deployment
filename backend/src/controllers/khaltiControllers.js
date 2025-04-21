import { Payment } from "../models/paymentSchema.js";
import { RentedRoom } from "../models/rentedRoomSchema.js";
import { Room } from "../models/roomModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  initializeKhaltiPayment,
  verifyKhaltiPayment,
} from "../utils/khalti.js";

const initializeKhalti = asyncHandler(async (req, res) => {
  const {
    roomId,
    priceAfterDiscount: totalPrice,
    websiteUrl,
    roomPrice,
  } = req.body;

  console.log(req.body);

  if (!roomId && !totalPrice && !websiteUrl && !roomPrice) {
    throw new ApiError(400, "All the fields are required");
  }

  const roomData = await Room.findOne({
    _id: roomId,
    price: Number(roomPrice),
  });

  if (!roomData) {
    throw new ApiError(400, "All the room details didnt match.");
  }

  const rentedRoomData = await RentedRoom.create({
    room: roomId,
    paymentMethod: "khalti",
    totalPrice: totalPrice * 100,
    buyer: req.user._id,
    owner: roomData.owner,
  });

  const paymentInitate = await initializeKhaltiPayment({
    amount: totalPrice * 100,
    purchase_order_id: rentedRoomData._id,
    purchase_order_name: roomData.name,
    return_url: `${process.env.BACKEND_URL}/api/khalti/complete-khalti-payment`,
    website_url: websiteUrl,
  });

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

const verifyKhaltiPaymentControllers = asyncHandler(async (req, res) => {
  const {
    pidx,
    txnId,
    amount,
    mobile,
    purchase_order_id,
    purchase_order_name,
    transaction_id,
  } = req.query;

  const paymentInfo = await verifyKhaltiPayment(pidx);
 
  // Check if the payment is completed and details match

  if (
    paymentInfo?.status !== "Completed" ||
    paymentInfo.transaction_id != transaction_id ||
    Number(paymentInfo.total_amount) !== Number(amount)
  ) {
    return res.status(400).json(
      new ApiResponse(
        400,
        {
          success: false,
          message: "Incomplete Information",
          paymentInfo,
        },
        "Payment unsuccessful"
      )
    );
  }

  // check if payment done in valid item

  const purchasedData = await RentedRoom.findOne({
    _id: purchase_order_id,
    totalPrice: amount,
  });

  if (!purchasedData) {
    return res.stauts(400).json(
      new ApiResponse(400, {
        success: false,
        message: "Purchased data not found",
      }),
      "Payment not found"
    );
  }

  // updating purchase record
  await RentedRoom.findByIdAndUpdate(purchase_order_id, {
    $set: {
      status: "completed",
    },
  });

  console.log("Purchased data", purchasedData);

  console.log("purchasedData.room = ", purchasedData.room);

  // Create a new payment record
  const paymentData = await Payment.create({
    pidx,
    transactionId: transaction_id,
    amount,
    dataFromVerificationReq: paymentInfo,
    apiQueryFromUser: req.query,
    paymentGateway: "khalti",
    status: "success",
    roomId: purchasedData.room,
  });

  const updateRoom = await Room.findByIdAndUpdate(purchasedData.room, {
    status: true,
  });

  if (!updateRoom) {
    throw new ApiError(400, "Error occured while renting image");
  }

  if (!paymentData) {
    throw new ApiError(
      500,
      paymentData,
      "Error occured while making payment schema."
    );
  }

  return res
    .status(200)
    .redirect(
      `${process.env.FRONTEND_URL}/payment/${purchasedData.room}?pay=success`
    )
    .json(new ApiResponse(200, paymentData, "Payment suscessfull"));
});

export { initializeKhalti, verifyKhaltiPaymentControllers };
