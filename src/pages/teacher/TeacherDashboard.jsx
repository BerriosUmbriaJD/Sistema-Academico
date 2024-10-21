import { useState } from 'react';
import { BookOpen, Home, Calendar, FileText, Bell, User, Plus, Edit, Trash2, Clock } from 'lucide-react';
import { Link } from "react-router-dom";
import { NavItem } from '../../components/NavItem';

export const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState([
    { id: 1, name: "Matemáticas Avanzadas", schedule: "Lunes y Miércoles, 10:00 - 12:00", students: 30, materials: [] },
    { id: 2, name: "Física Cuántica", schedule: "Martes y Jueves, 14:00 - 16:00", students: 25, materials: [] },
    { id: 3, name: "Programación en Python", schedule: "Viernes, 09:00 - 12:00", students: 40, materials: [] },
  ]);
  const [assignments, setAssignments] = useState([]);
  const [exams, setExams] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [newMaterial, setNewMaterial] = useState('');

  const handleEditItem = (item) => {
    setEditingItem(item);
  };

  const handleDeleteItem = (id, type) => {
    if (type === 'course') {
      setCourses(courses.filter(course => course.id !== id));
    } else if (type === 'assignment') {
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    } else if (type === 'exam') {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (editingItem) {
      if ('schedule' in editingItem) {
        setCourses(courses.map(course => course.id === editingItem.id ? editingItem : course));
      } else if ('dueDate' in editingItem) {
        setAssignments(assignments.map(assignment => assignment.id === editingItem.id ? editingItem : assignment));
      } else if ('date' in editingItem) {
        setExams(exams.map(exam => exam.id === editingItem.id ? editingItem : exam));
      }
    } else {
      if (activeTab === 'courses') {
        const newCourse = {
          id: courses.length + 1,
          name: e.currentTarget.name.value,
          schedule: e.currentTarget.schedule.value,
          students: parseInt(e.currentTarget.students.value, 10),
          materials: []
        };
        setCourses([...courses, newCourse]);
      } else if (activeTab === 'assignments') {
        const newAssignment = {
          id: assignments.length + 1,
          title: e.currentTarget.title.value,
          course: e.currentTarget.course.value,
          dueDate: e.currentTarget.dueDate.value,
        };
        setAssignments([...assignments, newAssignment]);
      } else if (activeTab === 'exams') {
        const newExam = {
          id: exams.length + 1,
          title: e.currentTarget.title.value,
          course: e.currentTarget.course.value,
          date: e.currentTarget.date.value,
        };
        setExams([...exams, newExam]);
      }
    }
    setEditingItem(null);
  };

  const handleAddMaterial = (courseId) => {
    const updatedCourses = courses.map(course => {
      if (course.id === courseId) {
        return { ...course, materials: [...course.materials, newMaterial] };
      }
      return course;
    });
    setCourses(updatedCourses);
    setNewMaterial('');
  };

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
          <NavItem icon={<Calendar className="mr-3 h-5 w-5" />} label="Cursos" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
          <NavItem icon={<FileText className="mr-3 h-5 w-5" />} label="Tareas" active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')} />
          <NavItem icon={<Clock className="mr-3 h-5 w-5" />} label="Exámenes" active={activeTab === 'exams'} onClick={() => setActiveTab('exams')} />
        </nav>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Panel de Profesor</h1>
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
                onClick={() => setActiveTab('courses')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'courses'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cursos
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'assignments'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Tareas
              </button>
              <button
                onClick={() => setActiveTab('exams')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'exams'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Exámenes
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  {activeTab === 'courses' ? 'Mis Cursos' : activeTab === 'assignments' ? 'Tareas Asignadas' : 'Exámenes Programados'}
                </h2>
                <button
                  onClick={() => setEditingItem({})}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Plus className="inline-block mr-2 h-5 w-5" />
                  {activeTab === 'courses' ? 'Nuevo Curso' : activeTab === 'assignments' ? 'Nueva Tarea' : 'Nuevo Examen'}
                </button>
              </div>
              <ul className="divide-y divide-gray-200">
                {activeTab === 'courses' && courses.map(course => (
                  <li key={course.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-900">{course.name}</p>
                      <p className="text-sm text-gray-500">{course.schedule}</p>
                      <p className="text-sm text-gray-500">{course.students} estudiantes</p>
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={() => handleEditItem(course)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteItem(course.id, 'course')} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
                {activeTab === 'assignments' && assignments.map(assignment => (
                  <li key={assignment.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-900">{assignment.title}</p>
                      <p className="text-sm text-gray-500">Debido: {assignment.dueDate}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={() => handleEditItem(assignment)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteItem(assignment.id, 'assignment')} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
                {activeTab === 'exams' && exams.map(exam => (
                  <li key={exam.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-900">{exam.title}</p>
                      <p className="text-sm text-gray-500">Fecha: {exam.date}</p>
                    </div>
                    <div className="flex space-x-4">
                      <button onClick={() => handleEditItem(exam)} className="text-blue-600 hover:text-blue-800">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button onClick={() => handleDeleteItem(exam.id, 'exam')} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Modal for Editing/Adding Items */}
          {editingItem && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-md">
                <h3 className="text-lg font-medium">{editingItem.id ? 'Editar' : 'Nuevo'} {activeTab === 'courses' ? 'Curso' : activeTab === 'assignments' ? 'Tarea' : 'Examen'}</h3>
                <form onSubmit={handleSaveItem}>
                  {activeTab === 'courses' && (
                    <>
                      <label className="block mt-4">
                        <span className="text-gray-700">Nombre del Curso</span>
                        <input type="text" name="name" defaultValue={editingItem.name || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                      <label className="block mt-4">
                        <span className="text-gray-700">Horario</span>
                        <input type="text" name="schedule" defaultValue={editingItem.schedule || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                      <label className="block mt-4">
                        <span className="text-gray-700">Número de Estudiantes</span>
                        <input type="number" name="students" defaultValue={editingItem.students || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                    </>
                  )}
                  {activeTab === 'assignments' && (
                    <>
                      <label className="block mt-4">
                        <span className="text-gray-700">Título de la Tarea</span>
                        <input type="text" name="title" defaultValue={editingItem.title || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                      <label className="block mt-4">
                        <span className="text-gray-700">Curso</span>
                        <input type="text" name="course" defaultValue={editingItem.course || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                      <label className="block mt-4">
                        <span className="text-gray-700">Fecha de Entrega</span>
                        <input type="date" name="dueDate" defaultValue={editingItem.dueDate || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                    </>
                  )}
                  {activeTab === 'exams' && (
                    <>
                      <label className="block mt-4">
                        <span className="text-gray-700">Título del Examen</span>
                        <input type="text" name="title" defaultValue={editingItem.title || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                      <label className="block mt-4">
                        <span className="text-gray-700">Curso</span>
                        <input type="text" name="course" defaultValue={editingItem.course || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                      <label className="block mt-4">
                        <span className="text-gray-700">Fecha del Examen</span>
                        <input type="date" name="date" defaultValue={editingItem.date || ''} required className="mt-1 block w-full border-gray-300 rounded-md" />
                      </label>
                    </>
                  )}
                  <div className="flex justify-end mt-4">
                    <button type="button" onClick={() => setEditingItem(null)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200">Cancelar</button>
                    <button type="submit" className="ml-2 px-4 py-2 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700">Guardar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Upload Materials for Course */}
          {activeTab === 'courses' && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Materiales de Estudio</h2>
              <ul className="divide-y divide-gray-200">
                {courses.map(course => (
                  <li key={course.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-medium text-gray-900">{course.name}</p>
                      <input
                        type="text"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        placeholder="Nuevo material"
                        className="mt-1 block w-full border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleAddMaterial(course.id)}
                        className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        Añadir Material
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};



