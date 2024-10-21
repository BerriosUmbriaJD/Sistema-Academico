import { useState } from 'react'
import { NavItem } from '../../components/NavItem'
import { BookOpen, Home, Calendar as CalendarIcon, Mail, FileText, Bell, User, Send, Search } from 'lucide-react'
import { Link } from "react-router-dom"

export const StudentMessages = () => {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const messages = [
    { id: 1, sender: "Prof. García", subject: "Tarea de Matemáticas", preview: "Recuerda entregar la tarea...", date: "2023-05-15", read: false },
    { id: 2, sender: "Secretaría Académica", subject: "Inscripción al próximo semestre", preview: "El periodo de inscripción...", date: "2023-05-14", read: true },
    { id: 3, sender: "Biblioteca", subject: "Libros pendientes", preview: "Tienes libros por devolver...", date: "2023-05-13", read: true },
    { id: 4, sender: "Club de Debate", subject: "Próxima reunión", preview: "Te invitamos a nuestra próxima...", date: "2023-05-12", read: false },
  ]

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <NavItem icon={<CalendarIcon className="mr-3 h-5 w-5" />} label="Horario" />
          <NavItem icon={<FileText className="mr-3 h-5 w-5" />} label="Tareas" />
          <NavItem icon={<Mail className="mr-3 h-5 w-5" />} label="Mensajes" active />
          <NavItem icon={<BookOpen className="mr-3 h-5 w-5" />} label="Materiales del Curso" />
        </nav>
      </aside>

      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Mensajes</h1>
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

        <div className="flex-1 overflow-hidden flex">
          <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar mensajes..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            {filteredMessages.map(message => (
              <button
                key={message.id}
                className={`w-full text-left p-4 border-b border-gray-200 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ${
                  selectedMessage?.id === message.id ? 'bg-gray-100' : ''
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex justify-between items-baseline">
                  <span className={`font-medium ${message.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {message.sender}
                  </span>
                  <span className="text-sm text-gray-500">{message.date}</span>
                </div>
                <div className={`mt-1 ${message.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {message.subject}
                </div>
                <div className="mt-1 text-sm text-gray-500 truncate">{message.preview}</div>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-white">
            {selectedMessage ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedMessage.subject}</h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">De: {selectedMessage.sender}</span>
                  <span className="text-gray-500">{selectedMessage.date}</span>
                </div>
                <p className="text-gray-800 mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="mt-6">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <Send className="mr-2 h-4 w-4" />
                    Responder
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Selecciona un mensaje para ver su contenido
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

