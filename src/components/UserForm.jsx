/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export const UserForm = ({ editingUser, setEditingUser, users, setUsers, activityLog, setActivityLog }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setRole(editingUser.role);
    } else {
      setName('');
      setEmail('');
      setRole('');
    }
  }, [editingUser]);

  const handleSaveUser = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (editingUser) {
      const updatedUser = { ...editingUser, name, email, role };
      setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user));
      setActivityLog([...activityLog, {
        id: activityLog.length + 1,
        user: "Administrador",
        action: `Edición de usuario (ID: ${editingUser.id})`,
        timestamp: new Date().toLocaleString(),
      }]);
      setEditingUser(null);
    } else {
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1,
        name,
        email,
        role,
        lastActive: "N/A",
      };
      setUsers([...users, newUser]);
      setActivityLog([...activityLog, {
        id: activityLog.length + 1,
        user: "Administrador",
        action: `Creación de usuario (ID: ${newUser.id})`,
        timestamp: new Date().toLocaleString(),
      }]);
    }
    setName('');
    setEmail('');
    setRole('');
  };

  return (
    <form onSubmit={handleSaveUser} className="mb-4 p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
      <div className="flex flex-col mb-4">
        <label htmlFor="name" className="mb-1 font-medium">Nombre:</label>
        <input
          type="text"
          name="name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="email" className="mb-1 font-medium">Email:</label>
        <input
          type="email"
          name="email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="role" className="mb-1 font-medium">Rol:</label>
        <select
          name="role"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Seleccionar rol</option>
          <option value="estudiante">Estudiante</option>
          <option value="profesor">Profesor</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
        {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
      </button>
      {editingUser && (
        <button 
          type="button" 
          className="mt-2 w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none" 
          onClick={() => setEditingUser(null)}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};


