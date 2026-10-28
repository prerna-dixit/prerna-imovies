import React from 'react';
import '../styles/seat-grid.css';
import { Sparkles, Armchair, Check, X } from 'lucide-react';

const SeatGrid = ({
  bookedSeats = [],
  selectedSeats = [],
  onSeatToggle,
}) => {
  // 5 rows (A-E) x 8 columns = 40 seats
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];

  const isBooked = (seatId) => bookedSeats.includes(seatId);
  const isSelected = (seatId) => selectedSeats.includes(seatId);

  return (
    <div className="seat-selection-container">
      {/* Curved Glowing Silver Screen */}
      <div className="theatre-screen-wrapper">
        <div className="theatre-screen">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <span>✨</span> CURVED SILVER SCREEN <span>🎀</span>
          </span>
          <div className="screen-curve"></div>
        </div>
        <p className="screen-caption">
          <span>🍿</span> Eyes front towards the auditorium screen
        </p>
      </div>

      {/* Main Seat Map Card */}
      <div className="seat-map-card">
        <div className="seat-map-container" role="region" aria-label="Auditorium Seat Map">
          {rows.map((row) => (
            <div key={row} className="seat-row">
              <span className="row-label" aria-hidden="true">{row}</span>

              <div className="seats-in-row">
                {columns.map((col) => {
                  const seatId = `${row}${col}`;
                  const booked = isBooked(seatId);
                  const selected = isSelected(seatId);

                  let seatClass = 'seat-btn available';
                  if (booked) seatClass = 'seat-btn booked';
                  else if (selected) seatClass = 'seat-btn selected';

                  return (
                    <React.Fragment key={seatId}>
                      <button
                        type="button"
                        className={seatClass}
                        disabled={booked}
                        onClick={() => onSeatToggle(seatId)}
                        aria-pressed={selected}
                        aria-disabled={booked}
                        title={`Seat ${seatId} — ${
                          booked ? 'Already Reserved (Unavailable)' : selected ? 'Selected (Click to deselect)' : 'Available (Click to select)'
                        }`}
                      >
                        {selected ? (
                          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
                            <span>{seatId}</span>
                          </span>
                        ) : (
                          seatId
                        )}
                      </button>

                      {/* Visually distinct aisle gap between column 4 and 5 */}
                      {col === 4 && <div className="seat-aisle-gap" aria-hidden="true" />}
                    </React.Fragment>
                  );
                })}
              </div>

              <span className="row-label" aria-hidden="true">{row}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-indicator legend-available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-indicator legend-selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="legend-indicator legend-booked"></div>
            <span>Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
