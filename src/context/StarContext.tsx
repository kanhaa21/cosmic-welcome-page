"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { motionValue, MotionValue } from "framer-motion";

interface StarContextType {
  speed: MotionValue<number>;
  setSpeed: (value: number) => void;
}

const StarContext = createContext<StarContextType | undefined>(undefined);

export function StarProvider({ children }: { children: ReactNode }) {
  const [speed] = useState(() => motionValue(1.5));

  const setSpeed = (value: number) => {
    speed.set(value);
  };

  return (
    <StarContext.Provider value={{ speed, setSpeed }}>
      {children}
    </StarContext.Provider>
  );
}

export function useStarContext() {
  const context = useContext(StarContext);
  if (context === undefined) {
    throw new Error("useStarContext must be used within a StarProvider");
  }
  return context;
}
