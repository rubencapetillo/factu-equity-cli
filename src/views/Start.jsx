import { Users, Invoices,AddInvoices } from "@/components";
import { useInvoice } from "../hooks/useInvoices"

export const Start = () => {
  const { userView } = useInvoice();
  const LoadComponent = () => {
    if(userView.code === 1)
      return <Users />
    else if (userView.code === 3)
      return <Invoices />
    else 
      return <AddInvoices />
  }
  
  return (
    <>
      <h1 className="text-4xl font-black font-lato">Inicio</h1>
      <p className="text-2xl my-10">
        { userView.name }
      </p>
      <div>
        {LoadComponent()}
      </div>
    </>
  )
}
