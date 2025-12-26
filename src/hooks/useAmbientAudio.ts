"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type ToneType = "hum" | "ambient" | "none";

interface AudioState {
  enabled: boolean;
  volume: number;
}

export function useAmbientAudio() {
  const [isEnabled, setIsEnabled] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const masterGain = useRef<GainNode | null>(null);
  const oscillators = useRef<OscillatorNode[]>([]);
  const filter = useRef<BiquadFilterNode | null>(null);

  const initAudio = useCallback(() => {
    if (audioContext.current) return;

    audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain.current = audioContext.current.createGain();
    filter.current = audioContext.current.createBiquadFilter();

    filter.current.type = "lowpass";
    filter.current.frequency.setValueAtTime(400, audioContext.current.currentTime);
    filter.current.Q.setValueAtTime(1, audioContext.current.currentTime);

    masterGain.current.connect(filter.current);
    filter.current.connect(audioContext.current.destination);
    masterGain.current.gain.setValueAtTime(0, audioContext.current.currentTime);
  }, []);

  const playTone = useCallback((type: ToneType) => {
    if (!audioContext.current || !masterGain.current) return;

    // Stop existing oscillators
    oscillators.current.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch (e) {}
    });
    oscillators.current = [];

    const ctx = audioContext.current;
    const now = ctx.currentTime;

    if (type === "hum") {
      // Deep, low-frequency hum (Black Hole)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(55, now); // A1
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(56, now); // Slight detune for phasing
      
      gain1.gain.setValueAtTime(0.3, now);
      
      osc1.connect(gain1);
      osc2.connect(gain1);
      gain1.connect(masterGain.current);
      
      osc1.start();
      osc2.start();
      oscillators.current.push(osc1, osc2);
      
      filter.current?.frequency.exponentialRampToValueAtTime(150, now + 2);
    } else if (type === "ambient") {
      // Soft evolving ambient tone (Cosmic Timeline / Solar System)
      const frequencies = [110, 164.81, 220, 329.63]; // A2, E3, A3, E4
      
      frequencies.forEach(freq => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        
        // Add subtle frequency modulation
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.1, now);
        lfoGain.gain.setValueAtTime(2, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        
        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.1, now + 4);
        
        osc.connect(g);
        g.connect(masterGain.current!);
        osc.start();
        oscillators.current.push(osc);
      });
      
      filter.current?.frequency.exponentialRampToValueAtTime(800, now + 4);
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioContext.current) {
      initAudio();
    }
    
    const newState = !isEnabled;
    setIsEnabled(newState);
    
    if (audioContext.current?.state === "suspended") {
      audioContext.current.resume();
    }

    if (newState) {
      masterGain.current?.gain.setTargetAtTime(0.15, audioContext.current!.currentTime, 1);
    } else {
      masterGain.current?.gain.setTargetAtTime(0, audioContext.current!.currentTime, 1);
    }
  }, [isEnabled, initAudio]);

  const setTone = useCallback((type: ToneType) => {
    if (isEnabled) {
      playTone(type);
    }
  }, [isEnabled, playTone]);

  // Cleanup
  useEffect(() => {
    return () => {
      oscillators.current.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
    };
  }, []);

  // Handle visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioContext.current?.suspend();
      } else if (isEnabled) {
        audioContext.current?.resume();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isEnabled]);

  return { isEnabled, toggleAudio, setTone };
}
