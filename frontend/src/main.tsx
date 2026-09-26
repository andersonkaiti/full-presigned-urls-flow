import { ThemeToggle } from '@components/theme-toggle.tsx'
import { Toaster } from '@components/ui/toast.tsx'
import { ThemeProvider } from '@contexts/theme-context.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>

      <App />

      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)
