import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import MarqueeTicker from './components/MarqueeTicker';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MovieDetailPage from './pages/MovieDetailPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import MyBookingsPage from './pages/MyBookingsPage';
import { Sparkles, Film, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => (
  <div style={{ textAlign: 'center', padding: '80px 20px' }}>
    <div
      className="card-pastel"
      style={{
        maxWidth: '520px',
        margin: '0 auto',
        padding: '48px 32px',
        background: '#FFFFFF',
        border: '2px solid var(--border-rose)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
        <span className="badge-pastel badge-magenta" style={{ fontSize: '0.9rem', padding: '6px 16px' }}>
          <Sparkles size={14} /> ERROR 404
        </span>
      </div>

      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--pink-blush), var(--pink-cotton))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px auto',
          color: 'var(--pink-bubblegum)',
          border: '2px solid var(--border-rose)',
        }}
      >
        <Film size={34} />
      </div>

      <h1 style={{ fontSize: '2.4rem', marginBottom: '14px', color: 'var(--berry-deep)' }}>
        REEL NOT FOUND 🎀
      </h1>
      
      <p style={{ color: 'var(--berry-muted)', fontSize: '1rem', marginBottom: '28px', lineHeight: '1.6' }}>
        The cinema reel you are looking for has been moved to another auditorium, or this screening never existed!
      </p>

      <Link to="/" className="btn-pastel btn-bubblegum btn-lg">
        <ArrowLeft size={18} />
        <span>BACK TO SHOWTIMES</span>
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <MarqueeTicker />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/movies/:id" element={<MovieDetailPage />} />
              
              {/* Protected Routes */}
              <Route
                path="/book/:showtimeId"
                element={
                  <PrivateRoute>
                    <SeatSelectionPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <PrivateRoute>
                    <MyBookingsPage />
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
