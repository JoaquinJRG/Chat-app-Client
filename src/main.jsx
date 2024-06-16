import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ProfileProvider } from './context/Profile.jsx'
import { LanguageProvider } from './context/Languaje.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProfileProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ProfileProvider>
  </React.StrictMode>,
)
