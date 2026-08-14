// Web Audio API Dhak & Kashi Synthesizer Engine
// Emulates the traditional rhythmic Bengali Durga Puja dhak pattern (ধাং কুড় কুড় ধাং কাড়াং)

class DhakAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.tempo = 140; // BPM
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Synthesize low-end Dhak resonant boom
  playDhakBass(time, velocity = 1.0) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);

    gain.gain.setValueAtTime(velocity * 0.9, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.26);
  }

  // Synthesize sharp wooden stick rim hit on dhak (কুড় / কাঠি)
  playDhakRim(time, velocity = 0.8) {
    if (!this.ctx) return;
    // Noise buffer for snap
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(1200, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(velocity * 0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start(time);
    whiteNoise.stop(time + 0.07);
  }

  // Synthesize metallic brass bell / Kashi (কাঁসর)
  playKashi(time, velocity = 0.5) {
    if (!this.ctx) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1860, time);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2740, time);

    gain.gain.setValueAtTime(velocity * 0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.41);
    osc2.stop(time + 0.41);
  }

  // Traditional 8-step Bengali Durga Puja Dhak rhythm
  startRhythm(onBeatCallback) {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;

    const interval = (60 / this.tempo) * 500; // 8th note duration in ms

    const loop = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime;

      // Rhythm pattern steps (0 to 7)
      switch (this.step % 8) {
        case 0: // Dhaang!
          this.playDhakBass(now, 1.0);
          this.playKashi(now, 0.6);
          break;
        case 1: // kur
          this.playDhakRim(now, 0.7);
          break;
        case 2: // kur
          this.playDhakRim(now, 0.9);
          break;
        case 3: // Dhaang!
          this.playDhakBass(now, 0.9);
          this.playKashi(now, 0.5);
          break;
        case 4: // Ta
          this.playDhakRim(now, 0.8);
          break;
        case 5: // Dhing
          this.playDhakBass(now, 0.85);
          this.playKashi(now, 0.7);
          break;
        case 6: // Kur
          this.playDhakRim(now, 0.7);
          break;
        case 7: // Ta-Dhaang!
          this.playDhakBass(now, 0.95);
          this.playDhakRim(now, 0.8);
          this.playKashi(now, 0.8);
          break;
      }

      if (onBeatCallback) {
        onBeatCallback(this.step % 8);
      }

      this.step++;
      this.timerId = setTimeout(loop, interval);
    };

    loop();
  }

  stopRhythm() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle(onBeatCallback) {
    if (this.isPlaying) {
      this.stopRhythm();
      return false;
    } else {
      this.startRhythm(onBeatCallback);
      return true;
    }
  }
}

export const dhakEngine = new DhakAudioEngine();
