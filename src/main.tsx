import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppErrorBoundary } from '@/components/layout/AppErrorBoundary'
import { AppMotionProvider } from '@/components/providers/MotionProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppMotionProvider>
      <AppErrorBoundary>
        <App />
      </AppErrorBoundary>
    </AppMotionProvider>
  </StrictMode>,
)
