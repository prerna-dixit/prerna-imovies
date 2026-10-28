import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import SeatGrid from '../components/SeatGrid';
import { Calendar, Clock, MapPin, Check, AlertCircle, ChevronLeft, ShieldCheck, Ticket, Sparkles, RefreshCw } from 'lucide-react';

const SeatSelectionPage = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();

  const [showtime, setShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fetchShowtime = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/showtimes/${showtimeId}`);
      if (res.data.success) {
        setShowtime(res.data.showtime);
      } else {
        setError('Showtime could not be loaded.');
      }
    } catch (err) {
      console.error('Fetch showtime error:', err);
      setError('Failed to fetch auditorium showtime details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShowtime();
  }, [showtimeId]);

  const handleSeatToggle = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      setError('Please tap at least one available seat to reserve.');
      return;
    }

    setBookingLoading(true);
    setError(null);

    try {
      const res = await api.post('/bookings', {
        showtimeId: showtime._id,
        seats: selectedSeats,
      });

      if (res.data.success) {
        setBookingSuccess(true);
        setTimeout(() => {
          navigate('/my-bookings');
        }, 1200);
      }
    } catch (err) {
      console.error('Booking creation error:', err);
      const msg = err.response?.data?.message || 'Failed to complete booking.';
      setError(msg);
      // Refresh showtime to update bookedSeats in real-time
      fetchShowtime();
    } finally {
      setBookingLoading(false);
    }
  };

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
            Loading auditorium seat layout... 🍬
          </span>
        </div>
      </div>
    );
  }

  if (!showtime) {
    return (
      <div style={{ maxWidth: '560px', margin: '40px auto', textAlign: 'center' }}>
        <div className="alert-pastel alert-error" style={{ display: 'block', padding: '32px 24px' }}>
          <AlertCircle size={32} color="var(--strawberry)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Showtime Not Found</h3>
          <p style={{ color: 'var(--berry-muted)', marginBottom: '20px' }}>
            The requested screening could not be located in the auditorium system.
          </p>
          <Link to="/" className="btn-pastel btn-bubblegum">
            <ChevronLeft size={16} />
            <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    );
  }

  const movie = showtime.movieId;
  const totalAmount = selectedSeats.length * showtime.price;
  const showDate = new Date(showtime.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div style={{ maxWidth: '940px', margin: '0 auto' }}>
      {/* Back button */}
      <div style={{ marginBottom: '20px' }}>
        <Link
          to={`/movies/${movie?._id || ''}`}
          className="btn-pastel btn-sm btn-outline"
        >
          <ChevronLeft size={16} />
          <span>BACK TO FILM DETAILS</span>
        </Link>
      </div>

      {/* Showtime Overview Banner */}
      <div
        className="card-pastel"
        style={{
          padding: '28px 32px',
          marginBottom: '32px',
          background: '#FFFFFF',
          border: '2px solid var(--border-rose)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
              <span className="badge-pastel badge-magenta">
                <Ticket size={12} /> AUDITORIUM PASS
              </span>
              <span className="badge-pastel badge-cyan">{movie?.genre || 'Feature Film'}</span>
            </div>
            
            <h1 style={{ fontSize: '2.1rem', marginBottom: '10px', color: 'var(--berry-deep)' }}>
              {movie?.title}
            </h1>

            <div
              style={{
                display: 'flex',
                gap: '18px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.92rem',
                color: 'var(--berry-muted)',
                fontWeight: 600,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="var(--pink-bubblegum)" />
                <span>{showDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} color="var(--pink-bubblegum)" />
                <span>{showtime.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="var(--pink-bubblegum)" />
                <span>{showtime.hall}</span>
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: 'right',
              background: 'linear-gradient(135deg, var(--butter-yellow), #FFF8D6)',
              padding: '14px 22px',
              border: '1.5px solid #F0D680',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6B5200', textTransform: 'uppercase' }}>
              SEAT PRICE
            </span>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--berry-deep)',
              }}
            >
              ₹{showtime.price}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="alert-pastel alert-error" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={20} color="var(--strawberry)" />
          <span>{error}</span>
        </div>
      )}

      {bookingSuccess && (
        <div className="alert-pastel alert-success" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={22} color="var(--mint-deep)" />
          <span>SEATS CONFIRMED! Generating your collectible movie passes... 🎀</span>
        </div>
      )}

      {/* Interactive Seat Grid */}
      <SeatGrid
        totalSeats={showtime.totalSeats}
        bookedSeats={showtime.bookedSeats || []}
        selectedSeats={selectedSeats}
        onSeatToggle={handleSeatToggle}
      />

      {/* Floating Bottom Booking Summary Bar */}
      <div className="booking-summary-bar">
        <div className="summary-details">
          <h4>YOUR SELECTED ARMCHAIRS</h4>
          <div className="summary-meta">
            {selectedSeats.length > 0 ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span>SEATS:</span>
                {selectedSeats.map((s) => (
                  <span key={s} className="badge-pastel badge-magenta" style={{ fontWeight: 700 }}>
                    {s}
                  </span>
                ))}
                <span>
                  ({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'} × ₹{showtime.price})
                </span>
              </span>
            ) : (
              <span>Tap any available baby-blue armchair above to select your seat 🍬</span>
            )}
          </div>
          {selectedSeats.length > 0 && (
            <div className="summary-total">
              TOTAL DUE: ₹{totalAmount}
            </div>
          )}
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length === 0 || bookingLoading || bookingSuccess}
          className="btn-pastel btn-bubblegum btn-lg"
          style={{ minWidth: '240px' }}
        >
          <Check size={18} />
          <span>
            {bookingLoading ? 'RESERVING SEATS...' : `CONFIRM BOOKING (₹${totalAmount})`}
          </span>
        </button>
      </div>
    </div>
  );
};

export default SeatSelectionPage;
