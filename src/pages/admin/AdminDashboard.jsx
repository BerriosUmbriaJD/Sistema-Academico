import { useState } from 'react'
import { BookOpen, Home, Users, Activity, Settings, Bell, User, Search, Edit, Trash2, Plus } from 'lucide-react'
import { NavItem } from '../../components/NavItem'
import { Link } from "react-router-dom"

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users')
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan@example.com", role: "estudiante", lastActive: "2023-05-15 10:30" },
    { id: 2, name: "María García", email: "maria@example.com", role: "profesor", lastActive: "2023-05-15 09:45" },
    { id: 3, name: "Carlos Rodríguez", email: "carlos@example.com", role: "administrador", lastActive: "2023-05-15 11:15" },
  ])
  const [activityLog, setActivityLog] = useState([
    { id: 1, user: "Juan Pérez", action: "Inicio de sesión", timestamp: "2023-05-15 10:30" },
    { id: 2, user: "María García", action: "Creación de tarea", timestamp: "2023-05-15 09:45" },
    { id: 3, user: "Carlos Rodríguez", action: "Edición de usuario", timestamp: "2023-05-15 11:15" },
  ])
  const [editingUser, setEditingUser] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEditUser = (user) => {
    setEditingUser(user)
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId))
    setActivityLog([...activityLog, {
      id: activityLog.length + 1,
      user: "Administrador",
      action: `Eliminación de usuario (ID: ${userId})`,
      timestamp: new Date().toLocaleString()
    }])
  }

  const handleSaveUser = (e) => {
    e.preventDefault()
    
    // Validación básica
    if (!name || !email) {
      alert("Por favor, completa todos los campos.")
      return
    }

    if (editingUser) {
      // Edit existing user
      const updatedUser = { ...editingUser, name, email, role }
      setUsers(users.map(user => user.id === editingUser.id ? updatedUser : user))
      setActivityLog([...activityLog, {
        id: activityLog.length + 1,
        user: "Administrador",
        action: `Edición de usuario (ID: ${editingUser.id})`,
        timestamp: new Date().toLocaleString()
      }])
      setEditingUser(null)
      setName('')
      setEmail('')
      setRole('')
    } else {
      // Add new user
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1, // ID único
        name,
        email,
        role,
        lastActive: "N/A"
      }
      setUsers([...users, newUser])
      setActivityLog([...activityLog, {
        id: activityLog.length + 1,
        user: "Administrador",
        action: `Creación de usuario (ID: ${newUser.id})`,
        timestamp: new Date().toLocaleString()
      }])
      // Reset the form
      setName('')
      setEmail('')
      setRole('')
      setEditingUser(null) // Asegúrate de limpiar el estado de editingUser
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">PlanAcadémico</span>
          </Link>
        </div>
        <nav className="mt-8">
          <NavItem icon={<Home className="mr-3 h-5 w-5" />} label="Inicio" />
          <NavItem icon={<Users className="mr-3 h-5 w-5" />} label="Usuarios" active />
          <NavItem icon={<Activity className="mr-3 h-5 w-5" />} label="Actividad" />
          <NavItem icon={<Settings className="mr-3 h-5 w-5" />} label="Configuración" />
        </nav>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <User className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('users')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Gestión de Usuarios
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'activity'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
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

              <form onSubmit={handleSaveUser} className="mb-4 p-4 bg-white rounded shadow-md">
                <h2 className="text-lg font-semibold mb-4">{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                <div className="flex flex-col mb-4">
                  <label htmlFor="name" className="mb-1 font-medium">Nombre:</label>
                  <input
                    type="text"
                    name="name"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={name} // Manejando el valor desde el estado
                    onChange={(e) => setName(e.target.value)} // Actualizando el estado
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="email" className="mb-1 font-medium">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={email} // Manejando el valor desde el estado
                    onChange={(e) => setEmail(e.target.value)} // Actualizando el estado
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="role" className="mb-1 font-medium">Rol:</label>
                  <select
                    name="role"
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    value={role} // Manejando el valor desde el estado
                    onChange={(e) => setRole(e.target.value)} // Actualizando el estado
                  >
                    <option value="">Seleccionar rol</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="profesor">Profesor</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {editingUser ? 'Actualizar Usuario' : 'Agregar Usuario'}
                </button>
              </form>

              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Actividad</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.lastActive}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button onClick={() => handleEditUser(user)} className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4 inline" />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-900 ml-2">
                          <Trash2 className="h-4 w-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Registro de Actividad</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activityLog.map(activity => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{activity.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{activity.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{activity.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}


