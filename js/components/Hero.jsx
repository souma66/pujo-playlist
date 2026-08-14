import React from 'https://esm.sh/react@18.2.0';

export function Hero({ onPlayPlaylist, onExploreSongs, isPlaying }) {
  return (
    <section id="hero" className="hero-section">
      {/* Cinematic Fullscreen Background Image */}
      <div className="hero-background-wrapper">
        <img
          src="/images/hero.jpg"
          alt="Durga Puja Bengali Celebration"
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Festive Badge */}
        <div className="hero-tagline-badge">
          <span>🪔</span>
          <span>শারদোৎসব ২০২৬ • সুরের মহা-আয়োজন</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-main-title gold-gradient-text">
          PUJO PLAYLIST
        </h1>

        {/* Bengali Subtitle */}
        <h2 className="hero-subtitle-bengali">
          শারদীয়ার সুরে, পুজোর গল্পে
        </h2>

        {/* Poetic Description */}
        <p className="hero-description font-bengali-sans">
          মহালয়ার ভোর থেকে দশমীর সিঁদুরখেলা—প্রতিটি মুহূর্তের সঙ্গী এক চিরন্তন সুর।
          আসুন পুজোর নস্টালজিয়া, ঢাকের আওয়াজ আর প্রিয় বাংলা গানের মোহময়ী জগতে।
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button
            onClick={onPlayPlaylist}
            className="btn-primary"
            id="hero-play-playlist-btn"
          >
            <span>{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause Playlist' : 'Play Playlist'}</span>
          </button>

          <a
            href="#playlist"
            onClick={onExploreSongs}
            className="btn-secondary"
            id="hero-explore-songs-btn"
          >
            <span>🎶</span>
            <span>Explore Songs</span>
          </a>
        </div>

        {/* Subtle Animated Music Waveform */}
        <div className="waveform-container" title="Audio Waveform Visualizer">
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
        </div>
      </div>
    </section>
  );
}
