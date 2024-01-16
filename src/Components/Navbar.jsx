import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useSignOut, useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.JPG';

function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const auth = useAuthUser();

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleLogout = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/users/sign_out`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      signOut();
      toast.success('Logout Successfully');

      navigate('/login');
    } catch (err) {
      toast.error('Oops! Failed to logout');
    }
  };

  return (
    <>
      <div className="mob-nav">
        <FontAwesomeIcon icon={faBars} className="humburger" onClick={toggleSidebar} />
      </div>
      <div className={`side-bar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-logo-container">
          <img src={logo} alt="" className="sidebar-logo" />
        </div>
        <div className="sidebar-links-container">
          <Link to="/games" className={`nav-link ${location.pathname === '/games' ? 'active' : ''}`} onClick={closeSidebar}>Home Page</Link>
          {
            auth().isAdmin
              ? <Link to="/gameList" className={`nav-link ${location.pathname === '/gameList' ? 'active' : ''}`} onClick={closeSidebar}>Games</Link>
              : null
          }
          {
            auth().isAdmin
              ? <Link to="/addGame" className={`nav-link ${location.pathname === '/addGame' ? 'active' : ''}`} onClick={closeSidebar}>Add Game</Link>
              : null
          }
          <Link to="/reservations" className={`nav-link ${location.pathname === '/reservations' ? 'active' : ''}`} onClick={closeSidebar}>Reservations</Link>
          <button
            disabled={!isAuthenticated()}
            onClick={handleLogout}
            type="button"
            className="list-group-item list-group-item-action"
          >
            Log Out
          </button>
        </div>
        <div className="license-container">
          <p className="license">&copy; Esports Gaming Center</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
