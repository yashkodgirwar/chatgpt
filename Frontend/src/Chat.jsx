import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

//react-markdown for displaying markdown
// react-highlight syantax highlighting the code
function Chat(){
    const {newChat,prevChats}= useContext{MyContext};
    return (
        <>
        {newChat && <h1> Start new Chat</h1>}
        <div className="chats">
            {
                prevChats ?.map((chat,idx) =>
                    <div className={chat.role=== "user"? "userDiv": "gptDiv"} key={idx}>
                        {
                            chat.role==="user"?
                            <p className="userMessage">{chat.content}</p>:
                           <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                        }

                        </div>
                )
            }
            <div className="userDiv">
                <p className="userMessage">User Message </p>
            </div>

            <div className="gptDiv">
                <p className="gptMessage"> Gpt Generated Message</p>
            </div>
        </div>
        </>
    )

}

export default Chat;