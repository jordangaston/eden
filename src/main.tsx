import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'

posthog.init('phc_32uhjiEktmgocSrnTrk2ZfIr08cJdZYhOGQNewItPdd', {
  api_host: 'https://p.tryeden.io',
  ui_host: 'https://us.i.posthog.com',
  autocapture: true,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
