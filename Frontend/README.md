🤖 ChatGPT Clone – AI Powered Chat Application

A modern AI-powered chat application built using React + Vite that integrates with the OpenAI API to generate intelligent responses in real time.

This project replicates core ChatGPT functionality including a dynamic chat interface, sidebar layout, global state management, and API-based AI responses.
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 Features Implemented

💬 Interactive AI Chat Interface

🧠 OpenAI API Integration

📂 Sidebar UI Layout

🔄 Global State Management using React Context API

⚡ Fast Development with Vite + HMR

🎨 Clean and Responsive UI

🧩 Modular Component-Based Architecture

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🛠️ Tech Stack
Frontend

React

Vite

Context API

CSS

API Integration

OpenAI API

Custom API utility (openai.js)

Chat handler logic (chat.js)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
📁 Project Structure

chatgpt/
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── MyContext.jsx
│   │
│   ├── Chat.jsx
│   ├── ChatWindow.jsx
│   ├── Sidebar.jsx
│   │
│   ├── App.css
│   ├── Chat.css
│   ├── ChatWindow.css
│   ├── SidebarStyle.css
│   │
│   ├── openai.js
│   ├── chat.js
│
├── package.json
├── vite.config.js
└── README.md
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/yashkodgirwar/chatgpt.git
cd chatgpt

2️⃣ Install Dependencies
npm install

3️⃣ Setup Environment Variables

Create a .env file in the root directory:

VITE_OPENAI_API_KEY=your_openai_api_key_here

⚠️ Important: Never push your API key to GitHub.


4️⃣ Run the Project
npm run dev

App runs on:

http://localhost:5173
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🧠 How It Works

1.User types a prompt in the chat input

2.Message is passed via Context API

3.chat.js processes the request

4.openai.js sends request to OpenAI API

5.Response is received

6.UI updates dynamically with AI response
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🔐 Security Note

Currently, API calls are handled from frontend using environment variables.

⚠️ For production:

Use backend proxy

Hide API key on server side

Add rate limiting
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🎯 What This Project Demonstrates

Real-world API integration

React Context API usage

Component-based architecture

Environment variable management

Modern frontend tooling with Vite


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

👨‍💻 Author

Yash Kodgirwar
B.Tech IT | Full Stack Developer | Cloud Enthusiast