// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// import { ClerkProvider } from "@clerk/clerk-react";


// <ClerkProvider publishableKey="YOUR_PUBLISHABLE_KEY">
//   <App />
// </ClerkProvider>
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react"
import { dark } from "@clerk/themes";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
     appearance={{
    baseTheme: dark
  }}>
      
      <App />
    </ClerkProvider>
  </StrictMode>
)