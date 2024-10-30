import { useState } from 'react';
import { axiosConfig } from '../../config/axiosConfig';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const AddInvoices = () => {
  const [xmlFile, setXmlFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setXmlFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!xmlFile) {
      MySwal.fire({
        title: 'Archivo no seleccionado',
        text: 'Por favor selecciona un archivo XML antes de subirlo.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    const token = localStorage.getItem('AUTH_TOKEN');
    const formData = new FormData();
    formData.append('xml', xmlFile);

    try {
      setLoading(true);

      const response = await axiosConfig.post('/api/upload-xml', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      MySwal.fire({
        title: '¡Factura Cargada!',
        text: response.data.message || 'La factura se ha cargado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      setXmlFile(null);
    } catch (error) {
      console.error(error);
      MySwal.fire({
        title: 'Error al Cargar',
        text: 'Hubo un problema al cargar la factura. Inténtalo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Reintentar',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Subir Factura XML
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".xml"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
          />

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-bold rounded-lg transition duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar XML'}
          </button>
        </form>
      </div>
    </div>
  );
};
