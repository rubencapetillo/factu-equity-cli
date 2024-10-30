const users = [
  { id: 1, name: 'Carlos Pérez', email: 'carlos.perez@example.com' },
  { id: 2, name: 'Ana García', email: 'ana.garcia@example.com' },
  { id: 3, name: 'Luis Ramírez', email: 'luis.ramirez@example.com' },
];


export const Users = () => {
  

  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  onClick={() => alert(`Editar usuario: ${user.name}`)}
                >
                  Editar Usuario
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
