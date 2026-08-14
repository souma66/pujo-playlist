import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';

export function Navbar({ currentSong, isPlaying, onTogglePlay, isDhakPlaying, onToggleDhak }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'YouTube Stage', href: '#stage' },
    { name: 'Playlist', href: '#playlist' },
    { name: 'Featured', href: '#featured' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Pujo Experience', href: '#experience' },
    { name: 'About', href: '#about' }
  ];

  return (
    <header className={`navbar-fixed ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container-custom nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="nav-brand" aria-label="Pujo Playlist Home">
          <div className="nav-logo-emblem">
            <span>🪔</span>
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-title gold-gradient-text">PUJO PLAYLIST</span>
            <span className="nav-brand-sub">শারদীয়ার সুরে, পুজোর গল্পে</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}

          {/* Interactive Dhak Sound Toggle in Navbar */}
          <button
            onClick={onToggleDhak}
            className={`btn-secondary ${isDhakPlaying ? 'pulse-playing' : ''}`}
            style={{ padding: '0.4rem 0.95rem', fontSize: '0.82rem', minHeight: '36px' }}
            title="Toggle Traditional Live Dhak Percussion Beats"
            aria-label="Toggle Dhak Rhythm"
          >
            <span>🥁</span>
            <span>{isDhakPlaying ? 'ঢাক বাজছে...' : 'ঢাকের বোল'}</span>
          </button>
        </nav>

        {/* Mobile Quick Controls */}
        <div className="nav-mobile-actions">
          <button
            onClick={onToggleDhak}
            className={`btn-secondary ${isDhakPlaying ? 'pulse-playing' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', minHeight: '36px', display: 'flex', alignItems: 'center' }}
            title="Dhak Beat"
            aria-label="Toggle Live Dhak"
          >
            <span>🥁</span>
          </button>
          
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close Menu" : "Open Navigation Menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer with Backdrop */}
      {mobileOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>🪔</span>
                <span className="gold-gradient-text" style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '0.95rem' }}>PUJO PLAYLIST</span>
              </div>
              <button
                className="mobile-drawer-close-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>
            <div className="mobile-drawer-links">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(212, 175, 55, 0.15)' }}>
              <button
                onClick={() => { onToggleDhak(); setMobileOpen(false); }}
                className={`btn-primary ${isDhakPlaying ? 'pulse-playing' : ''}`}
                style={{ width: '100%', fontSize: '0.88rem' }}
              >
                <span>🥁</span>
                <span>{isDhakPlaying ? 'ঢাক বন্ধ করুন (Stop Dhak)' : 'ঢাকের বোল শুনুন (Play Live Dhak)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

