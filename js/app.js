// ===================================================================
// PUJO PLAYLIST - Premium Mobile-Optimized Bengali Music Portal
// Integrated with Official YouTube Pujo Playlist (PLJXc1t4LYwA0)
// ===================================================================

const { useState, useEffect, useRef, createElement: h, Fragment, memo } = React;

import { PUJO_SONGS, YOUTUBE_PLAYLIST_ID, YOUTUBE_PLAYLIST_URL } from './data/songs.js';
import { PUJO_GALLERY } from './data/galleryData.js';
import { PUJO_EXPERIENCES } from './data/experienceData.js';
import { dhakEngine } from './services/DhakAudioEngine.js';

// Global YouTube Player instance reference
let globalYTPlayer = null;

// 1. NAVBAR COMPONENT (Mobile-Optimized Sticky Bar)
function Navbar({ currentSong, isPlaying, isDhakPlaying, onToggleDhak }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
  };

  return h('header', { className: `navbar-fixed ${scrolled ? 'navbar-scrolled' : ''}` },
    h('div', { className: 'container-custom nav-container' },
      // Brand
      h('a', { href: '#hero', className: 'nav-brand' },
        h('div', { className: 'nav-logo-emblem' }, h('span', null, '🪔')),
        h('div', { className: 'nav-brand-text' },
          h('span', { className: 'nav-brand-title gold-gradient-text' }, 'PUJO PLAYLIST'),
          h('span', { className: 'nav-brand-sub' }, 'শারদীয়ার সুরে, পুজোর গল্পে')
        )
      ),

      // Desktop Nav Links
      h('nav', { className: 'nav-links-desktop' },
        navLinks.map((link) =>
          h('a', { key: link.name, href: link.href, className: 'nav-link' }, link.name)
        ),
        h('button', {
          onClick: onToggleDhak,
          className: `btn-secondary ${isDhakPlaying ? 'pulse-playing' : ''}`,
          style: { padding: '0.45rem 1rem', fontSize: '0.82rem', minHeight: '38px' },
          title: 'Toggle Traditional Live Dhak Percussion Beats'
        },
          h('span', null, '🥁'),
          h('span', null, isDhakPlaying ? 'ঢাক বাজছে...' : 'ঢাকের বোল')
        )
      ),

      // Mobile Quick Controls
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.6rem' } },
        h('button', {
          onClick: onToggleDhak,
          className: `btn-secondary ${isDhakPlaying ? 'pulse-playing' : ''}`,
          style: { padding: '0.35rem 0.75rem', fontSize: '0.75rem', minHeight: '38px', display: 'flex' },
          title: 'Dhak Beat'
        }, h('span', null, '🥁')),
        h('button', {
          className: 'nav-mobile-toggle',
          onClick: () => setMobileOpen(!mobileOpen),
          'aria-label': 'Toggle navigation menu'
        }, mobileOpen ? '✕' : '☰')
      )
    ),

    // Mobile Drawer (Auto-closes on tap)
    mobileOpen && h('div', { className: 'mobile-menu-drawer' },
      navLinks.map((link) =>
        h('a', {
          key: link.name,
          href: link.href,
          className: 'nav-link',
          onClick: handleMobileLinkClick
        }, link.name)
      )
    )
  );
}

// 2. HERO COMPONENT (Mobile-Framed)
function Hero({ onPlayPlaylist, onExploreSongs, isPlaying }) {
  return h('section', { id: 'hero', className: 'hero-section' },
    h('div', { className: 'hero-background-wrapper' },
      h('img', {
        src: '/images/hero.jpg',
        alt: 'Durga Puja Bengali Celebration',
        className: 'hero-bg-image',
        fetchPriority: 'high'
      }),
      h('div', { className: 'hero-overlay' })
    ),

    h('div', { className: 'hero-content' },
      h('div', { className: 'hero-tagline-badge' },
        h('span', null, '🪔'),
        h('span', null, 'আশ্বিনের শারদোৎসব • শারদ সুরের আসর')
      ),
      h('h1', { className: 'hero-main-title gold-gradient-text' }, 'PUJO PLAYLIST'),
      h('h2', { className: 'hero-subtitle-bengali' }, 'শারদীয়ার সুরে, পুজোর গল্পে'),
      h('p', { className: 'hero-description font-bengali-sans' },
        'মহালয়ার ভোর থেকে দশমীর সিঁদুরখেলা—প্রতিটি মুহূর্তের সঙ্গী এক চিরন্তন সুর। আশ্বিনের নীল আকাশ ও ঢাকের গম্ভীর ধ্বনিতে ফিরে আসুক আপনার প্রিয় শৈশবের সোনালী পুজো।'
      ),

      h('div', { className: 'hero-actions' },
        h('button', {
          onClick: onPlayPlaylist,
          className: 'btn-primary',
          id: 'hero-play-playlist-btn'
        },
          h('span', null, isPlaying ? '⏸' : '▶'),
          h('span', null, isPlaying ? 'Pause Playlist' : 'Play Pujo Playlist')
        ),
        h('a', {
          href: '#playlist',
          onClick: onExploreSongs,
          className: 'btn-secondary',
          id: 'hero-explore-songs-btn'
        },
          h('span', null, '🎶'),
          h('span', null, 'Browse All Songs')
        )
      ),

      // Animated Waveform
      h('div', { className: 'waveform-container', title: 'Dhak Audio Waveform' },
        Array.from({ length: 10 }).map((_, i) =>
          h('div', { key: i, className: `waveform-bar ${isPlaying ? '' : 'paused'}` })
        )
      )
    )
  );
}

