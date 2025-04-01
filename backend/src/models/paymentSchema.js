import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema(
  {
    transactionId: { type: String, unique: true },
    pidx: { type: String, unique: true },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dataFormVerification: {
      type: Object,
    },    
    apiQueryFromUsers: {
      type: Object,
    },
    paymentGateway: {
      type: String,
      enum: ["khalti"],
      required: true,
      default: "khalti",
    },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
