import mongoose from "mongoose";

const messageCollection = "messages";

const messageSchema = new mongoose.Schema({
    author:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    text:{
        type:String,
        require:true
    }
});

export const MessageModel = mongoose.model(messageCollection,messageSchema);