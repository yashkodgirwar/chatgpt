// import express from "express";
// import "dotenv/config";
// import cors from "cors";
// import mongoose from "mongoose";
// import chatRoutes from "./routes/chat.js";
// import dotenv from "dotenv";
// // import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
// import { clerkMiddleware, requireAuth } from "@clerk/express";
// import syncUser from "./middleware/syncUser.js";
// dotenv.config();

// const app=express();
// const port=8080;

// app.use(express.json());
// app.use(cors());

// // app.use("/api",chatRoutes);
// // app.use(
// //   "/api",
// // //   ClerkExpressRequireAuth(),
// // //  // 1️⃣ verify login

// //   syncUser,                  // 2️⃣ create user if not exists
// //   chatRoutes                 // 3️⃣ actual routes
// // );
// app.use(clerkMiddleware());

// app.use(
//   "/api",
//   requireAuth(),
//   syncUser,
//   chatRoutes
// );
// app.listen(port,()=>{
//     console.log(`Server is runing on${port}`);
//     connectDB()
// });
// const connectDB =async()=>{
//     try{
//    await mongoose.connect(process.env.MONGODB_URL);
//         console.log("Database Connection Established")
//     }catch(err){
//         console.log(err);
//         console.log(" Data_Base Connection Failed")
//     }
// }
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";
import syncUser from "./middleware/syncUser.js";

import { clerkMiddleware, requireAuth } from "@clerk/express";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// Clerk middleware
app.use(clerkMiddleware());

app.use(
  "/api",
  requireAuth(),   // protect routes
  syncUser,        // create user if not exists
  chatRoutes
);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connection Established");
  } catch (err) {
    console.log("Database Connection Failed");
  }
};