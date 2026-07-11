import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import GAScript from './components/GAScript'
import { LenisProvider } from './hooks/useLenis'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LenisProvider>
        <GAScript />
        <App />
      </LenisProvider>
    </BrowserRouter>
  </StrictMode>
)
