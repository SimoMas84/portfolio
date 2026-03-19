"use client";

import WorkCard from "@/components/WorkCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ============================================
// TypeScript Interface
// ============================================

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
}

// ============================================
// Projects Data
// ============================================

const projects: Project[] = [
  {
    id: 1,
    title: "Magna Pizza Narni",
    description: "Website for local pizzeria with menu",
    image: "/works/magna-pizza-narni.jpg",
    url: "https://www.magnapizzanarni.com",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: 2,
    title: "Nuovo Centro Ricambi",
    description:
      "Restyling and refactoring website for commercial vehicle spare parts warehouse",
    image: "/works/nuovo-centro-ricambi.jpg",
    url: "https://nuovocentroricambi.vercel.app",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: 3,
    title: "Caffè Millennium",
    description:
      "Restyling and refactoring website for local bar with menu and events",
    image: "/works/caffe-millennium.jpg",
    url: "https://caffemillennium.vercel.app",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Motion", "GSAP"],
  },

  {
    id: 4,
    title: "MovieApp",
    description:
      "App database for movies and series. User management,favorites and watchlists. Real-time updates via Supabase Realtime.",
    image: "/works/movieapp.jpg",
    url: "https://movieapp.it",
    technologies: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
  },
];

// ============================================
// Component
// ============================================

export default function Works() {
  // Animation refs
  const titleRef = useScrollReveal({ y: 40, duration: 0.8 });
  const subtitleRef = useScrollReveal({ y: 30, duration: 0.8, delay: 0.2 });
  const gridRef = useScrollReveal({
    y: 20,
    duration: 0.6,
    stagger: 0.12,
    batch: true,
  });

  return (
    <>
      {/* Header - Centered */}
      <div className="text-center mb-12 lg:mb-20 max-w-5xl mx-auto">
        {/* Title with animation */}
        <h1 ref={titleRef as any} className="mb-4 leading-tight page-title">
          <span className="gradient-brand bg-clip-text text-transparent">
            Works
          </span>
        </h1>

        {/* Subtitle with animation */}
        <p
          ref={subtitleRef as any}
          className="text-light-secondary page-subtitle"
        >
          My recent projects
        </p>
      </div>

      {/* Projects Grid with stagger animation - 2 columns for larger cards */}
      <div
        ref={gridRef as any}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto"
      >
        {projects.toReversed().map((project) => (
          <WorkCard
            key={project.id}
            title={project.title}
            description={project.description}
            image={project.image}
            url={project.url}
            technologies={project.technologies}
          />
        ))}
      </div>
    </>
  );
}
