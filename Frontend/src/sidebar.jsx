import "./SidebarStyle.css";
import { useContext, useEffect } from "react";
import {Mycontext} from "./MyContext";
import{v1 as uuidv1} from "uuid";



function Sidebar(){
   // const {allThrads, setAllThreads,currThread,setNewChat,setPrompt,setReply,setPrevChats}=useContext(Mycontext)
   const {
  allThrads,
  setAllThreads,
  currThreadId,        
  setCurrThreadId,    
  setNewChat,
  setPrompt,
  setReply,
  setPreviousChats     
} = useContext(Mycontext);

   const getAllthread=async()=>{
      try{
         const response =await fetch("http://localhost:8080/api/Thread");
         const res= await response.json();
         const filterdata= res.map(thread=>({threadId: thread.threadId,title:thread.title}));
         setAllThreads(filterdata)
      }catch(err){
         console.log(err);
      }

   };
    useEffect(()=>{
      getAllthread()
    },[]) //we remove currThreadId

    const createNewchat=()=>{
      setNewChat(true);
      setPrompt("");
      setReply(null);
      setCurrThreadId(uuidv1());
      // setPrevChats([]);
      setPreviousChats([]);


    }
     const changeThreadId=async(newthreadId)=>{
        setCurrThreadId(newthreadId);
        try{
         const response=await fetch(`http://localhost:8080/api/thread/${newthreadId}`);
         const res=await response.json();
         // setPrevChats(res);
         setPreviousChats(res);
         // setNewChat(false);
         setReply(null);
        }catch(err){
          console.log(err);
        }
     }
//       const changeThreadId = async (newthreadId) => {
//            console.log("Clicked thread:", newthreadId);   // 👈 add this
//   setCurrThreadId(newthreadId);

//   try {
//     const response = await fetch(
//       `http://localhost:8080/api/thread/${newthreadId}`
//     );
//   console.log("Status:", response.status);
//     if (!response.ok) {
//       setPreviousChats([]);
//       return;
//     }

//     const text = await response.text();
//       console.log("Raw response:", text);    

//     if (!text) {
//       setPreviousChats([]);
//       return;
//     }

//     const data = JSON.parse(text);

//     setPreviousChats(data);
//     setNewChat(false);
//     setReply(null);

//   } catch (err) {
//     console.log("Error loading thread:", err);
//   }
// };


















     const deleteThread=async(threadId)=>{
      try{
         // const response=await fetch(`http://localhost:8080/api/thread/${threadId}`,{method:"DELETE"})
          const response=await fetch(`http://localhost:8080/api/thread/${threadId}`,{
  method:"DELETE"
})
         const res=  await response.text();
         //updated thread re-render for avoiding refresh part
         // setAllThreads(prev=>prev.filter(thread=>{thread.threadId !== threadId}))
         setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId))
          if(threadId===currThreadId){
            createNewchat();
          }
      }catch(err){

      }
     }
    return (
      <section className="sidebar">
        <button onClick={createNewchat}>
           <img  className="logo"src="/blacklogo.png" />
           <span><i className="fa-solid fa-pen-to-square"></i></span>
        </button>
         <ul className="history">
           {
            allThrads?.map((thread,idx)=>(
              <li
  key={idx}
  onClick={() => changeThreadId(thread.threadId)}
  className={thread.threadId === currThreadId ? "highlighted" : ""}
>
  <span className="thread-title">{thread.title}</span>

  <i
    className="fa-regular fa-trash-can delete-icon"
    onClick={(e) => {
      e.stopPropagation();
      deleteThread(thread.threadId);
    }}
  ></i>
</li>
            ))
           }

         </ul>

         <div className="sign">
            <p> By Yash Kodgirwar &hearts;</p>
         </div>

      </section>
  )
}

export default Sidebar;