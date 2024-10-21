import { BookOpen } from "lucide-react"
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">PlanAcadémico</span>
          </Link>
          <div className="space-x-4">
            <Link to="/login">
              <button className="btn btn-primary">Iniciar sesión</button>
            </Link>
            <button className="btn btn-accent btn-outline">Saber más</button>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Planificación académica simplificada
              </h1>
              <p className="text-xl text-gray-600">
                Optimiza tu experiencia educativa con nuestro sistema intuitivo de planificación académica. 
                Diseñado para estudiantes y educadores, te ayudamos a organizar, planificar y alcanzar tus metas académicas.
              </p>
              <div className="space-x-4">
                <button className="btn btn-success">
                  Comenzar ahora
                </button>
                <button className="btn btn-outline  btn-info">
                  Ver demo
                </button>
              </div>
            </div>
            <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="text-lg">Imagen del sistema</span>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Características principales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Planificación inteligente",
                  description: "Organiza tu horario de manera eficiente con nuestra tecnología de IA."
                },
                {
                  title: "Seguimiento de progreso",
                  description: "Visualiza tu avance académico y mantén el control de tus metas."
                },
                {
                  title: "Colaboración en tiempo real",
                  description: "Trabaja en equipo con compañeros y profesores de forma sencilla."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PlanAcadémico. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}