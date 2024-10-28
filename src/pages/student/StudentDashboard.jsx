import { useState } from "react";
import { StatCard } from "../../components/StatCard";
import { Calendar } from "../../components/Calendar";
import { DashboardHeader } from "../../components/DashboardHeader";
import { Sidebar } from "../../components/Sidebar";
import { ActivityForm } from "../../components/ActivityForm";
import { ActivityList } from "../../components/ActivityList";
import { TabButton } from "../../components/TabButton";

export const StudentDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("calendar");
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState("");

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (newActivity.trim() === "") return;
    setActivities((prev) => [
      ...prev,
      { date: date.toDateString(), activity: newActivity },
    ]);
    setNewActivity("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <DashboardHeader title="Panel del estudiante" />

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Bienvenido
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard title="Clases Hoy" value="4" />
            <StatCard title="Tareas Pendientes" value="7" />
            <StatCard title="Mensajes Nuevos" value="3" />
            <StatCard title="Promedio General" value="8.5" />
          </div>

          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <TabButton
                  title="Calendario"
                  isActive={activeTab === "calendar"}
                  onClick={() => setActiveTab("calendar")}
                />
                <TabButton
                  title="Lista"
                  isActive={activeTab === "list"}
                  onClick={() => setActiveTab("list")}
                />
              </nav>
            </div>

            <div className="mt-4">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {activeTab === "calendar"
                      ? "Horario Semanal"
                      : "Lista de Clases y Actividades"}
                  </h3>
                  {activeTab === "calendar" ? (
                    <Calendar date={date} setDate={setDate} />
                  ) : (
                    <>
                      <ActivityForm
                        newActivity={newActivity}
                        setNewActivity={setNewActivity}
                        handleAddActivity={handleAddActivity}
                      />
                      <ActivityList activities={activities} />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
