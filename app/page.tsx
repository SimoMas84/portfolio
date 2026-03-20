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
    // Hide role text initially
    gsap.set(roleRef.current, { opacity: 0 });

    // Katakana characters for matrix effect
    const katakana = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const finalText = "Web Developer";

    // Scramble letter by letter with 2 fake chars before revealing the real one
    const scramble = () => {
      if (!roleRef.current) return;

      // Make element visible
      gsap.set(roleRef.current, { opacity: 1 });

      let currentText = " ".repeat(finalText.length);
      let charIndex = 0;
      let scrambleCount = 0;

      const revealNextChar = () => {
        if (charIndex >= finalText.length) return;

        // Show a random katakana char
        const randomKatakana1 =
          katakana[Math.floor(Math.random() * katakana.length)];
        const randomKatakana2 =
          katakana[Math.floor(Math.random() * katakana.length)];

        // Step 1: show first fake char
        currentText =
          finalText.slice(0, charIndex) +
          randomKatakana1 +
          " ".repeat(finalText.length - charIndex - 1);
        if (roleRef.current) roleRef.current.textContent = currentText;

        setTimeout(() => {
          // Step 2: show second fake char
          currentText =
            finalText.slice(0, charIndex) +
            randomKatakana2 +
            " ".repeat(finalText.length - charIndex - 1);
          if (roleRef.current) roleRef.current.textContent = currentText;

          setTimeout(() => {
            // Step 3: reveal real char
            currentText =
              finalText.slice(0, charIndex + 1) +
              " ".repeat(finalText.length - charIndex - 1);
            if (roleRef.current) roleRef.current.textContent = currentText;

            charIndex++;
            scrambleCount = 0;

            // Move to next character
            setTimeout(revealNextChar, 60);
          }, 40);
        }, 40);
      };

      revealNextChar();
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
      y: -20,
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

      const allChars = [...splitName.chars, ...splitSurname.chars];
      const totalChars = allChars.length;
      allChars.forEach((char, index) => {
        const position = (index / (totalChars - 1)) * 100;
        gsap.set(char, {
          backgroundImage:
            "linear-gradient(to right, #3455ff, #96b1f8, #6bcbc6)",
          backgroundSize: `${totalChars * 100}%`,
          backgroundPosition: `${position}%`,
          backgroundClip: "text",
          webkitBackgroundClip: "text",
          color: "transparent",
        });
      });

      // Animate letters of "Simone"
      tl.from(
        splitName.chars,
        {
          opacity: 0,
          scale: 1.5,
          y: -30,
          duration: 0.08,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.4",
      );

      // Animate letters of "Massaccesi"
      tl.from(splitSurname.chars, {
        opacity: 0,
        scale: 1.5,
        y: -30,
        duration: 0.08,
        stagger: 0.06,
        ease: "power2.out",
      });

      // Scramble starts after name finishes
      tl.call(scramble, [], "+=0.2");

      // Loop scramble every 20 seconds
      interval = setInterval(scramble, 10000);
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
    <div className="-my-40 relative max-w-[2560px] mx-auto px-4 lg:px-16">
      <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-[12dvw] text-center xl:text-left min-h-[calc(100dvh-100px)] xl:px-16">
        {/* Logo */}
        <div className="order-1 xl:order-2 flex-shrink-0 w-[40vw] min-w-[150px] max-w-[250px] xl:w-[300px] xl:max-w-[20vw] 2xl:w-[400px]">
          <div ref={logoRef} className="relative aspect-square cursor-default">
            <AnimatedLogo />
          </div>
        </div>

        {/* Text */}
        <div className="order-2 xl:order-1 flex-shrink-0 space-y-2 xl:space-y-4">
          <h1 className="leading-tight hero-title">
            {/* Wrapper con gradiente */}
            <span className="block gradient-brand bg-clip-text text-transparent">
              <span ref={nameRef}>Simone</span>
            </span>
            <span className="block gradient-brand bg-clip-text text-transparent">
              <span ref={surnameRef}>Massaccesi</span>
            </span>
          </h1>
          {/* Fixed height wrapper to prevent layout shift during scramble */}
          <div className="relative h-[1.5em] w-full">
            <p
              ref={roleRef}
              className="absolute left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0 text-light-primary hero-title whitespace-nowrap font-jetbrains"
            >
              Web Developer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
