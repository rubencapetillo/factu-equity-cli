import { useEffect, useState } from 'react';
import { axiosConfig } from '../../config/axiosConfig';

export const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');

    const fetchInvoices = async () => {
      
      try {
        const response = await axiosConfig.get('/api/invoices', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setInvoices(response.data);
      } catch (err) {
        setError('Error al cargar las facturas', err);
      } finally {
        setLoading(false);
      }

    };

    fetchInvoices();
  }, []);

  if (loading) return <p className="text-center text-blue-500">Cargando facturas...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Facturas Registradas</h1>
      {invoices.length === 0 ? (
        <p className="text-center text-gray-500">No hay facturas registradas</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">UUID</th>
                <th className="py-3 px-6 text-left">Folio</th>
                <th className="py-3 px-6 text-left">Emisor</th>
                <th className="py-3 px-6 text-left">Receptor</th>
                <th className="py-3 px-6 text-left">Moneda</th>
                <th className="py-3 px-6 text-right">Total</th>
                <th className="py-3 px-6 text-right">Tipo de Cambio</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{invoice.uuid}</td>
                  <td className="py-3 px-6">{invoice.folio}</td>
                  <td className="py-3 px-6">{invoice.emisor}</td>
                  <td className="py-3 px-6">{invoice.receptor}</td>
                  <td className="py-3 px-6">{invoice.moneda}</td>
                  <td className="py-3 px-6 text-right">{Number(invoice.total).toFixed(2)}</td>
                  <td className="py-3 px-6 text-right">{Number(invoice.tipo_cambio).toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
