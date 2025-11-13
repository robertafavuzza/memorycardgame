import type { ThemeType } from '../types/theme';

type MusicConfig = {
  baseFreq: number;
  binauralBeat: number;
  waveType: OscillatorType;
  description: string;
};

const themeMusicConfigs: Record<ThemeType, MusicConfig> = {
  vaporwave: {
    baseFreq: 200,
    binauralBeat: 10,
    waveType: 'sine',
    description: 'Alpha waves (10 Hz) - Riduce stress e promuove calma',
  },
  fantasy: {
    baseFreq: 220,
    binauralBeat: 8,
    waveType: 'sine',
    description: 'Alpha waves (8 Hz) - Stimola creatività e immaginazione',
  },
  horror: {
    baseFreq: 180,
    binauralBeat: 10,
    waveType: 'sine',
    description: 'Alpha waves (10 Hz) - Rilassamento e concentrazione profonda',
  },
  oldstyle: {
    baseFreq: 240,
    binauralBeat: 12,
    waveType: 'sine',
    description: 'Alpha waves (12 Hz) - Armonia naturale e focus mentale',
  },
  retro: {
    baseFreq: 260,
    binauralBeat: 14,
    waveType: 'sine',
    description: 'Beta waves (14 Hz) - Energia positiva e attenzione attiva',
  },
};

class AudioManager {
  private isMusicMuted: boolean = false;
  private currentTheme: ThemeType = 'vaporwave';
  private audioContext: AudioContext | null = null;
  private leftOscillator: OscillatorNode | null = null;
  private rightOscillator: OscillatorNode | null = null;
  private leftGain: GainNode | null = null;
  private rightGain: GainNode | null = null;
  private merger: ChannelMergerNode | null = null;

  setTheme(theme: ThemeType) {
    if (this.currentTheme !== theme) {
      this.currentTheme = theme;
      this.stopBackgroundMusic();
      if (!this.isMusicMuted) {
        this.playBackgroundMusic();
      }
    }
  }

  playBackgroundMusic() {
    if (this.audioContext) return;

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const config = themeMusicConfigs[this.currentTheme];

    this.leftOscillator = this.audioContext.createOscillator();
    this.rightOscillator = this.audioContext.createOscillator();
    this.leftGain = this.audioContext.createGain();
    this.rightGain = this.audioContext.createGain();
    this.merger = this.audioContext.createChannelMerger(2);

    this.leftOscillator.type = config.waveType;
    this.rightOscillator.type = config.waveType;

    this.leftOscillator.frequency.setValueAtTime(config.baseFreq, this.audioContext.currentTime);
    this.rightOscillator.frequency.setValueAtTime(config.baseFreq + config.binauralBeat, this.audioContext.currentTime);

    this.leftGain.gain.setValueAtTime(0.015, this.audioContext.currentTime);
    this.rightGain.gain.setValueAtTime(0.015, this.audioContext.currentTime);

    this.leftOscillator.connect(this.leftGain);
    this.rightOscillator.connect(this.rightGain);

    this.leftGain.connect(this.merger, 0, 0);
    this.rightGain.connect(this.merger, 0, 1);

    this.merger.connect(this.audioContext.destination);

    this.leftOscillator.start();
    this.rightOscillator.start();
  }

  stopBackgroundMusic() {
    if (this.leftOscillator) {
      this.leftOscillator.stop();
      this.leftOscillator.disconnect();
      this.leftOscillator = null;
    }
    if (this.rightOscillator) {
      this.rightOscillator.stop();
      this.rightOscillator.disconnect();
      this.rightOscillator = null;
    }
    if (this.leftGain) {
      this.leftGain.disconnect();
      this.leftGain = null;
    }
    if (this.rightGain) {
      this.rightGain.disconnect();
      this.rightGain = null;
    }
    if (this.merger) {
      this.merger.disconnect();
      this.merger = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  playCardFlip() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  playMatch() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);

      const startTime = audioContext.currentTime + (index * 0.1);
      gainNode.gain.setValueAtTime(0.2, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
    });
  }

  playNoMatch() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  }

  playWin() {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    const melody = [
      { freq: 523.25, time: 0 },
      { freq: 659.25, time: 0.15 },
      { freq: 783.99, time: 0.3 },
      { freq: 1046.50, time: 0.45 }
    ];

    melody.forEach(note => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime);

      const startTime = audioContext.currentTime + note.time;
      gainNode.gain.setValueAtTime(0.3, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.5);
    });
  }

  toggleMusicMute() {
    this.isMusicMuted = !this.isMusicMuted;

    if (this.isMusicMuted) {
      this.stopBackgroundMusic();
    } else {
      this.playBackgroundMusic();
    }

    return this.isMusicMuted;
  }

  getMusicMuted() {
    return this.isMusicMuted;
  }
}

export const audioManager = new AudioManager();
