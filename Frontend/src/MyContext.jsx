// import {createContext} from "react";
// export const Mycontext= createContext("");
// import { createContext, useState, useEffect } from "react";
// useEffect(() => {
//   const savedId = localStorage.getItem("currentThreadId");
//   if (savedId) {
//     setCurrThreadId(savedId);
//   }
// }, []);
import { createContext, useState, useEffect } from "react";

export const Mycontext = createContext();

const MyContextProvider = ({ children }) => {
  const [allThrads, setAllThreads] = useState([]);
  const [currThreadId, setCurrThreadId] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [prevChats, setPreviousChats] = useState([]);
  const [newChat, setNewChat] = useState(true);

  // Restore threadId on refresh
  useEffect(() => {
    const savedId = localStorage.getItem("currentThreadId");
    if (savedId) {
      setCurrThreadId(savedId);
    }
  }, []);

  return (
    <Mycontext.Provider
      value={{
        allThrads,
        setAllThreads,
        currThreadId,
        setCurrThreadId,
        prompt,
        setPrompt,
        reply,
        setReply,
        prevChats,
        setPreviousChats,
        newChat,
        setNewChat,
      }}
    >
      {children}
    </Mycontext.Provider>
  );
};

export default MyContextProvider;