// 3. PERSISTENT YOUTUBE EMBED CONTAINER
const YouTubePlayerFrame = memo(function YouTubePlayerFrame() {
  return h('div', { className: 'yt-video-frame-box' },
    h('div', { id: 'youtube-player-stage' })
  );
});

// 4. CINEMATIC YOUTUBE STAGE COMPONENT
function YouTubeStage({ currentSong, isPlaying, onTogglePlay, onNext, onPrev }) {
  return h('section', { id: 'stage', style: { padding: '4.5rem 0 2rem' } },
    h('div', { className: 'container-custom' },
      h('div', { className: 'section-header' },
        h('div', { className: 'section-badge' },
          h('span', null, '📺'),
          h('span', null, 'শারদ সুরমঞ্চ • YouTube Pujo Player')
        ),
        h('h2', { className: 'section-title' }, 'Cinematic Pujo Stage'),
        h('p', { className: 'section-subtitle-bengali' }, 'অফিশিয়াল ইউটিউব প্লেলিস্ট ও লাইভ স্ট্রিমিং'),
        h('div', { className: 'ornament-divider' }, h('span', null, '🪔'))
      ),

      h('div', { className: 'yt-stage-wrapper' },
        h('div', { className: 'yt-stage-grid' },
          // Video Frame
          h(YouTubePlayerFrame),

          // Metadata & Controls
          h('div', { className: 'yt-stage-meta' },
            h('div', { className: 'yt-live-indicator' },
              h('div', { className: `yt-live-dot ${isPlaying ? 'active' : ''}` }),
              h('span', null, isPlaying ? 'NOW PLAYING' : 'READY TO PLAY')
            ),

            h('h3', { className: 'yt-stage-title' }, currentSong.bengaliTitle),
            h('p', { className: 'yt-stage-artist' }, currentSong.bengaliArtist || currentSong.artist),
            h('p', { style: { fontFamily: 'var(--font-bengali-sans)', fontSize: '0.88rem', color: 'var(--cream-soft)', lineHeight: '1.6' } },
              currentSong.subtitle
            ),

            currentSong.lyricsExcerpt && h('div', { className: 'about-quote-box', style: { marginTop: '0.4rem', paddingLeft: '0.85rem' } },
              h('p', { style: { fontStyle: 'italic', fontSize: '0.84rem', color: 'var(--gold-light)' } },
                `"${currentSong.lyricsExcerpt}"`
              )
            ),

            h('div', { className: 'yt-stage-actions' },
              h('button', {
                onClick: onTogglePlay,
                className: 'btn-primary'
              },
                h('span', null, isPlaying ? '⏸' : '▶'),
                h('span', null, isPlaying ? 'Pause Video' : 'Play Video')
              ),

              h('button', {
                onClick: onPrev,
                className: 'btn-secondary',
                title: 'Previous Track'
              }, '⏮ Prev'),

              h('button', {
                onClick: onNext,
                className: 'btn-secondary',
                title: 'Next Track'
              }, 'Next ⏭'),

              h('a', {
                href: YOUTUBE_PLAYLIST_URL,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'btn-secondary',
                style: { color: 'var(--gold-radiant)' }
              },
                h('span', null, '↗ Open on YouTube')
              )
            )
          )
        )
      )
    )
  );
}

