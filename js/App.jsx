import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import { PUJO_SONGS } from './data/songs.js';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { FeaturedSongs } from './components/FeaturedSongs.jsx';
import { PlaylistSection } from './components/PlaylistSection.jsx';
import { PujoGallery } from './components/PujoGallery.jsx';
import { PujoExperience } from './components/PujoExperience.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { MusicPlayer } from './components/MusicPlayer.jsx';
import { Footer } from './components/Footer.jsx';
import { AmbientParticles } from './components/AmbientParticles.jsx';
import { dhakEngine } from './services/DhakAudioEngine.js';

export function App() {
  const [songs] = useState(PUJO_SONGS);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDhakPlaying, setIsDhakPlaying] = useState(false);

  const currentSong = songs[currentSongIndex];

  // Handle Play/Pause
  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  // Next Track
  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  // Previous Track
  const handlePrev = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  // Select Song
  const handleSelectSong = (song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    if (index !== -1) {
      if (index === currentSongIndex) {
        setIsPlaying(!isPlaying);
      } else {
        setCurrentSongIndex(index);
        setIsPlaying(true);
      }
    }
  };

  // Play Playlist CTA in Hero
  const handlePlayPlaylist = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  // Explore Songs CTA in Hero
  const handleExploreSongs = (e) => {
    const el = document.getElementById('playlist');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle Live Dhak synthesizer
  const handleToggleDhak = () => {
    const state = dhakEngine.toggle();
    setIsDhakPlaying(state);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background ambient floating diya sparks */}
      <AmbientParticles />

      {/* Top Sticky Navigation */}
      <Navbar
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        isDhakPlaying={isDhakPlaying}
        onToggleDhak={handleToggleDhak}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* 1. Hero */}
        <Hero
          onPlayPlaylist={handlePlayPlaylist}
          onExploreSongs={handleExploreSongs}
          isPlaying={isPlaying}
        />

        {/* 2. Featured Songs */}
        <FeaturedSongs
          songs={songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onSelectSong={handleSelectSong}
        />

        {/* 3. Playlist Section */}
        <PlaylistSection
          songs={songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          onSelectSong={handleSelectSong}
        />

        {/* 4. Pujo Gallery */}
        <PujoGallery />

        {/* 5. Pujo Experience */}
        <PujoExperience
          isDhakPlaying={isDhakPlaying}
          onToggleDhak={handleToggleDhak}
        />

        {/* 6. About */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Bottom Music Player */}
      <MusicPlayer
        songs={songs}
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
        onNext={handleNext}
        onPrev={handlePrev}
        onSongEnd={handleNext}
      />
    </div>
  );
}
