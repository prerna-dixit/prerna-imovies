import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Ticket, Sparkles } from 'lucide-react';

const MovieCard = ({ movie }) => {
  return (
    <div
      className="card-pastel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        background: '#FFFFFF',
        border: '2px solid var(--border-rose)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
      }}
    >
      {/* Poster Image Container */}
      <div
        style={{
          width: '100%',
          height: '340px',
          overflow: 'hidden',
          borderBottom: '2px solid var(--border-rose)',
          position: 'relative',
          backgroundColor: 'var(--pink-blush)',
          borderRadius: '22px 22px 0 0',
        }}
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.35s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Floating Rating Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'linear-gradient(135deg, var(--butter-yellow), #FFF8D6)',
            border: '1.5px solid #F0D680',
            borderRadius: 'var(--radius-pill)',
            boxShadow: 'var(--shadow-sm)',
            padding: '5px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.86rem',
            fontWeight: 700,
            color: '#5E4600',
          }}
        >
          <Star size={14} fill="#5E4600" color="#5E4600" />
          <span>{movie.rating ? `${movie.rating}/10` : 'N/A'}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div
        style={{
          padding: '22px 20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Genre & Language Chips */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <span className="badge-pastel badge-cyan">{movie.genre}</span>
          <span className="badge-pastel badge-lavender">{movie.language || 'English'}</span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.4rem',
            marginBottom: '10px',
            lineHeight: '1.25',
            color: 'var(--berry-deep)',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {movie.title}
        </h3>

        {/* Duration */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--berry-muted)',
            marginBottom: '14px',
          }}
        >
          <Clock size={15} color="var(--pink-bubblegum)" />
          <span>{movie.duration} MIN</span>
          <span>•</span>
          <span style={{ color: 'var(--mint-deep)' }}>Now In Theatres 🎟️</span>
        </div>

        {/* Synopsis */}
        {movie.description && (
          <p
            style={{
              fontSize: '0.92rem',
              color: 'var(--berry-muted)',
              marginBottom: '20px',
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              lineHeight: '1.55',
            }}
          >
            {movie.description}
          </p>
        )}

        {/* CTA Button */}
        <Link
          to={`/movies/${movie._id}`}
          className="btn-pastel btn-bubblegum"
          style={{ width: '100%', marginTop: 'auto', padding: '11px 20px' }}
        >
          <Ticket size={16} />
          <span>SELECT SHOWTIME</span>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
