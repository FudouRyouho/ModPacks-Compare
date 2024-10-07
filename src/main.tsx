import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Upload from './components/upload.tsx'

import './styles/output.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Upload/>
  </StrictMode>,
)
