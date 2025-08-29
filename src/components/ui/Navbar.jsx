import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin = (data) => {
    setUser(data.user);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav
      className="navbar navbar-expand-lg shadow-lg sticky-top"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        borderRadius: "0 0 1rem 1rem",
        minHeight: 70,
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      <div className="container-fluid px-4">
        {/* Logo area - replace with your logo image if needed */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold">
          <span className="d-flex align-items-center justify-content-center bg-white bg-opacity-25 rounded-circle me-2" style={{ width: 44, height: 44 }}>
            {/* Modern SVG Graduation Cap Logo */}
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#4f8cff" />
                  <stop offset="1" stop-color="#a084ee" />
                </linearGradient>
              </defs>
              <path d="M24 8L44 18L24 28L4 18L24 8Z" fill="url(#logo-gradient)" stroke="#fff" strokeWidth="2"/>
              <path d="M10 22V30C10 32.2091 17.1634 34 24 34C30.8366 34 38 32.2091 38 30V22" stroke="#fff" strokeWidth="2"/>
              <circle cx="24" cy="8" r="2.5" fill="#fff" stroke="#4f8cff" strokeWidth="1.5"/>
            </svg>
          </span>
          <span 
            style={{
              fontFamily: "'Montserrat', 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              fontWeight: 900,
              fontSize: '2rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#fff',
              textShadow: '0 2px 8px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.08)'
            }}
          >
            Eventory
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-2 align-items-lg-center">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-semibold px-3 rounded-pill text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link fw-semibold px-3 rounded-pill text-white">
                Events
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white fw-semibold px-3" href="#" role="button" data-bs-toggle="dropdown">
                    <i className="fas fa-user me-2"></i>
                    {user.name}
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/dashboard">Dashboard</a></li>
                    <li><a className="dropdown-item" href="/profile">Profile</a></li>
                    {isAdmin && (
                      <li><a className="dropdown-item" href="/add-event">Add Event</a></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                  </ul>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link to="/add-event" className="btn btn-light fw-bold px-4 ms-2 shadow-sm">
                      + Add Event
                    </Link>
                  </li>
                )}
              </>
            ) : (
              <li className="nav-item">
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="btn btn-outline-light fw-semibold px-4 ms-2 border-2"
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </nav>
  );
}