// 5. PLAYLIST SECTION COMPONENT (Mobile-Friendly List Rows)
function PlaylistSection({ songs, currentSong, isPlaying, onSelectSong }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = songs.filter((song) => {
    return song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.bengaliTitle.includes(searchQuery) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.bengaliArtist.includes(searchQuery);
  });

  return h('section', { id: 'playlist', style: { padding: '2.5rem 0 5.5rem' } },
    h('div', { className: 'container-custom' },
      h('div', { className: 'section-header' },
        h('div', { className: 'section-badge' },
          h('span', null, '🎶'),
          h('span', null, 'গানের সম্পূর্ণ সূচি • Tracklist Browser')
        ),
        h('h2', { className: 'section-title' }, 'Pujo Playlist Tracks'),
        h('p', { className: 'section-subtitle-bengali' }, 'যে কোনো গানে ক্লিক করে সরাসরি শুনুন ও উপভোগ করুন'),
        h('div', { className: 'ornament-divider' }, h('span', null, '🪔'))
      ),

      h('div', { className: 'playlist-container' },
        h('div', { className: 'playlist-header-bar' },
          h('div', { className: 'playlist-count-info' },
            h('span', { className: 'playlist-count-badge' }, `${filteredSongs.length} Tracks`),
            h('span', { style: { fontSize: '0.78rem', color: 'var(--text-secondary)' } }, 'Playlist ID: PLJXc1t4LYwA0')
          ),
          h('div', { style: { position: 'relative', width: '100%', maxWidth: '320px' } },
            h('input', {
              type: 'text',
              placeholder: 'গান বা শিল্পীর নাম খুঁজুন...',
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              style: {
                width: '100%',
                padding: '0.6rem 1rem 0.6rem 2.4rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(7, 5, 7, 0.85)',
                border: '1px solid var(--gold-border)',
                color: '#fff',
                fontSize: '0.88rem',
                outline: 'none',
                minHeight: '44px',
                fontFamily: 'var(--font-bengali-sans)'
              }
            }),
            h('span', { style: { position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold-radiant)' } }, '🔍')
          )
        ),

        h('div', { className: 'playlist-table' },
          filteredSongs.map((song, index) => {
            const isThisSong = currentSong?.id === song.id;
            const isThisPlaying = isThisSong && isPlaying;

            return h('div', {
              key: song.id,
              className: `playlist-item ${isThisSong ? 'active' : ''}`,
              onClick: () => onSelectSong(song)
            },
              h('div', { className: 'playlist-item-index' },
                isThisPlaying ? h('div', { className: 'eq-bars' },
                  h('div', { className: 'eq-bar' }),
                  h('div', { className: 'eq-bar' }),
                  h('div', { className: 'eq-bar' })
                ) : h('span', null, String(index + 1).padStart(2, '0'))
              ),
              h('img', {
                src: song.cover,
                alt: song.title,
                className: 'playlist-item-thumb',
                loading: 'lazy'
              }),
              h('div', { className: 'playlist-item-info' },
                h('span', { className: 'playlist-item-title' }, song.bengaliTitle),
                h('span', { className: 'playlist-item-artist' }, song.bengaliArtist || song.artist)
              ),
              h('div', { className: 'playlist-item-tag' }, song.tag),
              h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'flex-end' } },
                h('span', { className: 'playlist-item-duration' }, song.duration || 'Full Audio'),
                h('button', {
                  className: 'player-ctrl-btn',
                  onClick: (e) => { e.stopPropagation(); onSelectSong(song); },
                  style: { color: isThisSong ? 'var(--gold-primary)' : 'inherit' },
                  title: isThisPlaying ? 'Pause' : 'Play Track'
                }, isThisPlaying ? '⏸' : '▶')
              )
            );
          })
        )
      )
    )
  );
}

// 6. FEATURED SONGS COMPONENT
function FeaturedSongs({ songs, currentSong, isPlaying, onSelectSong }) {
  const featuredList = songs.filter((s) => s.featured);

  return h('section', { id: 'featured', style: { padding: '4.5rem 0' } },
    h('div', { className: 'container-custom' },
      h('div', { className: 'section-header' },
        h('div', { className: 'section-badge' },
          h('span', null, '✨'),
          h('span', null, 'শারদ স্মারক • Featured Puja Gems')
        ),
        h('h2', { className: 'section-title' }, 'Featured Puja Tracks'),
        h('p', { className: 'section-subtitle-bengali' }, 'প্লেলিস্টের সেরা ও চিরসবুজ গানসমূহ'),
        h('div', { className: 'ornament-divider' }, h('span', null, '🪔'))
      ),

      h('div', { className: 'featured-grid' },
        featuredList.map((song) => {
          const isThisPlaying = currentSong?.id === song.id && isPlaying;
          const isThisActive = currentSong?.id === song.id;

          return h('div', {
            key: song.id,
            className: `featured-card ${isThisActive ? 'pulse-playing' : ''}`,
            onClick: () => onSelectSong(song)
          },
            h('div', { className: 'featured-card-thumb-wrap' },
              h('img', {
                src: song.cover,
                alt: song.title,
                className: 'featured-card-thumb',
                loading: 'lazy'
              }),
              h('div', { className: 'featured-card-overlay' }),
              h('span', { className: 'featured-card-tag' }, song.tag),
              h('button', {
                className: 'featured-play-btn',
                onClick: (e) => { e.stopPropagation(); onSelectSong(song); },
                'aria-label': `Play ${song.title}`
              }, h('span', null, isThisPlaying ? '⏸' : '▶'))
            ),
            h('div', { className: 'featured-card-body' },
              h('h3', { className: 'featured-song-title' }, song.bengaliTitle),
              h('p', { className: 'featured-song-artist' }, song.bengaliArtist || song.artist),
              song.lyricsExcerpt && h('p', { className: 'featured-song-quote' }, `"${song.lyricsExcerpt}"`)
            )
          );
        })
      )
    )
  );
}

