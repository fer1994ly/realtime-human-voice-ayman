interface Window {
  activeAudioContext: AudioContext | null;
  activeStream: MediaStream | null;
}

declare global {
  interface Window {
    activeAudioContext: AudioContext | null;
    activeStream: MediaStream | null;
  }
} 