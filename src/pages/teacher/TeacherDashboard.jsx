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
    if (editingItem && editingItem.id) {
        // Lógica de edición
    } else {
        if (activeTab === 'courses') {
            const newCourse = {
                id: courses.length + 1,
                name: e.target.name.value,
                schedule: e.target.schedule.value,
                students: parseInt(e.target.students.value, 10),
                materials: [],
            };
            setCourses([...courses, newCourse]);
        } else if (activeTab === 'assignments') {
            const newAssignment = {
                id: assignments.length + 1,
                title: e.target.title.value,
                course: e.target.course.value,
                dueDate: e.target.dueDate.value,
            };
            setAssignments([...assignments, newAssignment]);
        } else if (activeTab === 'exams') {
            const newExam = {
                id: exams.length + 1,
                title: e.target.title.value,
                course: e.target.course.value,
                date: e.target.date.value,
            };
            setExams([...exams, newExam]);
        }
    }
    setEditingItem(null);
    e.target.reset();
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
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'courses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Cursos
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'assignments' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Tareas
              </button>
              <button
                onClick={() => setActiveTab('exams')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'exams' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
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
                      <p className="text-sm font-medium text-gray-900">{course.name}</p>
                      <p className="text-sm text-gray-500">{course.schedule}</p>
                      <p className="text-sm text-gray-500">{course.students} estudiantes</p>
                      <ul>
                        {course.materials.map((material, index) => (
                          <li key={index} className="text-sm text-gray-500">- {material}</li>
                        ))}
                      </ul>
                      <input
                        type="text"
                        value={newMaterial}
                        onChange={(e) => setNewMaterial(e.target.value)}
                        placeholder="Nuevo material"
                        className="mt-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <button
                        onClick={() => handleAddMaterial(course.id)}
                        className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Añadir
                      </button>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEditItem(course)}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-2"
                      >
                        <Edit className="inline-block h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(course.id, 'course')}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="inline-block h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
                {activeTab === 'assignments' && assignments.map(assignment => (
                  <li key={assignment.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{assignment.title}</p>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                      <p className="text-sm text-gray-500">Fecha de entrega: {assignment.dueDate}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEditItem(assignment)}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-2"
                      >
                        <Edit className="inline-block h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(assignment.id, 'assignment')}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="inline-block h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
                {activeTab === 'exams' && exams.map(exam => (
                  <li key={exam.id} className="py-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{exam.title}</p>
                      <p className="text-sm text-gray-500">{exam.course}</p>
                      <p className="text-sm text-gray-500">Fecha: {exam.date}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEditItem(exam)}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 mr-2"
                      >
                        <Edit className="inline-block h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(exam.id, 'exam')}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="inline-block h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {editingItem && (
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">
                {activeTab === 'courses' ? 'Editar Curso' : activeTab === 'assignments' ? 'Editar Tarea' : 'Editar Examen'}
              </h2>
              <form onSubmit={handleSaveItem} className="space-y-4 mt-4">
                {activeTab === 'courses' && (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre del curso</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={editingItem.name || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Horario</label>
                      <input
                        type="text"
                        name="schedule"
                        id="schedule"
                        value={editingItem.schedule || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, schedule: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="students" className="block text-sm font-medium text-gray-700">Número de estudiantes</label>
                      <input
                        type="number"
                        name="students"
                        id="students"
                        value={editingItem.students || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, students: parseInt(e.target.value, 10) })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </>
                )}
                {activeTab === 'assignments' && (
                  <>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título de la tarea</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="course" className="block text-sm font-medium text-gray-700">Curso</label>
                      <input
                        type="text"
                        name="course"
                        id="course"
                        value={editingItem.course || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, course: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Fecha de entrega</label>
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        value={editingItem.dueDate || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, dueDate: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </>
                )}
                {activeTab === 'exams' && (
                  <>
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título del examen</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        value={editingItem.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="course" className="block text-sm font-medium text-gray-700">Curso</label>
                      <input
                        type="text"
                        name="course"
                        id="course"
                        value={editingItem.course || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, course: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Fecha</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={editingItem.date || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                        required
                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </>
                )}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="ml-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

