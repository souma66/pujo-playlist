import React, { useState } from 'https://esm.sh/react@18.2.0';

export function PlaylistSection({ songs, currentSong, isPlaying, onSelectSong }) {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'Agomoni / Mahalaya', 'Festive Beats', 'Golden Nostalgia', 'Pandal Hopping'];

  const filteredSongs = songs.filter((song) => {
    const matchesCategory = filterCategory === 'ALL' || song.category.includes(filterCategory) || song.category === filterCategory;
    const matchesSearch =
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.bengaliTitle.includes(searchQuery) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.bengaliArtist.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="playlist" className="py-24 relative" style={{ padding: '6rem 0' }}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span>🎶</span>
            <span>শারদীয় গানের ভাণ্ডার • Curated Tracklist</span>
          </div>
          <h2 className="section-title">The Complete Pujo Playlist</h2>
          <p className="section-subtitle-bengali">
            মহালয়া থেকে দশমী—হৃদয় ছোঁয়া বাংলা গানের অনন্য সংকলন
          </p>
          <div className="ornament-divider">
            <span>🪔</span>
          </div>
        </div>

        {/* Playlist Container Card */}
        <div className="playlist-container">
          {/* Header Bar: Search & Categories */}
          <div className="playlist-header-bar">
            <div className="playlist-count-info">
              <span className="playlist-count-badge">
                {filteredSongs.length} {filteredSongs.length === 1 ? 'Track' : 'Tracks'}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                YouTube Audio Stream
              </span>
            </div>

            {/* Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
              <input
                type="text"
                placeholder="গান বা শিল্পীর নাম খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem 0.5rem 2.2rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(9, 7, 9, 0.7)',
                  border: '1px solid var(--gold-border)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  fontFamily: 'var(--font-bengali-sans)'
                }}
              />
              <span style={{ position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-radiant)' }}>
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
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="playlist-item-thumb"
                  />

                  {/* Track Info */}
                  <div className="playlist-item-info">
                    <span className="playlist-item-title">
                      {song.bengaliTitle}
                    </span>
                    <span className="playlist-item-artist">
                      {song.bengaliArtist || song.artist}
                    </span>
                  </div>

                  {/* Tag (Hidden on small mobile) */}
                  <div className="playlist-item-tag">
                    {song.tag}
                  </div>

                  {/* Duration & Play Action */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.8rem' }}>
                    <span className="playlist-item-duration">
                      {song.duration}
                    </span>
                    <button
                      className="player-ctrl-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSong(song);
                      }}
                      title={isThisPlaying ? 'Pause' : 'Play'}
                      aria-label="Play song"
                      style={{ color: isThisSong ? 'var(--gold-primary)' : 'inherit' }}
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
                  কোনো গান খুঁজে পাওয়া যায়নি
                </p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
                  অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে সন্ধান করুন
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
