import React from 'react';
import { Calendar, Clock, MapPin, XCircle, CheckCircle, Ticket, Film, Heart } from 'lucide-react';

const BookingCard = ({ booking, onCancel, isCancelling }) => {
  const isConfirmed = booking.status === 'confirmed';
  const showtime = booking.showtimeId;
  const movie = showtime?.movieId;

  const formattedDate = showtime?.date
    ? new Date(showtime.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Date Unavailable';

  return (
    <div
      className="card-ticket"
      style={{
        marginBottom: '28px',
        border: '2px solid var(--border-rose)',
        borderRadius: 'var(--radius-xl)',
        background: '#FFFFFF',
        boxShadow: 'var(--shadow-md)',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(140px, 180px) 1fr',
          minHeight: '200px',
        }}
      >
        {/* Left Ticket Stub (Poster & Status) */}
        <div
          style={{
            background: 'linear-gradient(180deg, var(--pink-blush) 0%, #FFF5FA 100%)',
            borderRight: '2px dashed var(--border-rose)',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Top Notch Cutout */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '20px',
              height: '20px',
              background: 'var(--bg-milky)',
              borderBottom: '2px solid var(--border-rose)',
              borderRadius: '50%',
              zIndex: 3,
            }}
          />
          {/* Bottom Notch Cutout */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              right: '-10px',
              width: '20px',
              height: '20px',
              background: 'var(--bg-milky)',
              borderTop: '2px solid var(--border-rose)',
              borderRadius: '50%',
              zIndex: 3,
            }}
          />

          {/* Mini Poster Thumbnail */}
          <div
            style={{
              width: '80px',
              height: '110px',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              border: '1.5px solid var(--border-rose)',
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '12px',
              backgroundColor: '#FFFFFF',
            }}
          >
            <img
              src={movie?.posterUrl}
              alt={movie?.title || 'Film'}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=400&q=80';
              }}
            />
          </div>

          {/* Status Badge */}
          <span
            className={`badge-pastel ${isConfirmed ? 'badge-green' : 'badge-red'}`}
            style={{ fontWeight: 700, fontSize: '0.78rem' }}
          >
            {isConfirmed ? <CheckCircle size={13} /> : <XCircle size={13} />}
            <span>{isConfirmed ? 'CONFIRMED PASS' : 'CANCELLED'}</span>
          </span>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--berry-muted)',
              marginTop: '8px',
              letterSpacing: '0.5px',
            }}
          >
            #{booking._id?.slice(-6).toUpperCase()}
          </span>
        </div>

        {/* Right Ticket Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Header: Title & Total Price */}
            <div className="flex-between" style={{ flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div>
                <span className="badge-pastel badge-magenta" style={{ marginBottom: '6px' }}>
                  <Ticket size={12} /> DIGITAL CINEMA PASS
                </span>
                <h3
                  style={{
                    fontSize: '1.6rem',
                    color: 'var(--berry-deep)',
                    lineHeight: '1.2',
                  }}
                >
                  {movie?.title || 'Feature Film'}
                </h3>
              </div>

              <div
                style={{
                  textAlign: 'right',
                  background: 'linear-gradient(135deg, var(--butter-yellow), #FFF8D6)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid #F0D680',
                }}
              >
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B5200' }}>TOTAL AMOUNT</div>
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--berry-deep)',
                  }}
                >
                  ₹{booking.totalAmount}
                </div>
              </div>
            </div>

            {/* Ticket Info Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '14px',
                background: 'var(--pink-blush)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-rose)',
                marginBottom: '18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={17} color="var(--pink-bubblegum)" />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--berry-muted)' }}>DATE</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--berry-deep)' }}>{formattedDate}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={17} color="var(--pink-bubblegum)" />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--berry-muted)' }}>TIME</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--berry-deep)' }}>{showtime?.time || 'N/A'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={17} color="var(--pink-bubblegum)" />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--berry-muted)' }}>AUDITORIUM</div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--berry-deep)' }}>{showtime?.hall || 'Screen 1'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Ticket size={17} color="var(--pink-bubblegum)" />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--berry-muted)' }}>SEATS ({booking.seats.length})</div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '2px' }}>
                    {booking.seats.map((seat) => (
                      <span key={seat} className="badge-pastel badge-magenta" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          {isConfirmed && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '8px' }}>
              <button
                onClick={() => onCancel(booking._id)}
                disabled={isCancelling}
                className="btn-pastel btn-sm btn-strawberry"
              >
                <XCircle size={15} />
                <span>{isCancelling ? 'RELEASING SEATS...' : 'CANCEL BOOKING'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
