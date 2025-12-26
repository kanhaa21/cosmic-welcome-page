"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAmbientAudio } from "./useAmbientAudio";

interface AudioContextType {
  isEnabled: boolean;
  toggleAudio: () => void;
  setTone: (type: "hum" | "ambient" | "none") => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audio = useAmbientAudio();

  return (
    <AudioContext.Provider value={audio}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
