export const TabButton = ({ title, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
      isActive
        ? 'border-blue-500 text-blue-600'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
    }`}
  >
    {title}
  </button>
)


