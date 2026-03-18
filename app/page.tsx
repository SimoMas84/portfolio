"use client";

import AnimatedLogo from "@/components/AnimatedLogo";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTransition } from "@/app/context/TransitionContext";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function Home() {
  const pathname = usePathname();
  const { isTransitioning } = useTransition();

  // Animation refs
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const surnameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Don't run animations while page is transitioning in
    if (isTransitioning) return;

    // Hide role text initially
    gsap.set(roleRef.current, { opacity: 0 });

    // --- SCRAMBLE ANIMATION on "Web Developer" ---
    const scramble = () => {
      gsap.to(roleRef.current, { opacity: 1, duration: 0.1 });
      gsap.to(roleRef.current, {
        duration: 1.0,
        scrambleText: {
          text: "Web Developer",
          chars: "!@#$%^&*",
          speed: 0.1,
        },
        ease: "none",
      });
    };

    // --- LOGO ANIMATION ---
    const tl = gsap.timeline();
    let interval: ReturnType<typeof setInterval>;

    tl.from(logoRef.current, {
      opacity: 0,
      scale: 0.5,
      duration: 0.8,
      ease: "back.out(1.7)",
    });

    // Floating loop
    gsap.to(logoRef.current, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // --- NAME & SURNAME STAGGER ANIMATION ---
    // Wait for fonts before splitting, then build the full text + scramble sequence
    document.fonts.ready.then(() => {
      // Revert any previous split before creating a new one
      if (nameRef.current) nameRef.current.innerHTML = "Simone";
      if (surnameRef.current) surnameRef.current.innerHTML = "Massaccesi";

      const splitName = SplitText.create(nameRef.current, { type: "chars" });
      const splitSurname = SplitText.create(surnameRef.current, {
        type: "chars",
      });

      // Animate letters of "Simone"
      tl.from(
        splitName.chars,
        {
          opacity: 0,
          y: 20,
          duration: 0.08,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.4",
      );

      // Animate letters of "Massaccesi"
      tl.from(splitSurname.chars, {
        opacity: 0,
        y: 20,
        duration: 0.08,
        stagger: 0.06,
        ease: "power2.out",
      });

      // Scramble starts after name finishes
      tl.call(scramble, [], "+=0.2");

      // Loop scramble every 20 seconds
      interval = setInterval(scramble, 20000);
    });

    // Cleanup on unmount or pathname change
    return () => {
      tl.kill();
      clearInterval(interval);
      gsap.killTweensOf([
        logoRef.current,
        roleRef.current,
        nameRef.current,
        surnameRef.current,
      ]);
    };
  }, [pathname, isTransitioning]);

  return (
    <main className="relative max-w-[2560px] min-h-[calc(100dvh-100px)] mx-auto px-4 lg:px-16">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-[6dvw] text-center xl:text-left min-h-[calc(100vh-80px)] xl:px-16">
        {/* Logo */}
        <div className="order-1 xl:order-2 flex-shrink-0 w-[50vw] min-w-[200px] max-w-[300px] xl:w-[400px] xl:max-w-[26vw] 2xl:w-[600px]">
          <div ref={logoRef} className="relative aspect-square cursor-default">
            <AnimatedLogo />
          </div>
        </div>

        {/* Text */}
        <div className="order-2 xl:order-1 flex-shrink-0 space-y-2 xl:space-y-4">
          <h1 className="font-bold leading-tight hero-title">
            <span ref={nameRef} className="block text-blue-500">
              Simone
            </span>
            <span ref={surnameRef} className="block text-blue-500">
              Massaccesi
            </span>
          </h1>
          {/* Fixed height wrapper to prevent layout shift during scramble */}
          <div className="relative h-[1.5em] w-full">
            <p
              ref={roleRef}
              className="absolute left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0 text-light-primary hero-title whitespace-nowrap"
            >
              Web Developer
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
