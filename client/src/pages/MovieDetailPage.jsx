import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Clock, Star, Calendar, MapPin, ChevronRight, AlertCircle, RefreshCw, Film, Ticket, Sparkles, ArrowLeft } from 'lucide-react';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/movies/${id}`);
        if (res.data.success) {
          setMovie(res.data.movie);
          setShowtimes(res.data.showtimes || []);
        } else {
          setError('Movie not found in theatre database.');
        }
      } catch (err) {
        console.error('Fetch movie details error:', err);
        setError('Failed to load movie information. Please retry.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <div
          className="card-pastel"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            padding: '24px 40px',
            borderRadius: 'var(--radius-pill)',
            background: '#FFFFFF',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <RefreshCw size={22} className="spin-icon" color="var(--pink-bubblegum)" />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--berry-deep)' }}>
            Retrieving cinema details... 🎀
          </span>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div style={{ maxWidth: '560px', margin: '40px auto', textAlign: 'center' }}>
        <div className="alert-pastel alert-error" style={{ display: 'block', padding: '32px 24px' }}>
          <AlertCircle size={32} color="var(--strawberry)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{error || 'Movie Not Found'}</h3>
          <p style={{ color: 'var(--berry-muted)', marginBottom: '20px' }}>
            The requested film could not be retrieved from the auditorium schedule.
          </p>
          <Link to="/" className="btn-pastel btn-bubblegum">
            <ArrowLeft size={16} />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-heading)',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--berry-muted)',
          marginBottom: '24px',
        }}
      >
        <Link to="/" style={{ color: 'var(--pink-bubblegum)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <Film size={14} />
          <span>MOVIES</span>
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--berry-deep)' }}>{movie.title}</span>
      </div>

      {/* Main Movie Hero Editorial Section */}
      <div
        className="card-pastel"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          padding: 'clamp(24px, 4vw, 40px)',
          marginBottom: '48px',
          background: '#FFFFFF',
          border: '2px solid var(--border-rose)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Poster Artwork */}
        <div
          style={{
            height: '440px',
            border: '2px solid var(--border-rose)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
            backgroundColor: 'var(--pink-blush)',
            position: 'relative',
          }}
        >
          <img
            src={movie.posterUrl}
            alt={movie.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        {/* Details & Editorial Info */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Metadata Chips */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span className="badge-pastel badge-magenta">{movie.genre}</span>
            <span className="badge-pastel badge-cyan">{movie.language || 'English'}</span>
            <span className="badge-pastel badge-green">
              <Sparkles size={12} /> IN THEATRES NOW
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              marginBottom: '14px',
              color: 'var(--berry-deep)',
              lineHeight: '1.2',
            }}
          >
            {movie.title}
          </h1>

          {/* Stats Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.95rem',
              fontWeight: 600,
              marginBottom: '20px',
              paddingBottom: '16px',
              borderBottom: '1px solid var(--border-rose)',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--berry-muted)' }}>
              <Clock size={17} color="var(--pink-bubblegum)" />
              <span>{movie.duration} MINUTES</span>
            </div>
            
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'linear-gradient(135deg, var(--butter-yellow), #FFF8D6)',
                border: '1.5px solid #F0D680',
                borderRadius: 'var(--radius-pill)',
                padding: '4px 12px',
                color: '#5E4600',
                fontWeight: 700,
              }}
            >
              <Star size={15} fill="#5E4600" color="#5E4600" />
              <span>{movie.rating ? `${movie.rating} / 10` : 'N/A'}</span>
            </div>
          </div>

          {/* Synopsis */}
          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                fontSize: '1rem',
                marginBottom: '8px',
                color: 'var(--berry-deep)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>✦ SYNOPSIS</span>
            </h4>
            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: '1.65',
                color: 'var(--berry-muted)',
              }}
            >
              {movie.description || 'No synopsis available for this feature film.'}
            </p>
          </div>

          {/* Release Date Chip */}
          <div
            style={{
              marginTop: 'auto',
              background: 'var(--pink-blush)',
              padding: '12px 18px',
              border: '1.5px solid var(--border-rose)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--berry-deep)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Calendar size={16} color="var(--pink-bubblegum)" />
            <span>Official Premiere: {new Date(movie.releaseDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Showtimes Section */}
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h2 className="section-title">
            <Ticket size={22} color="var(--pink-bubblegum)" />
            <span>AVAILABLE AUDITORIUM SHOWTIMES</span>
            <span style={{ fontSize: '1.2rem' }}>🎟️</span>
          </h2>
          <p className="section-subtitle">
            <span>✦</span> Pick your preferred screening slot to view the interactive boutique seat map
          </p>
        </div>

        {showtimes.length === 0 ? (
          <div
            className="card-pastel"
            style={{ padding: '40px', textAlign: 'center', background: '#FFFFFF' }}
          >
            <h3 style={{ fontSize: '1.4rem', color: 'var(--berry-deep)', marginBottom: '8px' }}>
              NO SCHEDULED SHOWTIMES FOUND 🎀
            </h3>
            <p style={{ color: 'var(--berry-muted)' }}>
              Please check back soon for newly scheduled auditoriums for this feature.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {showtimes.map((st) => {
              const availableSeatsCount = st.totalSeats - (st.bookedSeats?.length || 0);
              const showDate = new Date(st.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              });

              return (
                <div
                  key={st._id}
                  className="card-ticket"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#FFFFFF',
                    border: '2px solid var(--border-rose)',
                  }}
                >
                  <div>
                    {/* Header: Date + Seats Availability */}
                    <div className="flex-between" style={{ marginBottom: '14px' }}>
                      <span className="badge-pastel badge-magenta">{showDate}</span>
                      <span
                        className={`badge-pastel ${
                          availableSeatsCount <= 5 ? 'badge-red' : 'badge-green'
                        }`}
                      >
                        {availableSeatsCount} SEATS LEFT
                      </span>
                    </div>

                    {/* Showtime Time */}
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '2.1rem',
                        fontWeight: 700,
                        color: 'var(--berry-deep)',
                        marginBottom: '8px',
                      }}
                    >
                      {st.time}
                    </div>

                    {/* Auditorium Hall */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--berry-muted)',
                        marginBottom: '18px',
                      }}
                    >
                      <MapPin size={16} color="var(--pink-bubblegum)" />
                      <span>{st.hall}</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div>
                    <div
                      className="flex-between"
                      style={{
                        marginBottom: '16px',
                        paddingTop: '14px',
                        borderTop: '2px dashed var(--border-rose)',
                      }}
                    >
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--berry-muted)' }}>
                        SEAT PASS
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.45rem',
                          fontWeight: 700,
                          color: 'var(--strawberry)',
                        }}
                      >
                        ₹{st.price}
                      </span>
                    </div>

                    <Link
                      to={`/book/${st._id}`}
                      className="btn-pastel btn-bubblegum"
                      style={{ width: '100%', padding: '11px 20px' }}
                    >
                      <Ticket size={16} />
                      <span>SELECT SEATS</span>
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
