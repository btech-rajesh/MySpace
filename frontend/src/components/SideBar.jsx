import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaStickyNote, FaCalendarAlt, FaAddressBook, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';

function SideBar() {
  const navigate = useNavigate();

  const navItems = [
    { to: '/notes', icon: <FaStickyNote />, label: 'Notes' },
    { to: '/events', icon: <FaCalendarAlt />, label: 'Events' },
    { to: '/contacts', icon: <FaAddressBook />, label: 'Contacts' },
  ];

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-gradient-to-r from-orange-500 to-orange-700 text-white p-2 rounded-xl flex items-center'
      : 'p-2 rounded-xl hover:bg-gray-300 flex items-center';

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('https://myspace-1-cp6a.onrender.com/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('token'); // Clear localStorage
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  return (
    <div className="h-screen w-54 bg-slate-200 p-4 flex flex-col justify-between">
      <div>
        <NavLink to={'/'}>
          <div className="flex items-center mb-4 bg-gradient-to-r from-fuchsia-500 to-orange-500 rounded-xl p-2">
            <FaUserCircle className="text-2xl mr-2" />
            <span className="text-lg font-bold">My Space</span>
          </div>
        </NavLink>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navLinkClass}
              aria-label={item.label}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold p-2 rounded-xl flex items-center"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
}

export default SideBar;
