import React from 'https://esm.sh/react@18.2.0';

export function FeaturedSongs({ songs, currentSong, isPlaying, onSelectSong }) {
  const featuredList = songs.filter((s) => s.featured);

  return (
    <section id="featured" className="py-24 relative" style={{ padding: '6rem 0' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>✨</span>
            <span>শারদ স্মারক • Featured Gems</span>
          </div>
          <h2 className="section-title">Featured Puja Anthems</h2>
          <p className="section-subtitle-bengali">
            বাছাই করা সেরা পুজোর গান ও অবিস্মরণীয় স্মৃতি
          </p>
          <div className="ornament-divider">
            <span>🪔</span>
          </div>
        </div>

        {/* Featured Songs Grid */}
        <div className="featured-grid">
          {featuredList.map((song) => {
            const isThisPlaying = currentSong?.id === song.id && isPlaying;
            const isThisActive = currentSong?.id === song.id;

            return (
              <div
                key={song.id}
                className={`featured-card ${isThisActive ? 'pulse-playing' : ''}`}
                onClick={() => onSelectSong(song)}
              >
                {/* Thumbnail Image Container */}
                <div className="featured-card-thumb-wrap">
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="featured-card-thumb"
                  />
                  <div className="featured-card-overlay"></div>
                  
                  {/* Category Tag */}
                  <span className="featured-card-tag">
                    {song.tag}
                  </span>

                  {/* Play Action Button */}
                  <button
                    className="featured-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectSong(song);
                    }}
                    title={isThisPlaying ? 'Pause' : 'Play song'}
                    aria-label={`Play ${song.title}`}
                  >
                    <span>{isThisPlaying ? '⏸' : '▶'}</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="featured-card-body">
                  <h3 className="featured-song-title">
                    {song.bengaliTitle}
                  </h3>
                  <p className="featured-song-artist">
                    {song.bengaliArtist || song.artist}
                  </p>
                  
                  {song.lyricsExcerpt && (
                    <p className="featured-song-quote">
                      "{song.lyricsExcerpt}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
