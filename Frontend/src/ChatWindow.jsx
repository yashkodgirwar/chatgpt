import { v1 as uuidv1 } from "uuid";
import "./ChatWindow.css";
import Chat from "./Chat";
import { Mycontext } from "./MyContext";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners"
function ChatWindow(){
    // const {prompt,setPrompt,reply,setReply,currThreadId,prevchats,setPrevChats,setNewChat}=useContext(Mycontext);
    const {
  prompt,
  setPrompt,
  reply,
  setReply,
  currThreadId,
  setCurrThreadId,   // 👈 ADD THIS
  prevChats,
  setPreviousChats,
  setNewChat
} = useContext(Mycontext);
    const[loading,setLoading]=useState(false);
    const [isOpen,setIsOpen]=useState(false);
//     const getReply =async()=>{

//         if (!currThreadId) {
//   const newId = uuidv1();
//   setCurrThreadId(newId);
// }
//         setLoading(true);
//         setNewChat(false);
//         const options={
//             method:"POST",
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body:JSON.stringify({
//                 message:prompt,
//                 threadId:currThreadId
//             })
//         };
//         try{
//             const response = await fetch("http://localhost:8080/api/chat",options);
//             const res=await response.json();
//             setReply(res.reply);

//             // console.log(res);

//         }catch(err){
//             console.log(err);
//         }
//         setLoading(false);

//         console.log("threadId:", currThreadId);
//         console.log("message:", prompt);
//     }
const getReply = async () => {
  let activeThreadId = currThreadId;

  if (!activeThreadId) {
    activeThreadId = uuidv1();
    setCurrThreadId(activeThreadId);
  }

  setLoading(true);
  setNewChat(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,
      threadId: activeThreadId,  // ✅ use correct value
    }),
  };

  try {
    const response = await fetch(
      "http://localhost:8080/api/chat",
      options
    );
    const res = await response.json();
    setReply(res.reply);
  } catch (err) {
    console.log(err);
  }

  setLoading(false);

  console.log("threadId:", activeThreadId);
  console.log("message:", prompt);
};
useEffect(() => {
  if (!currThreadId) {
    setCurrThreadId(uuidv1());
  }
}, []);
    //Append new chat to previous chats
    useEffect(()=>{
     if(prompt && reply){
        setPreviousChats(prevChats => ([
  ...prevChats,
  {
    role:"user",
    content:prompt
  },
  {
    role:"assistant",
    content:reply
  }
]));
        // setPreviousChats(prevChats=>(
        //     [...prevChats,{
        //         role:"user",
        //         content:prompt
        //     },{
        //         role:"assitant",
        //         content:reply

        //     }]
        // ))
     }
     setPrompt("");
},[reply]);

const handleprofileclick= ()=>{
    setIsOpen(! isOpen);
}
    return(
        <div className="chatwindow">
            <div className="navbar">
                <span> Sigmagpt <i className="fa-solid fa-angle-down"></i> </span>
                 <div className="userIconDiv" onClick={handleprofileclick}>
                   <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                 </div>
            </div>
            {
                isOpen && 
                <div className="dropdown">
                    <div className="dropDownItem"><i className="fa-regular fa-gear"></i>Setting</div>

                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                    
                    <div className="dropDownItem"><i className="fa-regular fa-arrow-right-from-bracket"></i>Log out</div>



                    
                </div>
            }
            <Chat></Chat>
            <ScaleLoader color="#fff" loading={loading}>

            </ScaleLoader> 
            <div className="chatinput">
                <div className="inputBox">
                    <input placeholder="Ask anything"
                      value={prompt}
                      onChange={(e)=> setPrompt(e.target.value)}
                      onKeyDown={(e)=> e.key==="Enter"? getReply():""}
                    />
                    <div id="submit" onClick={getReply}>
                      <i className="fa-solid fa-paper-plane"></i>
                    </div>
                   
                </div>
                    <p className="info">
ChatGPT can make mistakes. Check important info. See Cookie Preferences.                   
 </p>
                

            </div>
           
        </div>
    )
}

export default ChatWindow;