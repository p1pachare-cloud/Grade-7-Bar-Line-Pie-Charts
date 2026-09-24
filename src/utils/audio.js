import { audioMap } from './audioMap';

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

let currentAudio = null;
let activeQueueSymbol = null;
const elevenLabsCache = new Map();

export function say(text) { return { text, style: 'statement' }; }
export function ask(text) { return { text, style: 'question' }; }
export function cheer(text) { return { text, style: 'encouragement' }; }
export function emphasize(text) { return { text, style: 'emphasis' }; }
export function think(text) { return { text, style: 'thinking' }; }
export function celebrate(text) { return { text, style: 'celebration' }; }
export function instruct(text) { return { text, style: 'instruction' }; }

export function stopNarration() {
  activeQueueSymbol = Symbol();
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export async function getAudioUrl(text, style = 'statement') {
  if (audioMap[text]) {
    return audioMap[text];
  }

  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) {
    return elevenLabsCache.get(cacheKey);
  }

  const apiKey = import.meta.env?.VITE_ELEVENLABS_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const styleSettings = STYLE_SETTINGS[style] || STYLE_SETTINGS.statement;
    const response = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2',
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: styleSettings,
        }),
      }
    );

    if (!response.ok) return null;
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    elevenLabsCache.set(cacheKey, url);
    return url;
  } catch (err) {
    console.warn('ElevenLabs API audio generation skipped:', err);
    return null;
  }
}

function playAudioFile(url) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      currentAudio = null;
      resolve();
    };
    audio.play().catch(() => {
      currentAudio = null;
      resolve();
    });
  });
}

function speakFallback(text) {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

export async function narrate(segments, enabled = true, onSegmentStart = null) {
  if (!enabled || !segments || segments.length === 0) return;
  stopNarration();
  const queueSymbol = Symbol();
  activeQueueSymbol = queueSymbol;

  for (let i = 0; i < segments.length; i++) {
    if (activeQueueSymbol !== queueSymbol) break;
    const seg = typeof segments[i] === 'string' ? { text: segments[i], style: 'statement' } : segments[i];
    if (!seg.text) continue;

    const url = await getAudioUrl(seg.text, seg.style);
    if (activeQueueSymbol !== queueSymbol) break;

    if (onSegmentStart) onSegmentStart(i);

    if (url) {
      // Preload next segment if any
      if (i + 1 < segments.length) {
        const nextSeg = typeof segments[i + 1] === 'string' ? { text: segments[i + 1] } : segments[i + 1];
        getAudioUrl(nextSeg.text, nextSeg.style);
      }
      await playAudioFile(url);
    } else {
      // Graceful fallback to speech synthesis if no pre-generated audio and no ElevenLabs key
      await speakFallback(seg.text);
    }
  }
}
