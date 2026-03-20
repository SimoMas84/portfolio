"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "@/app/context/TransitionContext";
import gsap from "gsap";

interface AnimatedLogoProps {
  onComplete?: () => void;
}

export default function AnimatedLogo({ onComplete }: AnimatedLogoProps) {
  const pathname = usePathname();
  const { isTransitioning } = useTransition();

  const superioreRef = useRef<HTMLDivElement>(null);
  const inferioreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTransitioning) return;

    const tl = gsap.timeline({ onComplete });

    // --- INITIAL STATE ---
    gsap.set(superioreRef.current, { x: -250, opacity: 0 });
    gsap.set(inferioreRef.current, { x: 250, opacity: 0 });

    // --- ANIMATION SEQUENCE ---

    // Top piece slides from left, bottom from right simultaneously
    tl.to(superioreRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.4)",
    }).to(
      inferioreRef.current,
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "back.out(1.4)",
      },
      "<",
    );

    return () => {
      tl.kill();
      gsap.killTweensOf([superioreRef.current, inferioreRef.current]);
    };
  }, [pathname, isTransitioning, onComplete]);

  return (
    <div className="relative w-full h-full">
      {/* Top piece */}
      <div ref={superioreRef} className="absolute inset-0">
        <Image
          src="/images/logo/superiore.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 250px, (max-width: 1535px) 300px, 400px"
          className="object-contain"
        />
      </div>

      {/* Bottom piece */}
      <div ref={inferioreRef} className="absolute inset-0">
        <Image
          src="/images/logo/inferiore.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 250px, (max-width: 1535px) 300px, 400px"
          className="object-contain"
        />
      </div>

      {/* Letter S */}
      <div className="absolute inset-0">
        <Image
          src="/images/logo/s.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 250px, (max-width: 1535px) 300px, 400px"
          className="object-contain"
        />
      </div>

      {/* Letter M */}
      <div className="absolute inset-0">
        <Image
          src="/images/logo/m.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1280px) 250px, (max-width: 1535px) 300px, 400px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
