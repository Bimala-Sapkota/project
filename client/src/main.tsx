import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
// import './index.css'
import App from './App.tsx'
import { Providers } from './providers/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
      <Toaster />
    </Providers>
  </StrictMode>,
)
