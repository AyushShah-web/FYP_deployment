import mongoose, {  Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
    isRead: {
      type: Boolean,
      default:false,
      required: false,
    },
    messageId:{
      type:String,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
