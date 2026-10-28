import React from 'react';
import { ArrowDown, Sparkles, Heart, Ticket, Film, ShieldCheck, Zap } from 'lucide-react';

const HeroBanner = () => {
  const scrollToMovies = () => {
    const el = document.getElementById('movies-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #FFEAF5 0%, #FFF8FC 45%, #EAF5FF 100%)',
        border: '2px solid var(--border-rose)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg), 0 0 30px rgba(255, 194, 226, 0.35)',
        padding: 'clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)',
        marginBottom: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Pastel Background Circles */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 194, 226, 0.5) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '20%',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 231, 255, 0.5) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating Badges */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span className="badge-pastel badge-magenta">
          <Sparkles size={13} /> BOUTIQUE CINEMA VIBES
        </span>
        <span className="badge-pastel badge-cyan">
          <Zap size={13} /> LIVE AUDITORIUM MAP
        </span>
        <span className="badge-pastel badge-yellow">
          <Heart size={13} fill="#6B5200" /> SWEET CANDY PASSES
        </span>
      </div>

      {/* Hero Headline */}
      <h1
        style={{
          fontSize: 'clamp(2.3rem, 5.5vw, 4.2rem)',
          letterSpacing: '-1px',
          maxWidth: '920px',
          marginBottom: '20px',
          color: 'var(--berry-deep)',
          lineHeight: '1.15',
          position: 'relative',
          zIndex: 1,
        }}
      >
        FALL IN LOVE WITH <br />
        <span
          style={{
            background: 'linear-gradient(135deg, var(--pink-bubblegum), #FF5C85)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}
        >
          MOVIE NIGHT AGAIN.
        </span>{' '}
        <span style={{ fontSize: '0.85em', verticalAlign: 'middle' }}>🎀🍿</span>
      </h1>

      {/* Hero Tagline */}
      <p
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '680px',
          marginBottom: '32px',
          color: 'var(--berry-muted)',
          lineHeight: '1.65',
          fontWeight: 600,
          position: 'relative',
          zIndex: 1,
        }}
      >
        Welcome to IMovies — your dreamy pastel cinema escape. Reserve comfy
        boutique auditorium seats in seconds, discover must-watch features, and
        collect sweet digital movie tickets with zero ads.
      </p>

      {/* CTA Buttons & Trust Indicators */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <button
          onClick={scrollToMovies}
          className="btn-pastel btn-bubblegum btn-lg"
        >
          <Ticket size={20} />
          <span>EXPLORE NOW SHOWING</span>
          <ArrowDown size={18} />
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.9rem',
            color: 'var(--berry-muted)',
            fontWeight: 600,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} color="var(--pink-bubblegum)" />
            <span>Anti-collision seat locking</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={16} color="#256041" />
            <span>Instant booking & release</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