// 7. PUJO GALLERY COMPONENT
function PujoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSelectedPhoto(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return h('section', { id: 'gallery', style: { padding: '4.5rem 0' } },
    h('div', { className: 'container-custom' },
      h('div', { className: 'section-header' },
        h('div', { className: 'section-badge' },
          h('span', null, '🖼️'),
          h('span', null, 'শারদ চিত্রপট • Cinematic Visuals')
        ),
        h('h2', { className: 'section-title' }, 'Pujo Gallery'),
        h('p', { className: 'section-subtitle-bengali' }, 'চোখের আলোয় মায়ের দর্শন ও শারদোৎসবের নানা রঙ'),
        h('div', { className: 'ornament-divider' }, h('span', null, '🪔'))
      ),

      h('div', { className: 'gallery-grid' },
        PUJO_GALLERY.map((item) =>
          h('div', {
            key: item.id,
            className: `gallery-card ${item.span}`,
            onClick: () => setSelectedPhoto(item)
          },
            h('img', {
              src: item.image,
              alt: item.title,
              className: 'gallery-image',
              loading: 'lazy'
            }),
            h('div', { className: 'gallery-card-overlay' },
              h('span', { className: 'gallery-card-badge' }, item.tag),
              h('h3', { className: 'gallery-card-title' }, item.title),
              h('p', { className: 'gallery-card-desc' }, item.description)
            )
          )
        )
      )
    ),

    selectedPhoto && h('div', {
      className: 'lightbox-modal-backdrop',
      onClick: () => setSelectedPhoto(null)
    },
      h('div', {
        className: 'lightbox-modal-content',
        onClick: (e) => e.stopPropagation()
      },
        h('button', {
          className: 'lightbox-close-btn',
          onClick: () => setSelectedPhoto(null),
          'aria-label': 'Close image modal'
        }, '✕'),
        h('div', { className: 'lightbox-image-wrap' },
          h('img', { src: selectedPhoto.image, alt: selectedPhoto.title, className: 'lightbox-image' })
        ),
        h('div', { className: 'lightbox-details' },
          h('span', { className: 'gallery-card-badge', style: { marginBottom: '0.4rem' } }, selectedPhoto.tag),
          h('h3', { style: { fontFamily: 'var(--font-bengali-serif)', fontSize: '1.25rem', color: 'var(--cream-pure)', marginBottom: '0.3rem' } }, selectedPhoto.title),
          h('p', { style: { fontSize: '0.84rem', color: 'var(--gold-radiant)', marginBottom: '0.6rem', fontStyle: 'italic' } }, selectedPhoto.subtitle),
          h('p', { style: { fontFamily: 'var(--font-bengali-sans)', fontSize: '0.9rem', color: 'var(--cream-soft)', lineHeight: '1.65' } }, selectedPhoto.description)
        )
      )
    )
  );
}

// 8. PUJO EXPERIENCE COMPONENT
function PujoExperience({ isDhakPlaying, onToggleDhak }) {
  return h('section', { id: 'experience', style: { padding: '4.5rem 0' } },
    h('div', { className: 'container-custom' },
      h('div', { className: 'section-header' },
        h('div', { className: 'section-badge' },
          h('span', null, '🪔'),
          h('span', null, 'শারদীয় অনুভূতি • Cultural Traditions')
        ),
        h('h2', { className: 'section-title' }, 'The Pujo Experience'),
        h('p', { className: 'section-subtitle-bengali' }, 'ঢাকের কাঠি, ধুনুচি আর কাশফুলের মনমাতানো শারদ পরব'),
        h('div', { className: 'ornament-divider' }, h('span', null, '🪔'))
      ),

      h('div', { className: 'experience-grid' },
        PUJO_EXPERIENCES.map((exp) =>
          h('div', { key: exp.id, className: 'experience-card' },
            h('div', { className: 'experience-icon-wrap' }, h('span', null, exp.icon)),
            h('h3', { className: 'experience-title-bengali' }, exp.bengaliTitle),
            h('span', { className: 'experience-title-english' }, exp.englishTitle),
            h('p', { className: 'experience-desc' }, exp.description),
            h('p', { className: 'experience-detail' }, exp.detail),
            exp.hasSoundTrigger && h('button', {
              onClick: onToggleDhak,
              className: `dhak-interactive-btn ${isDhakPlaying ? 'pulse-playing' : ''}`
            },
              h('span', null, '🥁'),
              h('span', null, isDhakPlaying ? 'ঢাক বন্ধ করুন (Stop Dhak)' : 'ঢাকের তাল শুনুন (Play Live Dhak)')
            )
          )
        )
      )
    )
  );
}

