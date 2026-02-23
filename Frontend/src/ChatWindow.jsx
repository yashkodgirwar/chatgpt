import "./ChatWindow.css";
import Chat from "./Chat";
import { Mycontext } from "./MyContext";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinner"
function ChatWindow(){
    const {prompt,setPrompt,reply,setReply,currThreadId,prevchats,setPrevChats,setNewChat}=useContext(Mycontext);
    const[loading,setLoading]=useState[false];
    const [isOpen,setIsOpen]=useState(false);
    const getReply =async()=>{
        setLoading(true);
        setNewChat(false);
        const options={
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                message:prompt,
                threadId:currThreadId
            })
        };
        try{
            const response = await fetch("http://localhost:8080/api/chat",options);
            const res=await response.json();
            setReply(res,reply);

            console.log(res);

        }catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to previous chats
    useEffect(()=>{
     if(prompt && reply){
        setPrevChats(prevchats=>(
            [...prevchats,{
                role:"user",
                content:prompt
            },{
                role:"assitant",
                content:reply

            }]
        ))
     }
     setPrompt("");
},[reply]);

const handleprofileclick= ()=>{
    setIsOpen(! isOpen);
}
    return(
        <div className="chatwindow">
            <div className="navbar">
                <span> Sigmagpt <i class="fa-solid fa-angle-down"></i> </span>
                 <div className="userIconDiv" onClick={handleprofileclick}>
                   <span className="userIcon"><i class="fa-solid fa-user"></i></span>
                 </div>
            </div>
            {
                isOpen && 
                <div className="dropdown">
                    <div className="dropDownItem"><i class="fa-regular fa-gear"></i>Setting</div>

                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade plan</div>
                    
                    <div className="dropDownItem"><i class="fa-regular fa-arrow-right-from-bracket"></i>Log out</div>



                    
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
                      <i class="fa-solid fa-paper-plane"></i>
                    </div>
                   
                </div>
                    <p class="info">
ChatGPT can make mistakes. Check important info. See Cookie Preferences.                   
 </p>
                

            </div>
           
        </div>
    )
}

export default ChatWindow;