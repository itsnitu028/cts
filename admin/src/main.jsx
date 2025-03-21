import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { StoreContextProvider } from './Context/StoreContext.jsx'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.bundle.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <StoreContextProvider >
    <App />
    </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
