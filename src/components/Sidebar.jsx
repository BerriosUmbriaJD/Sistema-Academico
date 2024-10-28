/* eslint-disable react/prop-types */
import { BookOpen, Home, Calendar, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';

export const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="w-64 bg-white shadow-md">
    <div className="p-4">
      <Link to="/" className="flex items-center space-x-2">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-800">PlanAcadémico</span>
      </Link>
    </div>
    <nav className="mt-8">
      <NavItem icon={<Home className="mr-3 h-5 w-5" />} label="Inicio" />
      <NavItem icon={<Calendar className="mr-3 h-5 w-5" />} label="Cursos" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
      <NavItem icon={<FileText className="mr-3 h-5 w-5" />} label="Tareas" active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')} />
      <NavItem icon={<Clock className="mr-3 h-5 w-5" />} label="Exámenes" active={activeTab === 'exams'} onClick={() => setActiveTab('exams')} />
    </nav>
  </aside>
);
