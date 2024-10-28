export const ActivityForm = ({ newActivity, setNewActivity, handleAddActivity }) => (
  <form onSubmit={handleAddActivity} className="mb-4">
    <input
      type="text"
      placeholder="Añade una actividad..."
      value={newActivity}
      onChange={(e) => setNewActivity(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
      required
    />
    <button
      type="submit"
      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Añadir Actividad
    </button>
  </form>
)
