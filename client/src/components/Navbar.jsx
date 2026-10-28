import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Film, User, LogOut, Ticket, Sparkles, Heart } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';
  const isBookings = location.pathname === '/my-bookings';

  return (
    <header className="navbar-pastel">
      <div className="navbar-inner">
        {/* Brand Wordmark */}
        <Link to="/" className="nav-logo" title="IMovies Boutique Cinema">
          <div className="nav-logo-badge">
            <Film size={18} />
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            IMOVIES <span style={{ fontSize: '1rem' }}>🎀</span>
          </span>
        </Link>

        {/* Navigation Actions */}
        <nav className="nav-links">
          <Link
            to="/"
            className={`btn-pastel btn-sm ${isHome ? 'btn-cotton' : 'btn-outline'}`}
          >
            <Sparkles size={15} color="var(--pink-bubblegum)" />
            <span>NOW PLAYING</span>
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/my-bookings"
                className={`btn-pastel btn-sm ${isBookings ? 'btn-lavender' : 'btn-outline'}`}
              >
                <Ticket size={16} />
                <span>MY PASSES</span>
              </Link>

              {/* User Profile Pill */}
              <div className="user-profile-chip" title={`Signed in as ${user?.email || 'User'}`}>
                <div className="user-avatar-dot">
                  <Heart size={12} fill="var(--pink-bubblegum)" color="var(--pink-bubblegum)" />
                </div>
                <span>{user?.name?.split(' ')[0] || 'Movie Lover'}</span>
              </div>

              <button
                onClick={handleLogout}
                className="btn-pastel btn-sm btn-strawberry"
                title="Log out from IMovies"
              >
                <LogOut size={15} />
                <span>LOGOUT</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-pastel btn-sm btn-outline">
                <User size={15} />
                <span>LOGIN</span>
              </Link>
              <Link to="/register" className="btn-pastel btn-sm btn-bubblegum">
                <Sparkles size={14} />
                <span>SIGN UP</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
