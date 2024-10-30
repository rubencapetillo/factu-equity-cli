import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router'
import './index.css'
import { InnvoiceProvider } from '@/context/InvoiceProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InnvoiceProvider>
      <RouterProvider router={router}/>
    </InnvoiceProvider>
  </StrictMode>,
)
