import React, { useState } from 'https://esm.sh/react@18.2.0';

export function PlaylistSection({ songs, currentSong, isPlaying, onSelectSong }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = songs.filter((song) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      song.title.toLowerCase().includes(q) ||
      song.bengaliTitle.includes(q) ||
      song.artist.toLowerCase().includes(q) ||
      song.bengaliArtist.includes(q) ||
      (song.tag && song.tag.includes(q))
    );
  });

  return (
    <section id="playlist" className="section-padded">
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>🎶</span>
            <span>গানের সম্পূর্ণ সূচি • Tracklist Browser</span>
          </div>
          <h2 className="section-title">Pujo Playlist Tracks</h2>
          <p className="section-subtitle-bengali">
            যে কোনো গানে ক্লিক করে সরাসরি শুনুন ও উপভোগ করুন
          </p>
          <div className="ornament-divider">
            <span>🪔</span>
          </div>
        </div>

        {/* Playlist Container Card */}
        <div className="playlist-container">
          {/* Header Bar: Search & Count */}
          <div className="playlist-header-bar">
            <div className="playlist-count-info">
              <span className="playlist-count-badge">
                {filteredSongs.length} {filteredSongs.length === 1 ? 'Track' : 'Tracks'}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Playlist ID: PLJXc1t4LYwA0
              </span>
            </div>

            {/* Search Input */}
            <div className="playlist-search-wrap">
              <input
                type="text"
                placeholder="গান বা শিল্পীর নাম খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="playlist-search-input"
                aria-label="Search songs by title or artist"
              />
              <span className="playlist-search-icon">
                🔍
              </span>
            </div>
          </div>

          {/* Song List */}
          <div className="playlist-table">
            {filteredSongs.map((song, index) => {
              const isThisSong = currentSong?.id === song.id;
              const isThisPlaying = isThisSong && isPlaying;

              return (
                <div
                  key={song.id}
                  className={`playlist-item ${isThisSong ? 'active' : ''}`}
                  onClick={() => onSelectSong(song)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play ${song.bengaliTitle}`}
                >
                  {/* Index / Active Animated Equalizer */}
                  <div className="playlist-item-index">
                    {isThisPlaying ? (
                      <div className="eq-bars">
                        <div className="eq-bar"></div>
                        <div className="eq-bar"></div>
                        <div className="eq-bar"></div>
                      </div>
                    ) : (
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div className="playlist-thumb-wrap">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="playlist-item-thumb"
                      loading="lazy"
                    />
                    {isThisPlaying && (
                      <div className="playlist-thumb-overlay">
                        <span>▶</span>
                      </div>
                    )}
                  </div>

                  {/* Track Info */}
                  <div className="playlist-item-info">
                    <span className="playlist-item-title">
                      {song.bengaliTitle}
                    </span>
                    <span className="playlist-item-artist">
                      {song.bengaliArtist || song.artist}
                    </span>
                  </div>

                  {/* Tag */}
                  <div className="playlist-item-tag">
                    {song.tag}
                  </div>

                  {/* Duration & Play Action */}
                  <div className="playlist-item-right">
                    <span className="playlist-item-duration">
                      {song.duration || 'Full Audio'}
                    </span>
                    <button
                      className="playlist-row-play-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSong(song);
                      }}
                      title={isThisPlaying ? 'Pause' : 'Play Track'}
                      aria-label={isThisPlaying ? 'Pause' : 'Play'}
                    >
                      {isThisPlaying ? '⏸' : '▶'}
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredSongs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
                <p style={{ fontFamily: 'var(--font-bengali-sans)', fontSize: '1.1rem' }}>
                  কোনো গান খুঁজে পাওয়া যায়নি
                </p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
                  অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে সন্ধান করুন
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

