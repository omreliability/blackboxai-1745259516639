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
    <div className="min-h-screen flex bg-reliabilityBlue flex-col text-white font-inter">
      <header className="bg-reliabilityOrange shadow-md flex justify-between items-center px-6 py-3">
        <div className="text-xl font-bold">Reliability</div>
        <button
          onClick={logout}
          className="flex items-center text-white hover:text-gray-200 font-semibold"
          title="Logout"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-reliabilityBlue shadow-md">
          <nav className="mt-4">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 hover:bg-reliabilityOrange hover:text-white ${
                    isActive ? 'bg-reliabilityOrange font-semibold' : 'text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-white text-gray-900">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
