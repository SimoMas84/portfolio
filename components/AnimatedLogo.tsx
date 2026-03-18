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
  const sinistroRef = useRef<HTMLDivElement>(null);
  const destroRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const mRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't run animations while page is transitioning in
    if (isTransitioning) return;

    const tl = gsap.timeline({ onComplete });

    // --- INITIAL STATE ---
    gsap.set(superioreRef.current, { y: -120, opacity: 0 });
    gsap.set(inferioreRef.current, { y: 120, opacity: 0 });
    gsap.set(sinistroRef.current, { x: -120, opacity: 0 });
    gsap.set(destroRef.current, { x: 120, opacity: 0 });
    gsap.set([sRef.current, mRef.current], { opacity: 0 });

    // --- ANIMATION SEQUENCE ---

    // Step 1: top and bottom pieces slide in simultaneously
    tl.to(superioreRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.4)",
    })
      .to(
        inferioreRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        "<",
      )

      // Step 2: left and right pieces slide in simultaneously
      .to(
        sinistroRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        "-=0.2",
      )
      .to(
        destroRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        "<",
      )

      // Step 3: S fades in
      .to(
        sRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.1",
      )

      // Step 4: M fades in right after S
      .to(
        mRef.current,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.1",
      );

    // Cleanup on unmount or pathname change
    return () => {
      tl.kill();
      gsap.killTweensOf([
        superioreRef.current,
        inferioreRef.current,
        sinistroRef.current,
        destroRef.current,
        sRef.current,
        mRef.current,
      ]);
    };
  }, [pathname, isTransitioning, onComplete]);

  return (
    <div className="relative w-full h-full">
      {/* Top piece */}
      <div
        ref={superioreRef}
        className="absolute top-[0%] left-[12%] w-[70%] h-[30%]"
      >
        <Image
          src="/images/logo/superiore.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Bottom piece */}
      <div
        ref={inferioreRef}
        className="absolute bottom-[14%] left-[16%] w-[70%] h-[30%]"
      >
        <Image
          src="/images/logo/inferiore.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Left piece */}
      <div
        ref={sinistroRef}
        className="absolute top-[6%] left-[8%] w-[25%] h-[70%]"
      >
        <Image
          src="/images/logo/sinistro.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Right piece */}
      <div
        ref={destroRef}
        className="absolute top-[10%] right-[10%] w-[25%] h-[70%]"
      >
        <Image
          src="/images/logo/destro.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Letter S */}
      <div ref={sRef} className="absolute top-[18%] left-[33%] w-[14%] h-[50%]">
        <Image
          src="/images/logo/s.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>

      {/* Letter M */}
      <div ref={mRef} className="absolute top-[18%] left-[51%] w-[14%] h-[50%]">
        <Image
          src="/images/logo/m.png"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
