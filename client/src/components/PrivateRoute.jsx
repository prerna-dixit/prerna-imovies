import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RefreshCw, Heart } from 'lucide-react';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div
          className="card-pastel"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            padding: '24px 38px',
            borderRadius: 'var(--radius-pill)',
            background: '#FFFFFF',
            boxShadow: 'var(--shadow-md)',
            border: '2px solid var(--border-rose)',
          }}
        >
          <RefreshCw size={22} className="spin-icon" color="var(--pink-bubblegum)" />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--berry-deep)' }}>
            Verifying your cinema session... 🎀
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
