import { useState } from 'react';
import { BookOpen, Home, Calendar as CalendarIcon, Mail, FileText, Bell, User } from 'lucide-react';
import { NavItem } from '../../components/NavItem';
import { StatCard } from '../../components/StatCard';
import { Link } from 'react-router-dom';
import { Calendar } from '../../components/Calendar';

export const StudentDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('calendar');

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
          <NavItem icon={<Home className="mr-3 h-5 w-5" />} label="Inicio" active />
          <NavItem icon={<CalendarIcon className="mr-3 h-5 w-5" />} label="Horario" />
          <NavItem icon={<FileText className="mr-3 h-5 w-5" />} label="Tareas" />
          <Link to="/student/messages">
            <NavItem icon={<Mail className="mr-3 h-5 w-5" />} label="Mensajes" />
          </Link>
          <NavItem icon={<BookOpen className="mr-3 h-5 w-5" />} label="Materiales del Curso" />
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bienvenido, Juan</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard title="Clases Hoy" value="4" />
            <StatCard title="Tareas Pendientes" value="7" />
            <StatCard title="Mensajes Nuevos" value="3" />
            <StatCard title="Promedio General" value="8.5" />
          </div>

          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'calendar'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Calendario
                </button>
                <button
                  onClick={() => setActiveTab('list')}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 'list'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Lista
                </button>
              </nav>
            </div>
            <div className="mt-4">
              {activeTab === 'calendar' ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Horario Semanal</h3>
                    <Calendar date={date} setDate={setDate} />
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Lista de Clases y Actividades</h3>
                    <p>Añade alguna actividad.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};






