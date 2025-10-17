
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/styles.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { MovimientosProvider } from './contexts/MovimientosContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
  <StrictMode>
    <ThemeProvider>
      <MovimientosProvider>
        <App />
      </MovimientosProvider>
    </ThemeProvider>
  </StrictMode>
  </BrowserRouter>,
)