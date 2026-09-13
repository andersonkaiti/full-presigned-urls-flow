import { Toaster } from '@components/ui/toast.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />

    <Toaster />
  </StrictMode>,
)
