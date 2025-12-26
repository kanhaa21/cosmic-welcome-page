"use client";

import { AudioProvider } from "@/hooks/AudioContext";
import { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AudioProvider>
      {children}
    </AudioProvider>
  );
}
