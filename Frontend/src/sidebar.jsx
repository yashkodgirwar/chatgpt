import "./SidebarStyle.css";
import { useContext, useEffect } from "react";
import {Mycontext} from "./MyContext";
import{v1 as uuidv1} from "uuid";



function Sidebar(){
   const {allThrads, setAllThreads,currThread,setNewChat,setPrompt,setReply,setPrevChats}=useContext(Mycontext)

   const getAllthread=async()=>{
      try{
         const response =await fetch("https://localhost:8080/api/Thread");
         const res= await response.json();
         const filterdata= res.map(thread=>({threadId: thread.threadId,title:thread.title}));
         setAllThreads(filterdata)
      }catch(err){
         console.log(err);
      }

   };
    useEffect(()=>{
      getAllthread()
    },[currThread])

    const createNewchat=()=>{
      setNewChat(true);
      setPrompt("");
      setReply(null);
      setCurrThreadId(uuidv1());
      setPrevChats([]);


    }
     const changeThreadId=async(newthreadId)=>{
        setCurrThreadId(newthreadId);
        try{
         const response=await fetch(`https://localhost:800/api/thread/${newthreadId}`);
         const res=await response.json();
         setPrevChats(res);
         setNewChat(false);
         setReply(null);
        }catch(err){
          console.log(err);
        }
     }
     const deleteThread=async(ThreadId)=>{
      try{
         const response=await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"})
         const res=await response.json();

         //updated thread re-render for avoiding refresh part
         setAllThreads(prev=>prev.filter(thread=>{thread.threadId !== threadId}))
          if(threadId===currThreadId){
            createNewchat();
          }
      }catch(err){

      }
     }
    return (
      <section className="section">
        <button onClick={createNewchat}>
           <img  className="logo"src="/blacklogo.png" />
           <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>
         <ul className="history">
           {
            allThrads?.map((thread,idx)=>(
               <li key={idx} onClick={()=>changeThreadId(thread.threadId)}
               className={thread.threadId===currThreadId?"highlighted":"" }>{thread.title}
               
               <i className="fa-regular fa-trash-can"
               onClick={(e)=>{
                  e.stopPropagation(); //stop event bubbling -- so parent not affected
                  deletethread(thread.threadId)
               }}></i></li>
            ))
           }

         </ul>

         <div className="sign">
            <p> By Yash Kofgirwar &hearts;</p>
         </div>

      </section>
  )
}

export default Sidebar;