import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import BookingCard from '../components/BookingCard';
import { Ticket, RefreshCw, AlertCircle, Film, ArrowRight, Sparkles } from 'lucide-react';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/bookings/me');
      if (res.data.success) {
        setBookings(res.data.bookings || []);
      } else {
        setError('Failed to fetch your bookings.');
      }
    } catch (err) {
      console.error('Fetch bookings error:', err);
      setError('Could not load your cinema bookings. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking? The reserved seats will immediately be released back to the auditorium.'
    );
    if (!confirmed) return;

    setCancellingId(bookingId);
    setFeedbackMessage(null);

    try {
      const res = await api.patch(`/bookings/${bookingId}/cancel`);
      if (res.data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? res.data.booking : b))
        );
        setFeedbackMessage({
          type: 'success',
          text: 'Booking cancelled successfully. Your seats have been released back to the auditorium.',
        });
      }
    } catch (err) {
      console.error('Cancel booking error:', err);
      const msg = err.response?.data?.message || 'Failed to cancel booking.';
      setFeedbackMessage({ type: 'error', text: msg });
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div style={{ maxWidth: '940px', margin: '0 auto' }}>
      {/* Header */}
      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div>
          <h1 className="section-title">
            <Ticket size={22} color="var(--pink-bubblegum)" />
            <span>MY CINEMA PASSES</span>
            <span style={{ fontSize: '1.2rem' }}>🎀</span>
          </h1>
          <p className="section-subtitle">
            <span>✦</span> Manage your digital cinema tickets and auditorium bookings
          </p>
        </div>

        <button
          onClick={fetchBookings}
          className="btn-pastel btn-sm btn-outline"
          disabled={loading}
        >
          <RefreshCw size={14} className={loading ? 'spin-icon' : ''} color="var(--pink-bubblegum)" />
          <span>REFRESH PASSES</span>
        </button>
      </div>

      {/* Feedback Messages */}
      {feedbackMessage && (
        <div
          className={`alert-pastel ${
            feedbackMessage.type === 'success' ? 'alert-success' : 'alert-error'
          }`}
        >
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {error && (
        <div className="alert-pastel alert-error" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AlertCircle size={20} color="var(--strawberry)" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div
            className="card-pastel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '24px 36px',
              borderRadius: 'var(--radius-pill)',
              background: '#FFFFFF',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <RefreshCw size={22} className="spin-icon" color="var(--pink-bubblegum)" />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', color: 'var(--berry-deep)' }}>
              Retrieving your cinema passes... 🍬
            </span>
          </div>
        </div>
      ) : bookings.length === 0 ? (
        /* Empty State */
        <div
          className="card-pastel"
          style={{
            padding: '64px 24px',
            textAlign: 'center',
            background: '#FFFFFF',
            border: '2px solid var(--border-rose)',
            borderRadius: 'var(--radius-xl)',
            maxWidth: '560px',
            margin: '0 auto',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--pink-blush), var(--pink-cotton))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto',
              color: 'var(--pink-bubblegum)',
              border: '2px solid var(--border-rose)',
            }}
          >
            <Ticket size={34} />
          </div>

          <h2 style={{ fontSize: '1.9rem', marginBottom: '12px', color: 'var(--berry-deep)' }}>
            NO PASSES RESERVED YET 🎀
          </h2>
          <p
            style={{
              color: 'var(--berry-muted)',
              maxWidth: '440px',
              margin: '0 auto 28px auto',
              lineHeight: '1.6',
            }}
          >
            You have not booked any movie tickets yet. Browse currently showing
            films, select your cozy armchair, and collect your first digital pass!
          </p>
          <Link to="/" className="btn-pastel btn-bubblegum btn-lg">
            <span>EXPLORE NOW SHOWING</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        /* Bookings List */
        <div>
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancelBooking}
              isCancelling={cancellingId === booking._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
