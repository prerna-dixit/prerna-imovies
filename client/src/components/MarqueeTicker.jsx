import React from 'react';
import { Heart, Sparkles, Popcorn, Film, Ticket } from 'lucide-react';

const MarqueeTicker = () => {
  const items = [
    { text: 'your next comfort movie awaits', icon: '💖' },
    { text: 'popcorn, pink skies & movie nights', icon: '🍿' },
    { text: 'a little movie magic, just for you', icon: '🎀' },
    { text: 'boutique auditorium seats', icon: '✨' },
    { text: 'collectible digital passes', icon: '🎟️' },
    { text: 'zero ads, pure cinema bliss', icon: '🍬' },
  ];

  return (
    <div className="marquee-container" aria-label="Cinema Highlights Ribbon">
      <div className="marquee-track">
        {/* First copy for continuous marquee */}
        <div className="marquee-content">
          {items.map((item, idx) => (
            <span key={`ticker-1-${idx}`} className="marquee-item">
              <span>{item.icon}</span>
              <span>{item.text}</span>
              <span className="marquee-separator">✦</span>
            </span>
          ))}
        </div>
        {/* Second copy for continuous seamless loop */}
        <div className="marquee-content" aria-hidden="true">
          {items.map((item, idx) => (
            <span key={`ticker-2-${idx}`} className="marquee-item">
              <span>{item.icon}</span>
              <span>{item.text}</span>
              <span className="marquee-separator">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTicker;
