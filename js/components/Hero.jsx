import React from 'https://esm.sh/react@18.2.0';

export function Hero({ onPlayPlaylist, onExploreSongs, isPlaying }) {
  return (
    <section id="hero" className="hero-section">
      {/* Cinematic Background Image with tuned visibility */}
      <div className="hero-background-wrapper">
        <img
          src="/images/hero.jpg"
          alt="Durga Puja Bengali Celebration Idol"
          className="hero-bg-image"
          fetchPriority="high"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Festive Badge */}
        <div className="hero-tagline-badge">
          <span>🪔</span>
          <span>আশ্বিনের শারদোৎসব • চিরন্তন শারদ সুর</span>
        </div>

        {/* Main Title */}
        <h1 className="hero-main-title gold-gradient-text">
          PUJO PLAYLIST
        </h1>

        {/* Bengali Subtitle */}
        <h2 className="hero-subtitle-bengali">
          শারদীয়ার সুরে, পুজোর গল্পে
        </h2>

        {/* Poetic Bengali Description */}
        <p className="hero-description font-bengali-sans">
          মহালয়ার পুণ্য প্রভাত থেকে বিজয়ার সিঁদুরখেলা—শরতের প্রতিটি পল জড়িয়ে থাকে এক চিরন্তন সুরের মায়ায়। আশ্বিনের শিউলিভেজা সকাল, কাশফুলের দোলা আর ঢাকের গম্ভীর বোলে ফিরে আসুক আপনার প্রিয় শৈশবের অমলিন শারদ স্মৃতি।
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button
            onClick={onPlayPlaylist}
            className="btn-primary hero-btn-play"
            id="hero-play-playlist-btn"
          >
            <span className="btn-icon">{isPlaying ? '⏸' : '▶'}</span>
            <span>{isPlaying ? 'Pause Playlist' : 'Play Pujo Playlist'}</span>
          </button>

          <a
            href="#playlist"
            onClick={onExploreSongs}
            className="btn-secondary hero-btn-explore"
            id="hero-explore-songs-btn"
          >
            <span className="btn-icon">🎶</span>
            <span>Browse All Songs</span>
          </a>
        </div>

        {/* Subtle Animated Music Waveform */}
        <div className="waveform-container" title="Festive Soundwave Indicator">
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
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
        </div>
      </div>
    </section>
  );
}

