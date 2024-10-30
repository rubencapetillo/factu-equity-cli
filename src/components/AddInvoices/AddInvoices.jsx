import { useState } from 'react';
import { axiosConfig } from '../../config/axiosConfig';

export const AddInvoices = () => {
  const [xmlFile, setXmlFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setXmlFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('AUTH_TOKEN');
    const formData = new FormData();
    formData.append('xml', xmlFile);

    try {
      const response = await axiosConfig.post('/api/upload-xml', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      })
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error al cargar el archivo');
    }
  };

  return (
    <div>
      <h1>Subir Factura XML</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".xml" />
        <button type="submit">Cargar XML</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
