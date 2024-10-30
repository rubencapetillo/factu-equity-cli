import { Outlet } from "react-router-dom"

export const AuthLayout = () => {
  return (
    <main className="max-w-4xl mx-auto mt-10 md:mt-20 flex flex-col md:flex-row items-center">
      <img src="../img/logo_invoice.jpg" alt="logo factu equity" className="max-w-xs"/>
      <div className="p-10 w-full">
        <Outlet/>
      </div>
    </main>
  )
}
