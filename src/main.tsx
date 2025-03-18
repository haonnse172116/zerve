import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CarSearchProvider } from './components/context/CarSearchContext.tsx'
import { AuthProvider } from './components/context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <CarSearchProvider>
     <App />
     </CarSearchProvider>
    </AuthProvider>
  </StrictMode>,
)
