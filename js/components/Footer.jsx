import React from 'https://esm.sh/react@18.2.0';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <div className="container-custom">
        {/* Festive Greeting Banner */}
        <div className="footer-festive-banner">
          <h2 className="footer-greetings-bengali">
            শুভ শারদীয়া ও শুভ বিজয়া
          </h2>
          <p style={{ fontFamily: 'var(--font-bengali-sans)', fontSize: '1.05rem', color: 'var(--gold-radiant)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            মায়ের আশীর্বাদে সবার জীবন ভরে উঠুক আনন্দ, সমৃদ্ধি, সুস্বাস্থ্য ও সুরের আলোকচ্ছটায়।
          </p>
          <div className="ornament-divider">
            <span>🪔</span>
          </div>
        </div>

        {/* Footer Navigation & Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="nav-logo-emblem">🪔</div>
              <span className="nav-brand-title gold-gradient-text" style={{ fontSize: '1.25rem' }}>PUJO PLAYLIST</span>
            </div>
            <p style={{ fontFamily: 'var(--font-bengali-sans)', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              বাঙালির প্রাণের উৎসব দুর্গাপূজা এবং তার চিরন্তন সুরের ডিজিটাল উদযাপন। শারদীয়ার গান, স্মৃতি ও সংস্কৃতির মিলনমেলা।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              QUICK NAVIGATION
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><a href="#hero" className="nav-link" style={{ fontSize: '0.9rem' }}>Home (প্রধান পাতা)</a></li>
              <li><a href="#featured" className="nav-link" style={{ fontSize: '0.9rem' }}>Featured Songs (সেরা গান)</a></li>
              <li><a href="#playlist" className="nav-link" style={{ fontSize: '0.9rem' }}>Pujo Playlist (সম্পূর্ণ প্লেলিস্ট)</a></li>
              <li><a href="#gallery" className="nav-link" style={{ fontSize: '0.9rem' }}>Gallery (শারদ চিত্রপট)</a></li>
              <li><a href="#experience" className="nav-link" style={{ fontSize: '0.9rem' }}>Pujo Experience (শারদীয় অনুভূতি)</a></li>
              <li><a href="#about" className="nav-link" style={{ fontSize: '0.9rem' }}>About (স্মৃতিকথা)</a></li>
            </ul>
          </div>

          {/* Puja Traditions */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', fontSize: '1rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              PUJO DAYS
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontFamily: 'var(--font-bengali-sans)', fontSize: '0.85rem' }}>
              <span className="playlist-item-tag" style={{ display: 'inline-block' }}>মহালয়া</span>
              <span className="playlist-item-tag" style={{ display: 'inline-block' }}>ষষ্ঠী</span>
              <span className="playlist-item-tag" style={{ display: 'inline-block' }}>মহাসপ্তমী</span>
              <span className="playlist-item-tag" style={{ display: 'inline-block' }}>মহাষ্টমী ও সন্ধিপূজা</span>
              <span className="playlist-item-tag" style={{ display: 'inline-block' }}>মহানবমী</span>
              <span className="playlist-item-tag" style={{ display: 'inline-block' }}>বিজয়া দশমী</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid rgba(212, 175, 55, 0.12)', fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
          <p>© {new Date().getFullYear()} Pujo Playlist. Crafted with love & devotion for Durga Puja celebrations worldwide.</p>
          <button
            onClick={scrollToTop}
            className="btn-secondary"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}
          >
            ↑ Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
