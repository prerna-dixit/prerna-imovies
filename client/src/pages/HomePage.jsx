import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { Search, RefreshCw, AlertCircle, Film, Sparkles } from 'lucide-react';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState(['All', 'Sci-Fi', 'Action', 'Drama', 'Animation', 'Comedy']);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/movies');
      if (res.data.success) {
        setMovies(res.data.movies);
      } else {
        setError('Failed to fetch movies from server.');
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError(
        'Could not connect to the movie API. If hosted on a free Render tier, please wait 30-40 seconds for spin-up.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Filter movies based on genre and search keyword
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre === 'All' || movie.genre.toLowerCase() === selectedGenre.toLowerCase();
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div>
      <HeroBanner />

      <section id="movies-section" style={{ scrollMarginTop: '100px' }}>
        {/* Section Header & Search Field */}
        <div className="flex-between" style={{ flexWrap: 'wrap', gap: '20px', marginBottom: '28px' }}>
          <div>
            <h2 className="section-title">
              <Film size={22} color="var(--pink-bubblegum)" />
              <span>NOW SHOWING IN THEATRES</span>
              <span style={{ fontSize: '1.2rem' }}>🎀</span>
            </h2>
            <p className="section-subtitle">
              <span>✦</span> Select a film to view auditorium schedules & live seat maps
            </p>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
            <input
              type="text"
              placeholder="Search by title or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-pastel"
              style={{
                paddingLeft: '44px',
                borderRadius: 'var(--radius-pill)',
                background: '#FFFFFF',
              }}
            />
            <Search
              size={18}
              color="var(--pink-bubblegum)"
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>

        {/* Genre Filter Badges */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {genres.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`btn-pastel btn-sm ${isActive ? 'btn-bubblegum' : 'btn-outline'}`}
                style={{
                  border: isActive ? '2px solid var(--border-rose)' : '1.5px solid var(--border-rose)',
                  boxShadow: isActive ? 'var(--shadow-bubblegum)' : 'var(--shadow-sm)',
                }}
              >
                {isActive && <Sparkles size={12} />}
                <span>{genre}</span>
              </button>
            );
          })}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert-pastel alert-error" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} color="var(--strawberry)" />
              <span>{error}</span>
            </div>
            <button onClick={fetchMovies} className="btn-pastel btn-sm btn-strawberry">
              <RefreshCw size={14} /> RETRY
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '70px 20px' }}>
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
                Warming up the cinema reel... 🍬
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--berry-muted)', marginTop: '16px' }}>
              Free tier instances may take a few moments to spin up. Hang tight!
            </p>
          </div>
        ) : filteredMovies.length === 0 ? (
          /* Empty Search Results */
          <div
            className="card-pastel"
            style={{
              padding: '60px 24px',
              textAlign: 'center',
              background: '#FFFFFF',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--pink-blush)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--pink-bubblegum)',
                border: '2px solid var(--border-rose)',
              }}
            >
              <Film size={28} />
            </div>

            <h3 style={{ fontSize: '1.8rem', marginBottom: '10px', color: 'var(--berry-deep)' }}>
              NO FILMS FOUND 🎀
            </h3>
            <p style={{ color: 'var(--berry-muted)', marginBottom: '24px', lineHeight: '1.5' }}>
              We couldn't find any feature films matching "{searchTerm}" in the "{selectedGenre}" genre.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGenre('All');
              }}
              className="btn-pastel btn-bubblegum"
            >
              <RefreshCw size={15} />
              <span>RESET SEARCH & FILTERS</span>
            </button>
          </div>
        ) : (
          /* Movies Grid */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '32px',
            }}
          >
            {filteredMovies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
