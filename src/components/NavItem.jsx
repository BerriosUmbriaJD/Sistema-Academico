import { Link } from "react-router-dom";

export const NavItem = ({ icon, label, active = false }) => {
  return (
    <Link
      to="#"
      className={`flex items-center px-4 py-2 text-sm font-medium ${
        active ? 'bg-gray-100 text-blue-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};
