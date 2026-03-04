

// import './App.css'
// import Sidebar  from './sidebar.jsx';
// import ChatWindow from './ChatWindow.jsx';
// import { Mycontext } from './MyContext.jsx';
// import { useState } from 'react';
// import {v1 as uuid} from "uuid";
// function App() {
//   const [prompt, setPrompt]= useState("");
//   const [reply,setReply]=useState(null);
//   const [currThread, setCurrThreadId]=useState(uuid());
//   const [prevChats,setPreviousChats]=useState([]); //store all previous chats of current thread
//   const [newChat, setNewChat]= useState(true);
//   const [allThrads,setAllThreads]=useState([]);
//   const providerValues={
//     prompt,setPrompt,
//     reply,setReply,
//     currThread,setCurrThreadId,
//     newChat,setNewChat,
//     prevChats,setPreviousChats,
//     allThrads,setAllThreads

//   };// passing values

//   return (
//     <div className='app'>
//       <Mycontext.Provider value= {providerValues}>
//       <Sidebar></Sidebar>
//       <ChatWindow></ChatWindow>
//       </Mycontext.Provider>
     
//     </div>
//   )
// }

// export default App

// import './App.css'
// import Sidebar from './sidebar.jsx'
// import ChatWindow from './ChatWindow.jsx'
// import MyContextProvider from './MyContext'

// function App() {
//   return (
//     <MyContextProvider>
//       <div className="app">
//         <Sidebar />
//         <ChatWindow />
//       </div>
//     </MyContextProvider>
//   )
// }
// import {
//   SignedIn,
//   SignedOut,
//   SignIn,
//   UserButton
// } from "@clerk/clerk-react";

// function App() {
//   return (
//     <>
//       <SignedOut>
//         <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
//           <SignIn />
//         </div>
//       </SignedOut>

//       <SignedIn>
//         <div>
//           <UserButton afterSignOutUrl="/" />
//           <ChatWindow />
//         </div>
//       </SignedIn>
//     </>
//   );
// }
import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton
} from "@clerk/clerk-react";

import MyContextProvider from "./MyContext";
import Sidebar from "./sidebar";
import ChatWindow from "./ChatWindow";

function App() {
  return (
    <>
      <SignedOut>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
          <SignIn />
        </div>
      </SignedOut>

      <SignedIn>
        <MyContextProvider>
          <div className="app">
            <Sidebar />
            <ChatWindow />
          </div>
        </MyContextProvider>
      </SignedIn>
    </>
  );
}


export default App
