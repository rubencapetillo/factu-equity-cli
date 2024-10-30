import { Outlet } from "react-router-dom"
import { Sidebar} from "@/components"
import { useAuth } from "../hooks/useAuth"

export const Layout = () => {

  useAuth({middleware: 'auth'});

  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-scroll bg-slate-300 p-5">
        <Outlet />
      </main>
    </div>
  )
}
