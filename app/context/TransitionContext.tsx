"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

// ============================================
// Types
// ============================================

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

// ============================================
// Context
// ============================================

const TransitionContext = createContext<TransitionContextType | null>(null);

// Transition duration must match PageTransition animation duration
const TRANSITION_DURATION = 300; // ms

// ============================================
// Provider
// ============================================

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const startTransition = useCallback(
    (href: string) => {
      // Trigger exit animation
      setIsTransitioning(true);

      // Wait for exit animation to complete before navigating
      setTimeout(() => {
        router.push(href);

        // Reset state after a brief delay to allow new page to mount
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, TRANSITION_DURATION);
    },
    [router],
  );

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

// ============================================
// Hook
// ============================================

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
