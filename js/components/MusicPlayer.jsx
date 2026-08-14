import React, { useState, useEffect, useRef } from 'https://esm.sh/react@18.2.0';

export function MusicPlayer({
  songs,
  currentSong,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSongEnd
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  const playerRef = useRef(null);
  const progressTimerRef = useRef(null);

  // Initialize or update YouTube Player
  useEffect(() => {
    if (!window.YT) {
      // Load YouTube IFrame API if not already present
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (!currentSong) return;

      if (!playerRef.current) {
        playerRef.current = new window.YT.Player('youtube-player-host', {
          height: '200',
          width: '200',
          videoId: currentSong.youtubeId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(volume);
              if (isPlaying) {
                event.target.playVideo();
              }
            },
            onStateChange: (event) => {
              // YT.PlayerState.ENDED = 0
              if (event.data === 0) {
                if (isRepeat) {
                  event.target.seekTo(0);
                  event.target.playVideo();
                } else {
                  onNext();
                }
              }
              // YT.PlayerState.PLAYING = 1
              if (event.data === 1) {
                onPlay();
                setDuration(event.target.getDuration() || 0);
              }
              // YT.PlayerState.PAUSED = 2
              if (event.data === 2) {
                onPause();
              }
            }
          }
        });
      } else {
        // Switch track
        try {
          playerRef.current.loadVideoById(currentSong.youtubeId);
          if (isPlaying) {
            playerRef.current.playVideo();
          }
        } catch (err) {
          console.log('YT Player transition:', err);
        }
      }
    }
  }, [currentSong?.id]);

  // Handle Play/Pause sync
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.playVideo) return;
    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (e) {
      console.warn(e);
    }
  }, [isPlaying]);

  // Progress ticker
  useEffect(() => {
    if (isPlaying) {
      progressTimerRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          try {
            const cur = playerRef.current.getCurrentTime() || 0;
            const dur = playerRef.current.getDuration() || 0;
            setCurrentTime(cur);
            if (dur > 0 && dur !== duration) {
              setDuration(dur);
            }
          } catch (e) {}
        }
      }, 500);
    } else {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    }

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [isPlaying, duration]);

  // Handle Seeking
  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (playerRef.current && playerRef.current.seekTo) {
      playerRef.current.seekTo(seekTime, true);
    }
  };

  // Handle Volume
  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVol);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      playerRef.current.setVolume(volume || 70);
      setIsMuted(false);
    } else {
      playerRef.current.mute();
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

  return (
    <>
      {/* Hidden YouTube IFrame container */}
      <div id="youtube-player-host"></div>

      {/* Persistent Bottom Floating Player Bar */}
      <aside className="player-bar-container" aria-label="Audio player controls">
        <div className="player-bar-grid">
          {/* Left: Current Song Info */}
          <div className="player-track-info">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="player-track-thumb"
            />
            <div className="player-track-meta">
              <span className="player-track-title">
                {currentSong.bengaliTitle}
              </span>
              <span className="player-track-artist">
                {currentSong.bengaliArtist || currentSong.artist}
              </span>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="player-center-controls">
            {/* Buttons Row */}
            <div className="player-button-row">
              {/* Shuffle */}
              <button
                className={`player-ctrl-btn ${isShuffle ? 'active' : ''}`}
                onClick={() => setIsShuffle(!isShuffle)}
                title="Shuffle Playlist"
              >
                🔀
              </button>

              {/* Prev */}
              <button
                className="player-ctrl-btn"
                onClick={onPrev}
                title="Previous Song"
                aria-label="Previous Track"
              >
                ⏮
              </button>

              {/* Play / Pause Main */}
              <button
                className="player-main-play-btn"
                onClick={isPlaying ? onPause : onPlay}
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              {/* Next */}
              <button
                className="player-ctrl-btn"
                onClick={onNext}
                title="Next Song"
                aria-label="Next Track"
              >
                ⏭
              </button>

              {/* Repeat */}
              <button
                className={`player-ctrl-btn ${isRepeat ? 'active' : ''}`}
                onClick={() => setIsRepeat(!isRepeat)}
                title="Repeat Current Song"
              >
                🔁
              </button>
            </div>

            {/* Timeline Row */}
            <div className="player-timeline-row">
              <span className="player-time-label">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="player-slider"
                aria-label="Seek track position"
              />
              <span className="player-time-label">
                {formatTime(duration) !== '0:00' ? formatTime(duration) : currentSong.duration}
              </span>
            </div>
          </div>

          {/* Right: Volume & Cinema Visualizer Mode */}
          <div className="player-right-controls">
            <button
              className="player-ctrl-btn"
              onClick={toggleMute}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? '🔇' : volume > 50 ? '🔊' : '🔉'}
            </button>

            <div className="volume-slider-wrap">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="player-slider"
                aria-label="Volume slider"
              />
            </div>

            {/* Cinema Visualizer Modal Toggle */}
            <button
              className="player-ctrl-btn"
              onClick={() => setIsCinemaMode(true)}
              title="Full Cinema Visualizer"
              style={{ color: 'var(--gold-primary)' }}
            >
              ⛶
            </button>
          </div>
        </div>
      </aside>

      {/* Fullscreen Cinema Visualizer Modal */}
      {isCinemaMode && (
        <div
          className="lightbox-modal-backdrop"
          onClick={() => setIsCinemaMode(false)}
        >
          <div
            className="lightbox-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: '2.5rem', textAlign: 'center' }}
          >
            <button
              className="lightbox-close-btn"
              onClick={() => setIsCinemaMode(false)}
            >
              ✕
            </button>

            {/* Artwork with ambient pulse */}
            <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 1.8rem' }}>
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--gold-primary)',
                  boxShadow: '0 0 35px rgba(212, 175, 55, 0.4)'
                }}
              />
            </div>

            <span className="gallery-card-badge" style={{ margin: '0 auto 0.6rem' }}>
              {currentSong.tag}
            </span>

            <h3 style={{ fontFamily: 'var(--font-bengali-serif)', fontSize: '1.6rem', color: 'var(--cream-pure)', marginBottom: '0.4rem' }}>
              {currentSong.bengaliTitle}
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--gold-radiant)', marginBottom: '1.5rem' }}>
              {currentSong.bengaliArtist || currentSong.artist}
            </p>

            {/* Equalizer Wave in Cinema Mode */}
            <div className="waveform-container" style={{ marginBottom: '1.5rem' }}>
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

            {/* Scrubber inside Modal */}
            <div className="player-timeline-row" style={{ margin: '0 auto 1.5rem' }}>
              <span className="player-time-label">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="player-slider"
              />
              <span className="player-time-label">
                {formatTime(duration) !== '0:00' ? formatTime(duration) : currentSong.duration}
              </span>
            </div>

            {/* Buttons inside Modal */}
            <div className="player-button-row" style={{ justifyContent: 'center', gap: '1.5rem' }}>
              <button className="player-ctrl-btn" onClick={onPrev} style={{ fontSize: '1.5rem' }}>⏮</button>
              <button className="player-main-play-btn" onClick={isPlaying ? onPause : onPlay} style={{ width: '54px', height: '54px', fontSize: '1.5rem' }}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button className="player-ctrl-btn" onClick={onNext} style={{ fontSize: '1.5rem' }}>⏭</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
