import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type:String
        }

    },
    { timestamps:true }
);

export const Message = mongoose.model("Message", messageSchema);