// 9. ABOUT COMPONENT
function AboutSection() {
  return h('section', { id: 'about', style: { padding: '4.5rem 0' } },
    h('div', { className: 'container-custom' },
      h('div', { className: 'section-header' },
        h('div', { className: 'section-badge' },
          h('span', null, '📖'),
          h('span', null, 'আমাদের শারদ স্মৃতি • Heritage & Soul')
        ),
        h('h2', { className: 'section-title' }, 'About Pujo Playlist'),
        h('p', { className: 'section-subtitle-bengali' }, 'বাঙালির শ্রেষ্ঠ উৎসব ও সুরের চিরন্তন মেলবন্ধন'),
        h('div', { className: 'ornament-divider' }, h('span', null, '🪔'))
      ),

      h('div', { className: 'about-box' },
        h('p', { className: 'about-text-lead' }, 'দুর্গাপূজা কেবল একটি উৎসব নয়, এটি বাঙালির এক আত্মিক অনুভূতি—একটি মহাকাব্যিক নস্টালজিয়া।'),
        h('p', { className: 'about-text-body' }, 'আশ্বিনের নীল আকাশ, ভোরের শিউলি ঝরা গন্ধ, আর মহালয়ার প্রত্যুষে বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ—এই সুরেই বাঙালির পুজো শুরু হয়। ছোটবেলার নতুন জামার গন্ধ থেকে শুরু করে রাতের মণ্ডপে বন্ধুদের সঙ্গে অবিরাম আড্ডা, ফুচকার স্বাদ আর ঢাকের উন্মাদনা—পুজোর প্রতিটি মুহূর্ত জড়িয়ে থাকে কোনো না কোনো মিষ্টি সুরে।'),
        h('p', { className: 'about-text-body' }, '"Pujo Playlist" তৈরি হয়েছে সেই সমস্ত সুর ও অনুভূতিকে একসূত্রে বাঁধার উদ্দেশ্যে। দেশ বা বিদেশের যেকোনো প্রান্তেই থাকুন না কেন, এই প্লেলিস্টের একটি ক্লিক আপনাকে ফিরিয়ে নিয়ে যাবে আপনার শৈশবের পাড়ার পুজোয়, সন্ধিপূজার শান্ত আলোয়, আর ভাসানের দিনে অশ্রুসজল বিদায়লগ্নে।'),
        h('div', { className: 'about-quote-box' },
          h('p', { style: { fontFamily: 'var(--font-bengali-serif)', fontSize: '1.05rem', marginBottom: '0.35rem' } }, '"আবার আসিব ফিরে ধানসিঁড়িটির তীরে—এই বাংলায়..."'),
          h('p', { style: { fontSize: '0.84rem', color: 'var(--text-secondary)' } }, 'May the divine rhythms of Durga Puja bring timeless joy, love, and sweet nostalgia to your home.')
        )
      )
    )
  );
}

// 10. FOOTER COMPONENT
function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return h('footer', { className: 'footer-section' },
    h('div', { className: 'container-custom' },
      h('div', { className: 'footer-festive-banner' },
        h('h2', { className: 'footer-greetings-bengali' }, 'শুভ শারদীয়া ও শুভ বিজয়া'),
        h('p', { style: { fontFamily: 'var(--font-bengali-sans)', fontSize: '1rem', color: 'var(--gold-radiant)', maxWidth: '640px', margin: '0 auto 1.4rem' } },
          'মায়ের আশীর্বাদে সবার জীবন ভরে উঠুক আনন্দ, সমৃদ্ধি, সুস্বাস্থ্য ও সুরের আলোকচ্ছটায়।'
        ),
        h('div', { className: 'ornament-divider' }, h('span', null, '🪔'))
      ),

      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.2rem', marginBottom: '2.8rem' } },
        h('div', null,
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' } },
            h('div', { className: 'nav-logo-emblem' }, '🪔'),
            h('span', { className: 'nav-brand-title gold-gradient-text', style: { fontSize: '1.2rem' } }, 'PUJO PLAYLIST')
          ),
          h('p', { style: { fontFamily: 'var(--font-bengali-sans)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.7' } },
            'বাঙালির প্রাণের উৎসব দুর্গাপূজা এবং তার চিরন্তন সুরের ডিজিটাল উদযাপন। শারদীয়ার গান, স্মৃতি ও সংস্কৃতির মিলনমেলা।'
          )
        ),

        h('div', null,
          h('h4', { style: { fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', fontSize: '0.98rem', marginBottom: '0.9rem', letterSpacing: '0.05em' } }, 'QUICK NAVIGATION'),
          h('ul', { style: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' } },
            h('li', null, h('a', { href: '#hero', className: 'nav-link', style: { fontSize: '0.88rem' } }, 'Home (প্রধান পাতা)')),
            h('li', null, h('a', { href: '#stage', className: 'nav-link', style: { fontSize: '0.88rem' } }, 'YouTube Stage (সুরমঞ্চ)')),
            h('li', null, h('a', { href: '#playlist', className: 'nav-link', style: { fontSize: '0.88rem' } }, 'Pujo Playlist (প্লেলিস্ট সূচি)')),
            h('li', null, h('a', { href: '#featured', className: 'nav-link', style: { fontSize: '0.88rem' } }, 'Featured Songs (সেরা গান)')),
            h('li', null, h('a', { href: '#gallery', className: 'nav-link', style: { fontSize: '0.88rem' } }, 'Gallery (শারদ চিত্রপট)')),
            h('li', null, h('a', { href: '#experience', className: 'nav-link', style: { fontSize: '0.88rem' } }, 'Pujo Experience (শারদীয় অনুভূতি)')),
            h('li', null, h('a', { href: '#about', className: 'nav-link', style: { fontSize: '0.88rem' } }, 'About (স্মৃতিকথা)'))
          )
        ),

        h('div', null,
          h('h4', { style: { fontFamily: 'var(--font-serif)', color: 'var(--gold-light)', fontSize: '0.98rem', marginBottom: '0.9rem', letterSpacing: '0.05em' } }, 'PUJO DAYS'),
          h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '0.45rem', fontFamily: 'var(--font-bengali-sans)', fontSize: '0.82rem' } },
            ['মহালয়া', 'ষষ্ঠী', 'মহাসপ্তমী', 'মহাষ্টমী ও সন্ধিপূজা', 'মহানবমী', 'বিজয়া দশমী'].map((day) =>
              h('span', { key: day, className: 'playlist-item-tag', style: { display: 'inline-block' } }, day)
            )
          )
        )
      ),

      h('div', { style: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.85rem', paddingTop: '1.8rem', borderTop: '1px solid rgba(212, 175, 55, 0.12)', fontSize: '0.8rem', color: 'var(--text-tertiary)' } },
        h('p', null, `© ${new Date().getFullYear()} Pujo Playlist. Official YouTube Playlist (PLJXc1t4LYwA0).`),
        h('button', { onClick: scrollToTop, className: 'btn-secondary', style: { padding: '0.35rem 0.85rem', fontSize: '0.76rem', minHeight: '36px' } }, '↑ Back to Top')
      )
    )
  );
}

