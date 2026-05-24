"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type SoundType = "hover" | "tap" | "add" | "open" | "close" | "toggle";

interface SoundContextValue {
  enabled: boolean;
  toggle: () => void;
  play: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "ns-bakes-sound-v1";

/**
 * Tiny, dependency-free sound design generated with the Web Audio API.
 * No audio files to ship. Off by default; only audible once the user opts in.
 */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(STORAGE_KEY) === "on");
    } catch {
      /* ignore */
    }
  }, []);

  const ensureContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const blip = useCallback(
    (
      ac: AudioContext,
      freq: number,
      duration: number,
      volume: number,
      wave: OscillatorType = "sine",
      delay = 0,
    ) => {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = wave;
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ac.destination);
      const start = ac.currentTime + delay;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.start(start);
      osc.stop(start + duration + 0.03);
    },
    [],
  );

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      const ac = ensureContext();
      if (!ac) return;
      switch (type) {
        case "hover":
          blip(ac, 880, 0.05, 0.02, "sine");
          break;
        case "tap":
          blip(ac, 523.25, 0.07, 0.04, "triangle");
          break;
        case "toggle":
          blip(ac, 440, 0.09, 0.045, "sine");
          break;
        case "add":
          blip(ac, 659.25, 0.09, 0.045, "triangle");
          blip(ac, 987.77, 0.11, 0.035, "sine", 0.07);
          break;
        case "open":
          blip(ac, 392, 0.11, 0.04, "sine");
          blip(ac, 587.33, 0.13, 0.035, "sine", 0.06);
          break;
        case "close":
          blip(ac, 587.33, 0.1, 0.035, "sine");
          blip(ac, 392, 0.12, 0.035, "sine", 0.06);
          break;
      }
    },
    [enabled, ensureContext, blip],
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        /* ignore */
      }
      // Turning on counts as a user gesture — confirm audibly.
      if (next) {
        const ac = ensureContext();
        if (ac) blip(ac, 523.25, 0.14, 0.05, "sine");
      }
      return next;
    });
  }, [ensureContext, blip]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within a SoundProvider");
  return ctx;
}
