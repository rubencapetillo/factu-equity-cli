import { useContext } from "react"
import { InvoiceContext } from "@/context/InvoiceProvider"

export const useInvoice = () => {
  return useContext(InvoiceContext);
}