import { createBrowserRouter } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"
import { StudentDashboard } from "../pages/student/StudentDashboard"
import { StudentMessages } from '../pages/student/StudentMessages'
import { AdminDashboard } from "../pages/admin/AdminDashboard"
import { TeacherDashboard } from "../pages/teacher/TeacherDashboard"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/student/dashboard',
    element: <StudentDashboard />
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />
  },
  {
    path: '/student/messages',
    element: <StudentMessages />
  },
  {
    path: '/teacher/dashboard',
    element: <TeacherDashboard />
  }
])

export default router