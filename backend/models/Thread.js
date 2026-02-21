import mongoose from "mongoose";
const Messageschema=new mongoose.Schema({
    role:{
        type:String,
        enum:["user", "assistant"],
        required:true    
        
    },
    content:{
       type:String,
       required: true
    },
    timestamp:{
        type:Date,
        deafault: Date.now
    }
});

const ThreadSchema =new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },

    title:{
        type:String,
        deafault:"New chat"
    },
    messages: [Messageschema],
    createdAt:{
        type:Date,
        deafault: Date.now
    },
    updatedAt:{
        type:Date,
        deafault:Date.now
    }

});

export default mongoose.model("Thread",ThreadSchema);
