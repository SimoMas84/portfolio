"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMagnetic } from "@/hooks/useMagnetic";

export default function Home() {
  // Magnetic refs (auto-disabilitati su mobile)
  const logoMagneticRef = useMagnetic<HTMLDivElement>(0.15);
  const nameMagneticRef = useMagnetic<HTMLSpanElement>(0.1);
  const surnameMagneticRef = useMagnetic<HTMLSpanElement>(0.1);
  const roleMagneticRef = useMagnetic<HTMLParagraphElement>(0.08);

  // Animation refs
  const logoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const surnameRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo entrance + floating loop
      const tl = gsap.timeline();

      tl.from(logoRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // Floating animation (loop infinito)
      gsap.to(logoRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Text reveal staggered
      tl.from(
        nameRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4",
      );

      tl.from(
        surnameRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      );

      tl.from(
        roleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative max-w-[2560px] min-h-[calc(100dvh-100px)] mx-auto px-4 lg:px-16">
      {/* Layout unico - responsive con Tailwind */}
      <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-[6dvw] text-center xl:text-left min-h-[calc(100vh-80px)] xl:px-16">
        {/* Logo - ordine cambia su desktop */}
        <div className="order-1 xl:order-2 flex-shrink-0 w-[50vw] min-w-[200px] max-w-[300px] xl:w-[400px] xl:max-w-[26vw] 2xl:w-[600px]">
          <div
            ref={(el) => {
              logoRef.current = el;
              logoMagneticRef.current = el;
            }}
            className="cursor-default"
          >
            <Image
              src="/images/logo-simone-massaccesi.png"
              alt="Simone Massaccesi Logo"
              width={600}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Text - ordine cambia su desktop */}
        <div className="order-2 xl:order-1 flex-shrink-0 space-y-2 xl:space-y-4">
          <h1 className="font-bold leading-tight hero-title">
            <span
              ref={(el) => {
                nameRef.current = el;
                nameMagneticRef.current = el;
              }}
              className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent xl:cursor-default"
            >
              Simone
            </span>
            <span
              ref={(el) => {
                surnameRef.current = el;
                surnameMagneticRef.current = el;
              }}
              className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent xl:cursor-default"
            >
              Massaccesi
            </span>
          </h1>
          <p
            ref={(el) => {
              roleRef.current = el;
              roleMagneticRef.current = el;
            }}
            className="text-light-primary xl:cursor-default hero-title"
          >
            Web Developer
          </p>
        </div>
      </div>
    </main>
  );
}
