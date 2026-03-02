import express from "express";
// import thread from "../models/Thread.js"
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
const router=express.Router();

router.post("/test", async(req, res)=>{
    try{
        const thread=new Thread({
            threadId:"xyz",
            title:"Testing New thread"
        });
        const response=await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to save in DB"});
    }

})

// Get all thread
router.get("/thread", async(req,res)=>{
    try{
        // const threads=(await Thread.find({})).toSorted({updatedAt:-1});
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
         // descending order of updatedAt -- most recent date on top
         res.json(threads);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to Fetch threads"});
    }
})
   

router.get("/thread/:threadId", async(req,res)=>{
    const {threadId}=req.params;

  try{
   let thread= await Thread.findOne({threadId});
    if(!thread){
        return res.json([]);

    }
    return res.json(thread.messages || []);
  }catch(err){
    console.log(err);
    res.status(500).json({error:"Failed to Fetch threads"});

  }
})
// router.get("/thread/:threadId", async (req, res) => {
//   const { threadId } = req.params;

//   try {
//     let thread = await Thread.findOne({ threadId });

//     if (!thread) {
//       return res.json([]);   // always return array
//     }

//     return res.json(thread.messages || []);  // ✅ FIXED

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to Fetch threads" });
//   }
// });

// router.delete("/thread/:threadId" ,async(req,res )=>{
//     const {threadId}=req.params;
//     try{
//          const deletedThread = await Thread.findOneAndDelete({ threadId });
//         if(!deletedThread){
//              res.status(404).json({error:"thread not found"});

//         }
//          res.status(200).json({success:"Thread is deleted successfully"});

//     }catch(err){
//         console.log(err);
//     res.status(500).json({error:"Failed to Fetch threads"});

//     }
// })
router.delete("/thread/:threadId", async (req, res) => {
  try {
    const id = req.params.threadId;

    console.log("Deleting:", id);

    const deleted = await Thread.deleteOne({ threadId: id });

    console.log("Mongo result:", deleted);

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ error: "Thread not found" });
    }

    return res.status(200).json({ success: "Deleted successfully" });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
});
// router.post("/chat",async(req,res)=>{
//     const {threadId,message}=req.body;
//     if(!threadId || !message){
//         res.status(400).json({error:"missing required fields"});
//     }

//     try{
//         let thread=await Thread.findOne({threadId});
//         if(! thread){
//             thread= new Thread({
//               threadId,
//               title:message,
//               messages:[{role: "user", content : message}]
//             });
//         }else{
//             thread.messages.push[{role:"user", content :message}]
//         }
//          const assistantReply= await getOpenAIAPIResponse(message);
//          thread.updatedAt=new Date();
//        await thread.save();
//        res.json({reply:assistantReply});
       
//     }catch(err){
//        console.log(err);
//        res.status(500).json({error:" Internal server Error"});
//     }
// })
// router.post("/chat", async (req, res) => {
//   const { threadId, message } = req.body;

//   if (!threadId || !message) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     let thread = await Thread.findOne({ threadId });

//     if (!thread) {
//       thread = new Thread({
//         threadId,
//         title: message,
//         messages: [{ role: "user", content: message }],
//       });
//     } else {
//       thread.messages.push({ role: "user", content: message });
//     }

//     const assistantReply = await getOpenAIAPIResponse(message);

//     thread.messages.push({
//       role: "assistant",
//       content: assistantReply,
//     });

//     thread.updatedAt = new Date();
//     await thread.save();

//     res.json({ reply: assistantReply });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// router.post("/chat", async (req, res) => {
//   const { threadId, message } = req.body;

//   if (!threadId || !message) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }
//     if (!thread) {
//       thread = new Thread({
//         threadId,
//         title: message,
//         messages: [],
//       });
//     }
//   try {
//     let thread = await Thread.findOne({ threadId });

//     // 🔴 Important change
//     if (!thread) {
//       return res.status(404).json({ error: "Thread does not exist" });
//     }

//     thread.messages.push({ role: "user", content: message });

//     const assistantReply = await getOpenAIAPIResponse(message);

//     thread.messages.push({
//       role: "assistant",
//       content: assistantReply,
//     });

//     thread.updatedAt = new Date();
//     await thread.save();

//     res.json({ reply: assistantReply });

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    // 🔥 UUID system: if not found, CREATE
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message,
        messages: [],
      });
    }

    thread.messages.push({ role: "user", content: message });

    const assistantReply = await getOpenAIAPIResponse(message);

    thread.messages.push({
      role: "assistant",
      content: assistantReply,
    });

    thread.updatedAt = new Date();
    await thread.save();

    res.json({ reply: assistantReply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


   export default router;    