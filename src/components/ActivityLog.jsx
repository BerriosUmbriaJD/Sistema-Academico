export const ActivityLog = ({ activityLog }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-4">Registro de Actividad</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acción</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activityLog.map(log => (
            <tr key={log.id}>
              <td className="px-4 py-2 whitespace-nowrap">{log.user}</td>
              <td className="px-4 py-2 whitespace-nowrap">{log.action}</td>
              <td className="px-4 py-2 whitespace-nowrap">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


