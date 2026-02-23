

import './App.css'
import Sidebar  from './sidebar.jsx';
import ChatWindow from './ChatWindow.jsx';
import { Mycontext } from './MyContext.jsx';
import { useState } from 'react';
import {v1 as uuid} from "uuid";
function App() {
  const [prompt, setPrompt]= useState("");
  const [reply,setReply]=useState(null);
  const [currThread, setCurrThreadId]=useState(uuid);
  const [prevChats,setPreviousChats]=useState([]); //store all previous chats of current thread
  const [newChat, setNewChat]= useState(true);
  const [allThrads,setAllThreads]=useState([]);
  const providerValues={
    prompt,setPrompt,
    reply,setPrompt,
    currThread,setCurrThreadId,
    newChat,setNewChat,
    prevChats,setPreviousChats,
    allThrads,setAllThreads

  };// passing values

  return (
    <div className='app'>
      <Mycontext.Provider value= {providerValues}>
      <Sidebar></Sidebar>
      <ChatWindow></ChatWindow>
      </Mycontext.Provider>
     
    </div>
  )
}

export default App
