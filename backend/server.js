import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes.chat.js";

const app=express();
const port=8080;

app.use(express.json());
app.use(cors());

app.use("/api",chatRoutes);

app.listen(port,()=>{
    console.log(`Server is runing on${port}`);
    coonectDB()
});
const connectDB =async()=>{
    try{
   await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connection Established")
    }catch(err){
        console.log(err);
        console.log(" Data_Base Connection Failed")
    }
}
