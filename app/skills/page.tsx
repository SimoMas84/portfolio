"use client";

import SkillCard from "@/components/SkillCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiNextdotjs,
  SiGit,
  SiGithub,
} from "react-icons/si";

// ============================================
// TypeScript Interface
// ============================================

interface Skill {
  icon: any;
  name: string;
  level: number;
}

// ============================================
// Skills Data
// ============================================

const skills: Skill[] = [
  { icon: SiHtml5, name: "HTML", level: 85 },
  { icon: SiCss3, name: "CSS", level: 80 },
  { icon: SiTailwindcss, name: "Tailwind", level: 75 },
  { icon: SiJavascript, name: "JavaScript", level: 70 },
  { icon: SiTypescript, name: "TypeScript", level: 60 },
  { icon: SiReact, name: "React", level: 80 },
  { icon: SiNodedotjs, name: "Node.js", level: 60 },
  { icon: SiNextdotjs, name: "Next.js", level: 75 },
  { icon: SiGit, name: "Git", level: 70 },
  { icon: SiGithub, name: "GitHub", level: 70 },
];

// ============================================
// Component
// ============================================

export default function Skills() {
  // Animation refs
  const titleRef = useScrollReveal({ y: 40, duration: 0.8 });
  const introRef = useScrollReveal({ y: 30, duration: 0.8, delay: 0.2 });
  const gridRef = useScrollReveal({
    y: 20,
    duration: 0.6,
    stagger: 0.08,
    batch: true,
  });

  return (
    <>
      {/* Header - Centered */}
      <div className="text-center mb-12 lg:mb-16 max-w-5xl mx-auto">
        {/* Title with animation */}
        <h1
          ref={titleRef as any}
          className="mb-4 lg:mb-4 leading-tight page-title"
        >
          <span className="gradient-brand bg-clip-text text-transparent">
            Skills
          </span>
        </h1>

        {/* Intro text with animation */}
        <p
          ref={introRef as any}
          className="text-light-secondary leading-relaxed page-subtitle"
        >
          Self-taught web developer with hands-on experience in modern
          technologies. Continuously learning through real projects and
          university courses like Harvard's CS50.
        </p>
      </div>

      {/* Skills Grid with stagger animation */}
      <div
        ref={gridRef as any}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 2xl:gap-10 max-w-7xl mx-auto"
      >
        {skills.map((skill) => (
          <SkillCard
            key={skill.name}
            icon={skill.icon}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </>
  );
}
