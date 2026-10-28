import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Heart, Sparkles, Ticket, ShieldCheck, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-pastel">
      <div className="footer-inner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '32px',
            marginBottom: '40px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, var(--pink-cotton), var(--pink-blush))',
                color: 'var(--berry-deep)',
                padding: '8px 18px',
                border: 'var(--border-thin)',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '16px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <Film size={20} color="var(--pink-bubblegum)" />
              <span>IMOVIES</span>
              <span>🎀</span>
            </div>
            
            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--berry-muted)',
                lineHeight: '1.65',
                maxWidth: '340px',
                marginBottom: '16px',
              }}
            >
              A dreamy boutique movie-going experience with live auditorium seat maps,
              collectible digital tickets, and sweet cinema vibes.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge-pastel badge-yellow">
                <Sparkles size={12} /> Y2K PASTEL
              </span>
              <span className="badge-pastel badge-magenta">
                <Heart size={12} fill="var(--pink-bubblegum)" /> BOUTIQUE
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4
              style={{
                fontSize: '1.05rem',
                marginBottom: '14px',
                color: 'var(--berry-deep)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Ticket size={16} color="var(--pink-bubblegum)" />
              <span>QUICK EXPLORE</span>
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.92rem',
                color: 'var(--berry-muted)',
                fontWeight: 600,
              }}
            >
              <Link to="/" style={{ transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.target.style.color = 'var(--pink-bubblegum)')} onMouseLeave={(e) => (e.target.style.color = 'var(--berry-muted)')}>
                ✦ Now Showing in Theatres
              </Link>
              <Link to="/my-bookings" style={{ transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.target.style.color = 'var(--pink-bubblegum)')} onMouseLeave={(e) => (e.target.style.color = 'var(--berry-muted)')}>
                ✦ My Cinema Passes
              </Link>
              <Link to="/login" style={{ transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.target.style.color = 'var(--pink-bubblegum)')} onMouseLeave={(e) => (e.target.style.color = 'var(--berry-muted)')}>
                ✦ Member Sign In
              </Link>
              <Link to="/register" style={{ transition: 'color 0.2s ease' }} onMouseEnter={(e) => (e.target.style.color = 'var(--pink-bubblegum)')} onMouseLeave={(e) => (e.target.style.color = 'var(--berry-muted)')}>
                ✦ Create Free Account
              </Link>
            </div>
          </div>

          {/* Platform Highlights */}
          <div>
            <h4
              style={{
                fontSize: '1.05rem',
                marginBottom: '14px',
                color: 'var(--berry-deep)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Sparkles size={16} color="var(--lavender)" />
              <span>THEATRE HIGHLIGHTS</span>
            </h4>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.9rem',
                color: 'var(--berry-muted)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={15} color="var(--strawberry)" />
                <span>Real-time seat collision locking</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={15} color="#256041" />
                <span>Instant ticket release on cancel</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={15} color="var(--pink-bubblegum)" />
                <span>Zero third-party trackers or ads</span>
              </div>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4
              style={{
                fontSize: '1.05rem',
                marginBottom: '14px',
                color: 'var(--berry-deep)',
              }}
            >
              TECH ARCHITECTURE
            </h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge-pastel badge-magenta">REACT 18</span>
              <span className="badge-pastel badge-cyan">VITE</span>
              <span className="badge-pastel badge-lavender">EXPRESS.JS</span>
              <span className="badge-pastel badge-green">MONGOOSE</span>
              <span className="badge-pastel badge-yellow">JWT AUTH</span>
            </div>
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--berry-muted)',
                marginTop: '12px',
                lineHeight: '1.5',
              }}
            >
              Vercel SPA + Render Web Service + MongoDB Atlas Cloud M0
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-rose)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.86rem',
            color: 'var(--berry-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>© 2026 IMovies 🎀 Designed with</span>
            <Heart size={14} fill="var(--strawberry)" color="var(--strawberry)" />
            <span>in Pastel Bubblegum & Y2K Aesthetic.</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              background: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-rose)',
            }}
          >
            <span>POPCORN & CANDY READY 🍿🍬</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
