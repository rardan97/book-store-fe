import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Inject Midtrans Snap script
const midtransScript = document.createElement('script')
midtransScript.src = 'https://app.sandbox.midtrans.com/snap/snap.js'
midtransScript.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY || '')
document.head.appendChild(midtransScript)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <App />
  </StrictMode>,
)

