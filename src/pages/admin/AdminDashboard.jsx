import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Sidebar } from '../../components/Sidebar';
import { DashboardHeader } from '../../components/DashboardHeader';
import { UserForm } from '../../components/UserForm';
import { UserTable } from '../../components/UserTable';
import { ActivityLog } from '../../components/ActivityLog';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "estudiante", lastActive: "2023-05-15 10:30" },
    { id: 2, name: "María García", email: "maria@example.com", role: "profesor", lastActive: "2023-05-15 09:45" },
    { id: 3, name: "Carlos Rodríguez", email: "carlos@example.com", role: "administrador", lastActive: "2023-05-15 11:15" },
  ]);
  const [activityLog, setActivityLog] = useState([
    { id: 1, user: "Juan Pérez", action: "Inicio de sesión", timestamp: "2023-05-15 10:30" },
    { id: 2, user: "María García", action: "Creación de tarea", timestamp: "2023-05-15 09:45" },
    { id: 3, user: "Carlos Rodríguez", action: "Edición de usuario", timestamp: "2023-05-15 11:15" },
  ])
  const [editingUser, setEditingUser] = useState(null)
  
  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setActivityLog([...activityLog, {
      id: activityLog.length + 1,
      user: "Administrador",
      action: `Eliminación de usuario (ID: ${userId})`,
      timestamp: new Date().toLocaleString(),
    }])
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <DashboardHeader title='Dashboard Administrador' />

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Gestión de Usuarios
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'activity' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Registro de Actividad
              </button>
            </nav>
          </div>

          {activeTab === 'users' && (
            <div>
              <div className="mb-4 flex justify-between items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar usuarios..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                </div>
                <button
                  onClick={() => setEditingUser(null)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Usuario
                </button>
              </div>

              <UserForm 
                editingUser={editingUser} 
                setEditingUser={setEditingUser} 
                users={users} 
                setUsers={setUsers} 
                activityLog={activityLog} 
                setActivityLog={setActivityLog} 
              />
              
              <UserTable 
                users={users} 
                searchTerm={searchTerm} 
                handleDeleteUser={handleDeleteUser} 
                setEditingUser={setEditingUser} 
              />
            </div>
          )}

          {activeTab === 'activity' && (
            <ActivityLog activityLog={activityLog} />
          )}
        </div>
      </main>
    </div>
  );
};