// 11. PERSISTENT MOBILE BOTTOM MUSIC PLAYER
function MusicPlayer({ songs, currentSong, isPlaying, onPlay, onPause, onNext, onPrev }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  const progressTimerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (globalYTPlayer && globalYTPlayer.getCurrentTime) {
          try {
            const cur = globalYTPlayer.getCurrentTime() || 0;
            const dur = globalYTPlayer.getDuration() || 0;
            setCurrentTime(cur);
            if (dur > 0 && dur !== duration) setDuration(dur);
          } catch (e) {}
        }
      }, 500);
    } else {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    }
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, duration]);

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (globalYTPlayer && globalYTPlayer.seekTo) {
      globalYTPlayer.seekTo(seekTime, true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (globalYTPlayer && globalYTPlayer.setVolume) {
      globalYTPlayer.setVolume(newVol);
    }
  };

  const toggleMute = () => {
    if (!globalYTPlayer) return;
    if (isMuted) {
      globalYTPlayer.unMute();
      globalYTPlayer.setVolume(volume || 70);
      setIsMuted(false);
    } else {
      globalYTPlayer.mute();
      setIsMuted(true);
    }
  };

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentSong) return null;

  return h(Fragment, null,
    h('aside', { className: 'player-bar-container', 'aria-label': 'Mobile Audio Player Bar' },
      // Progress Scrubber Bar on Mobile Top Edge
      h('div', {
        style: {
          width: '100%',
          height: '3px',
          background: 'rgba(255, 255, 255, 0.15)',
          position: 'relative',
          marginBottom: '0.45rem',
          borderRadius: '2px',
          overflow: 'hidden'
        }
      },
        h('div', {
          style: {
            height: '100%',
            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-primary))',
            transition: 'width 0.2s linear'
          }
        })
      ),

      h('div', { className: 'player-bar-grid' },
        // Left: Thumbnail + Title
        h('div', {
          className: 'player-track-info',
          onClick: () => setIsCinemaMode(true),
          style: { cursor: 'pointer' }
        },
          h('img', { src: currentSong.cover, alt: currentSong.title, className: 'player-track-thumb' }),
          h('div', { className: 'player-track-meta' },
            h('span', { className: 'player-track-title' }, currentSong.bengaliTitle),
            h('span', { className: 'player-track-artist' }, currentSong.bengaliArtist || currentSong.artist)
          )
        ),

        // Center / Right Controls
        h('div', { className: 'player-center-controls' },
          h('div', { className: 'player-button-row' },
            h('button', {
              className: `player-ctrl-btn ${isShuffle ? 'active' : ''}`,
              onClick: () => setIsShuffle(!isShuffle),
              title: 'Shuffle'
            }, '🔀'),
            h('button', { className: 'player-ctrl-btn', onClick: onPrev, title: 'Previous Song' }, '⏮'),
            h('button', {
              className: 'player-main-play-btn',
              onClick: isPlaying ? onPause : onPlay,
              title: isPlaying ? 'Pause' : 'Play'
            }, isPlaying ? '⏸' : '▶'),
            h('button', { className: 'player-ctrl-btn', onClick: onNext, title: 'Next Song' }, '⏭'),
            h('button', {
              className: `player-ctrl-btn ${isRepeat ? 'active' : ''}`,
              onClick: () => setIsRepeat(!isRepeat),
              title: 'Repeat'
            }, '🔁')
          ),
          h('div', { className: 'player-timeline-row' },
            h('span', { className: 'player-time-label' }, formatTime(currentTime)),
            h('input', {
              type: 'range',
              min: '0',
              max: duration || 100,
              value: currentTime,
              onChange: handleSeek,
              className: 'player-slider'
            }),
            h('span', { className: 'player-time-label' },
              formatTime(duration) !== '0:00' ? formatTime(duration) : currentSong.duration
            )
          )
        ),

        // Right (Desktop Volume)
        h('div', { className: 'player-right-controls' },
          h('button', { className: 'player-ctrl-btn', onClick: toggleMute, title: isMuted ? 'Unmute' : 'Mute' },
            isMuted ? '🔇' : volume > 50 ? '🔊' : '🔉'
          ),
          h('div', { className: 'volume-slider-wrap' },
            h('input', {
              type: 'range',
              min: '0',
              max: '100',
              value: isMuted ? 0 : volume,
              onChange: handleVolumeChange,
              className: 'player-slider'
            })
          ),
          h('button', {
            className: 'player-ctrl-btn',
            onClick: () => setIsCinemaMode(true),
            title: 'Full Cinema Visualizer',
            style: { color: 'var(--gold-primary)' }
          }, '⛶')
        )
      )
    ),

    // Full Cinema Modal for Mobile Portrait
    isCinemaMode && h('div', {
      className: 'lightbox-modal-backdrop',
      onClick: () => setIsCinemaMode(false)
    },
      h('div', {
        className: 'lightbox-modal-content',
        onClick: (e) => e.stopPropagation(),
        style: { maxWidth: '580px', padding: '2rem 1.4rem', textAlign: 'center' }
      },
        h('button', { className: 'lightbox-close-btn', onClick: () => setIsCinemaMode(false) }, '✕'),
        h('div', { style: { position: 'relative', width: '180px', height: '180px', margin: '0 auto 1.4rem' } },
          h('img', {
            src: currentSong.cover,
            alt: currentSong.title,
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--gold-primary)',
              boxShadow: '0 0 28px rgba(212, 175, 55, 0.4)'
            }
          })
        ),
        h('span', { className: 'gallery-card-badge', style: { margin: '0 auto 0.5rem' } }, currentSong.tag),
        h('h3', { style: { fontFamily: 'var(--font-bengali-serif)', fontSize: '1.4rem', color: 'var(--cream-pure)', marginBottom: '0.3rem' } }, currentSong.bengaliTitle),
        h('p', { style: { fontSize: '0.9rem', color: 'var(--gold-radiant)', marginBottom: '1.2rem' } }, currentSong.bengaliArtist || currentSong.artist),
        h('div', { className: 'waveform-container', style: { marginBottom: '1.2rem' } },
          Array.from({ length: 10 }).map((_, i) => h('div', { key: i, className: `waveform-bar ${isPlaying ? '' : 'paused'}` }))
        ),
        h('div', { className: 'player-timeline-row', style: { display: 'flex', margin: '0 auto 1.2rem', width: '100%' } },
          h('span', { className: 'player-time-label' }, formatTime(currentTime)),
          h('input', {
            type: 'range',
            min: '0',
            max: duration || 100,
            value: currentTime,
            onChange: handleSeek,
            className: 'player-slider'
          }),
          h('span', { className: 'player-time-label' },
            formatTime(duration) !== '0:00' ? formatTime(duration) : currentSong.duration
          )
        ),
        h('div', { className: 'player-button-row', style: { justifyContent: 'center', gap: '1.2rem' } },
          h('button', { className: 'player-ctrl-btn', onClick: onPrev, style: { fontSize: '1.4rem', width: '46px', height: '46px' } }, '⏮'),
          h('button', {
            className: 'player-main-play-btn',
            onClick: isPlaying ? onPause : onPlay,
            style: { width: '52px', height: '52px', fontSize: '1.4rem' }
          }, isPlaying ? '⏸' : '▶'),
          h('button', { className: 'player-ctrl-btn', onClick: onNext, style: { fontSize: '1.4rem', width: '46px', height: '46px' } }, '⏭')
        )
      )
    )
  );
}

