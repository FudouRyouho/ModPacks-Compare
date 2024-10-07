import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ModpackComparator from './components/ModpackComparator.tsx'
import Upload from './components/upload.tsx'

import './styles/output.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Upload/>
  </StrictMode>,
)
