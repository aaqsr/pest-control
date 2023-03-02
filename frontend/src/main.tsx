import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { BugsContextProvider } from './context/bugContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BugsContextProvider>
        <App />
      </BugsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
