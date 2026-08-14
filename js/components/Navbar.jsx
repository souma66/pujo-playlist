import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';

export function Navbar({ currentSong, isPlaying, onTogglePlay, isDhakPlaying, onToggleDhak }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Featured', href: '#featured' },
    { name: 'Playlist', href: '#playlist' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Pujo Experience', href: '#experience' },
    { name: 'About', href: '#about' }
  ];

  return (
    <header className={`navbar-fixed ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container-custom nav-container">
        {/* Brand Logo */}
        <a href="#hero" className="nav-brand">
          <div className="nav-logo-emblem">
            <span>🪔</span>
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-title gold-gradient-text">PUJO PLAYLIST</span>
            <span className="nav-brand-sub">শারদীয়ার সুরে, পুজোর গল্পে</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}

          {/* Interactive Dhak Sound Toggle in Navbar */}
          <button
            onClick={onToggleDhak}
            className={`btn-secondary ${isDhakPlaying ? 'pulse-playing' : ''}`}
            style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
            title="Toggle Live Dhak Percussion Beats"
          >
            <span>🥁</span>
            <span>{isDhakPlaying ? 'ঢাক বাজছে...' : 'ঢাকের বোল'}</span>
          </button>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={onToggleDhak}
            className={`btn-secondary ${isDhakPlaying ? 'pulse-playing' : ''}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', display: 'flex' }}
            title="Dhak Beat"
          >
            <span>🥁</span>
          </button>
          
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="mobile-menu-drawer">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '1.05rem', padding: '0.5rem 0' }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
