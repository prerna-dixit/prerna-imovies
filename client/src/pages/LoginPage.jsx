import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Key, Mail, Sparkles, AlertCircle, Heart } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(redirectPath, { replace: true });
    } else {
      setError(result.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleUseDemo = () => {
    setEmail('demo@imovies.com');
    setPassword('password123');
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
          <span className="badge-pastel badge-magenta">
            <Heart size={12} fill="var(--pink-bubblegum)" /> CINEMA ACCESS
          </span>
        </div>

        <h2 style={{ fontSize: '2.1rem', marginBottom: '8px', color: 'var(--berry-deep)' }}>
          WELCOME BACK 🎀
        </h2>
        <p style={{ fontSize: '0.94rem', color: 'var(--berry-muted)', marginBottom: '28px', lineHeight: '1.5' }}>
          Sign in to reserve boutique auditorium armchairs and view your movie passes.
        </p>

        {error && (
          <div className="alert-pastel alert-error" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle size={20} color="var(--strawberry)" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
                placeholder="you@cinema.love"
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
              PASSWORD
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-pastel btn-bubblegum btn-lg"
            style={{ width: '100%', marginBottom: '16px' }}
          >
            <LogIn size={18} />
            <span>{isSubmitting ? 'SIGNING IN...' : 'LOGIN TO ACCOUNT'}</span>
          </button>
        </form>

        {/* Demo Credentials Shortcut */}
        <div
          style={{
            borderTop: '1px solid var(--border-rose)',
            paddingTop: '20px',
            marginTop: '20px',
            textAlign: 'center',
          }}
        >
          <button
            type="button"
            onClick={handleUseDemo}
            className="btn-pastel btn-sm btn-baby-blue"
            style={{ width: '100%', marginBottom: '16px', padding: '9px 16px' }}
          >
            <Sparkles size={15} />
            <span>FILL DEMO CREDENTIALS (EVALUATOR SHORTCUT)</span>
          </button>

          <p style={{ fontSize: '0.9rem', color: 'var(--berry-muted)' }}>
            Don't have an account yet?{' '}
            <Link
              to="/register"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                color: 'var(--strawberry)',
                textDecoration: 'underline',
              }}
            >
              CREATE ONE HERE 🎀
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
