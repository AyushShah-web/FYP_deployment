import { Message } from "../models/messageModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerMessage = asyncHandler (async(req,res)=>{
    // Register the message of the users
    const {message,receiver} = req.body;
    const {_id} = req.user;

    if(!message && !receiver && !_id){
        throw new ApiError(400,"All fields are required")
    }

    const messagedb = await Message.create({
        sender:_id,
        receiver,
        message,
    })

    if(!messagedb){
        throw new ApiError(400,"Something went wrong while registering message");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,messagedb,"Suscessfully registered message"));

})

const getChatMessages = asyncHandler(async(req,res)=>{
    // Get the message between user
    const {sender,receiver} = req.body;

    if(!sender && !receiver){
        throw new ApiError(400,"Both the fields are required");
    }

const messages = await Message.find({sender,receiver});

if(!messages){
    throw new ApiError(400,"No any messages found");
}


return res
.status(200)
.json(new ApiResponse(200,messages,"Suscessfully fetched message"))

})

export {
    registerMessage,
    getChatMessages
}