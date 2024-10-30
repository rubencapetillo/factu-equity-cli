import { useAuth } from "../../hooks/useAuth";
import { useInvoice } from "../../hooks/useInvoices"

export const Sidebar = () => {

  const { handleClickView, handleClickAdd } = useInvoice();
  const { logout, hasRole, user } = useAuth({middleware: 'auth'});


  const handleClickAddInvoices = () => {
    handleClickAdd()
  } 

  const handleClickViewInvoices = () => {
    handleClickView()
  } 

  const handleLogout = () => {
    logout()
  }
  
  
  return (
    <aside className="md:w-72">
      <div>
        <img src="img/logo_invoice.jpg" alt=""/>
      </div>
      <p className="font-lato my-10 text-xl text-center">HOLA: {user?.name}</p>
      <div className="mt-10 flex items-center gap-4 border w-full p-3 flex-col">
        <button onClick={handleClickViewInvoices} className="hover:bg-cyan-600 hover:text-white cursor-pointer font-bold truncate font-lato w-full" >Ver Facturas</button>
        {/* 

        TODO: REVISAR AUTENTICACIÓN

        {hasRole('Admin') && (
          <button
            onClick={handleClickAddInvoices}
            className="hover:bg-cyan-600 hover:text-white cursor-pointer font-bold truncate font-lato w-full"
          >
            Agregar Facturas
          </button>
        )} */}
        <button onClick={handleClickAddInvoices} className="hover:bg-cyan-600 hover:text-white cursor-pointer font-bold truncate font-lato w-full" >Agregar Facturas</button>
      </div>
      <div className="my-5 px-5">
        <button 
          onClick={handleLogout}
          type="button" 
          className="text-center bg-red-600 w-full p-3 font-bold text-white truncate font-lato">
            Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
