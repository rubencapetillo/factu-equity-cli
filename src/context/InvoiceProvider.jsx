import { createContext, useState } from "react"

const InvoiceContext = createContext();

// eslint-disable-next-line react/prop-types
const InnvoiceProvider = ({children}) => {
  
  const [userView, setUserView] = useState({});

  const handleClickUser = () => {
    setUserView({
      name: 'Usuarios',
      code: 1
    })
  }

  const handleClickAdd = () => {
    setUserView({
      name: 'Agregar Facturas',
      code: 2
    })
  }

  const handleClickView = () => {
    setUserView({
      name: 'Tus Facturas',
      code: 3
    })
  }

  return  (
    <InvoiceContext.Provider value={{
      userView,
      handleClickUser,
      handleClickAdd,
      handleClickView
    }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export{
  InvoiceContext,
  InnvoiceProvider
}