import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Key, AlertCircle, Sparkles } from 'lucide-react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter them.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);
    const result = await register(name, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setError(result.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto 60px auto' }}>
      <div
        className="card-pastel"
        style={{
          padding: '44px 36px',
          background: '#FFFFFF',
          border: '2px solid var(--border-rose)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg), 0 0 25px rgba(255, 194, 226, 0.3)',
        }}
      >
        {/* Header Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <span className="badge-pastel badge-green">
            <Sparkles size={12} /> CINEMA MEMBERSHIP
          </span>
        </div>

        <h2 style={{ fontSize: '2.1rem', marginBottom: '8px', color: 'var(--berry-deep)' }}>
          CREATE ACCOUNT 🎀
        </h2>
        <p style={{ fontSize: '0.94rem', color: 'var(--berry-muted)', marginBottom: '28px', lineHeight: '1.5' }}>
          Join the IMovies family to book auditorium seats instantly with zero fees.
        </p>

        {error && (
          <div className="alert-pastel alert-error" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} color="var(--strawberry)" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              FULL NAME
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="input-pastel"
                style={{ paddingLeft: '44px' }}
              />
              <User
                size={18}
                color="var(--pink-bubblegum)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              EMAIL ADDRESS
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@lovelace.dev"
                className="input-pastel"
                style={{ paddingLeft: '44px' }}
              />
              <Mail
                size={18}
                color="var(--pink-bubblegum)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              PASSWORD (MIN 6 CHARS)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-pastel"
                style={{ paddingLeft: '44px' }}
              />
              <Key
                size={18}
                color="var(--pink-bubblegum)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">
              CONFIRM PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="input-pastel"
                style={{ paddingLeft: '44px' }}
              />
              <Key
                size={18}
                color="var(--pink-bubblegum)"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-pastel btn-bubblegum btn-lg"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <UserPlus size={18} />
            <span>{isSubmitting ? 'CREATING PROFILE...' : 'REGISTER & CONTINUE'}</span>
          </button>
        </form>

        <div
          style={{
            borderTop: '1px solid var(--border-rose)',
            paddingTop: '20px',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '0.9rem', color: 'var(--berry-muted)' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--strawberry)',
                textDecoration: 'underline',
              }}
            >
              LOG IN INSTEAD 🎀
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