// 12. AMBIENT PARTICLES (Optimized for Mobile Battery & Frame Rate)
function AmbientParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Lower particle count on mobile for smooth 60fps and low battery drain
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 18 : 34;
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.4 - 0.15,
        alpha: Math.random() * 0.5 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: Math.random() > 0.35 ? '212, 175, 55' : Math.random() > 0.5 ? '245, 120, 90' : '255, 240, 210'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += Math.sin(Date.now() * p.pulseSpeed) * 0.01;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const alpha = Math.max(0.1, Math.min(0.8, p.alpha));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${p.color}, 0.8)`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return h('canvas', { ref: canvasRef, id: 'ambient-particles-canvas' });
}

// 13. ROOT APP COMPONENT WITH YOUTUBE PLAYLIST SYNC
export function App() {
  const [songs] = useState(PUJO_SONGS);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDhakPlaying, setIsDhakPlaying] = useState(false);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    const initYT = () => {
      const stageElement = document.getElementById('youtube-player-stage');
      if (window.YT && window.YT.Player && stageElement && !globalYTPlayer) {
        try {
          globalYTPlayer = new window.YT.Player('youtube-player-stage', {
            height: '100%',
            width: '100%',
            playerVars: {
              listType: 'playlist',
              list: YOUTUBE_PLAYLIST_ID,
              autoplay: 0,
              controls: 1,
              enablejsapi: 1,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              origin: window.location.origin
            },
            events: {
              onReady: (e) => {
                e.target.setVolume(80);
              },
              onStateChange: (e) => {
                if (e.data === 1) { // PLAYING
                  setIsPlaying(true);
                  try {
                    const idx = e.target.getPlaylistIndex();
                    if (typeof idx === 'number' && idx >= 0 && idx < songs.length) {
                      setCurrentSongIndex(idx);
                    }
                  } catch (err) {}
                }
                if (e.data === 2) { // PAUSED
                  setIsPlaying(false);
                }
                if (e.data === 0) { // ENDED
                  handleNext();
                }
              },
              onError: (e) => {
                console.warn('YouTube Player Event Notice:', e.data);
                if (e.data === 150 || e.data === 101 || e.data === 100) {
                  handleNext();
                }
              }
            }
          });
        } catch (err) {
          console.warn('YT Player init:', err);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      window.onYouTubeIframeAPIReady = initYT;
    }
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    if (globalYTPlayer) {
      try {
        if (globalYTPlayer.playVideo) {
          globalYTPlayer.playVideo();
        }
      } catch (e) {}
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (globalYTPlayer) {
      try {
        if (globalYTPlayer.pauseVideo) {
          globalYTPlayer.pauseVideo();
        }
      } catch (e) {}
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) handlePause();
    else handlePlay();
  };

  const handleNext = () => {
    const nextIdx = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIdx);
    setIsPlaying(true);
    if (globalYTPlayer) {
      try {
        if (globalYTPlayer.playVideoAt) {
          globalYTPlayer.playVideoAt(nextIdx);
        } else if (globalYTPlayer.loadVideoById) {
          globalYTPlayer.loadVideoById(songs[nextIdx].youtubeId);
        }
      } catch (e) {}
    }
  };

  const handlePrev = () => {
    const prevIdx = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIdx);
    setIsPlaying(true);
    if (globalYTPlayer) {
      try {
        if (globalYTPlayer.playVideoAt) {
          globalYTPlayer.playVideoAt(prevIdx);
        } else if (globalYTPlayer.loadVideoById) {
          globalYTPlayer.loadVideoById(songs[prevIdx].youtubeId);
        }
      } catch (e) {}
    }
  };

  const handleSelectSong = (song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      if (index === currentSongIndex && isPlaying) {
        handlePause();
      } else {
        setCurrentSongIndex(index);
        setIsPlaying(true);
        if (globalYTPlayer) {
          try {
            if (globalYTPlayer.playVideoAt) {
              globalYTPlayer.playVideoAt(index);
            } else if (globalYTPlayer.loadVideoById) {
              globalYTPlayer.loadVideoById(song.youtubeId);
            }
          } catch (e) {}
        }
        const stageEl = document.getElementById('stage');
        if (stageEl) stageEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePlayPlaylist = () => {
    if (!isPlaying) {
      handlePlay();
      const stageEl = document.getElementById('stage');
      if (stageEl) stageEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      handlePause();
    }
  };

  const handleExploreSongs = () => {
    const el = document.getElementById('playlist');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleDhak = () => {
    const state = dhakEngine.toggle();
    setIsDhakPlaying(state);
  };

  return h('div', { className: 'min-h-screen relative flex flex-col', style: { width: '100%', maxWidth: '100vw', overflowX: 'hidden' } },
    h(AmbientParticles),
    h(Navbar, {
      currentSong,
      isPlaying,
      onTogglePlay: handleTogglePlay,
      isDhakPlaying,
      onToggleDhak: handleToggleDhak
    }),
    h('main', { style: { flex: 1, width: '100%', maxWidth: '100vw', overflowX: 'hidden' } },
      h(Hero, {
        onPlayPlaylist: handlePlayPlaylist,
        onExploreSongs: handleExploreSongs,
        isPlaying
      }),
      h(YouTubeStage, {
        currentSong,
        isPlaying,
        onTogglePlay: handleTogglePlay,
        onNext: handleNext,
        onPrev: handlePrev
      }),
      h(PlaylistSection, {
        songs,
        currentSong,
        isPlaying,
        onSelectSong: handleSelectSong
      }),
      h(FeaturedSongs, {
        songs,
        currentSong,
        isPlaying,
        onSelectSong: handleSelectSong
      }),
      h(PujoGallery),
      h(PujoExperience, {
        isDhakPlaying,
        onToggleDhak: handleToggleDhak
      }),
      h(AboutSection)
    ),
    h(Footer),
    h(MusicPlayer, {
      songs,
      currentSong,
      isPlaying,
      onPlay: handlePlay,
      onPause: handlePause,
      onNext: handleNext,
      onPrev: handlePrev
    })
  );
}

// MOUNT APP
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(h(App));
}
