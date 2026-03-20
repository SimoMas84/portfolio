"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/app/context/ThemeContext";

// ============================================
// TYPES
// ============================================

interface Particle {
  x: number; // Position X (0 to canvas.width)
  y: number; // Position Y (0 to canvas.height)
  size: number; // Size in pixels (1-3)
  speedY: number; // Vertical speed (upward movement)
  opacity: number; // Transparency (0.1-0.3)
}

// ============================================
// COMPONENT
// ============================================

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ============================================
    // CANVAS SETUP
    // ============================================

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get 2D context");
      return;
    }

    // Set canvas size to match window

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // Safari-safe height
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      const documentHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
        viewportHeight,
      );
      canvas.height = documentHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ============================================
    // PARTICLES CONFIGURATION
    // ============================================

    const particleCount = 100;
    const particles: Particle[] = [];

    // ============================================
    // PARTICLE CREATION
    // ============================================

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1, // 1-3px
        speedY: Math.random() * 0.5 + 0.2, // 0.2-0.7 speed
        opacity: Math.random() * 0.2 + 0.1, // 0.1-0.3 opacity
      };
    };

    // Generate initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // ============================================
    // DRAWING FUNCTION
    // ============================================

    const drawParticles = () => {
      // Clear previous frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Theme-based particle color
      const particleColor =
        theme === "dark"
          ? "59, 130, 246" // Light blue (dark mode)
          : "89, 0, 255"; // Purple (light mode)

      // Draw each particle as a circle
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
        ctx.fill();
      });
    };

    // ============================================
    // UPDATE FUNCTION
    // ============================================

    const updateParticles = () => {
      particles.forEach((particle) => {
        // Move particle upward
        particle.y -= particle.speedY;

        // Reset particle when it goes off-screen
        if (particle.y + particle.size < 0) {
          particle.y = canvas.height + particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });
    };

    // ============================================
    // ANIMATION LOOP
    // ============================================

    const animate = () => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // ============================================
    // CLEANUP
    // ============================================

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]); // Re-run when theme changes

  // ============================================
  // RENDER
  // ============================================

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
  );
}
