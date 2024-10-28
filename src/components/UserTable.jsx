import { Edit, Trash2 } from 'lucide-react';

export const UserTable = ({ users, searchTerm, handleDeleteUser, setEditingUser }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actividad</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users
            .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(user => (
              <tr key={user.id}>
                <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.role}</td>
                <td className="px-4 py-2 whitespace-nowrap">{user.lastActive}</td>
                <td className="px-4 py-2 whitespace-nowrap flex space-x-2">
                  <button onClick={() => setEditingUser(user)}>
                    <Edit className="h-4 w-4 text-blue-600" />
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

