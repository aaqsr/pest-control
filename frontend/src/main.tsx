import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BugsContextProvider } from './context/bugContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BugsContextProvider>
      <App />
    </BugsContextProvider>
  </React.StrictMode>,
)
