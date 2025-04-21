import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const menuItems = [
  { name: 'Pumps', path: '/pumps', icon: <FaTachometerAlt /> },
  { name: 'Motors', path: '/motors', icon: <FaCog /> },
  { name: 'Blowers', path: '/blowers', icon: <FaTachometerAlt /> },
  { name: 'Gearbox', path: '/gearbox', icon: <FaCog /> },
  { name: 'Profile', path: '/profile', icon: <FaUser /> },
];

const Layout = ({ children }) => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex bg-gray-100 flex-col">
      <header className="bg-white shadow-md flex justify-between items-center px-6 py-3">
        <div className="text-xl font-bold">Motor & Pump Health</div>
        <button
          onClick={logout}
          className="flex items-center text-red-600 hover:text-red-800 font-semibold"
          title="Logout"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-md">
          <nav className="mt-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 ${
                    isActive ? 'bg-gray-300 font-semibold' : ''
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
