"use client";

import { ReactNode } from "react";
import { StarProvider } from "@/context/StarContext";
import { StarBackground } from "@/components/space/StarBackground";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <StarProvider>
      <StarBackground />
      {children}
    </StarProvider>
  );
}
