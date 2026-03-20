"use client";
import ExperienceCard from "@/components/ExperienceCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ============================================
// TypeScript Interface
// ============================================

interface Experience {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

// ============================================
// Experience Data
// ============================================

const experiences: Experience[] = [
  {
    id: 1,
    year: "2000 - 2014",
    title: "Bar Owner & Full Stack Web Developer",
    company: "Bar Millennium s.n.c.",
    description:
      "Design, development, and maintenance of the company website built with HTML, CSS, JavaScript, PHP and MySQL, frontend and backend management.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    id: 2,
    year: "2016 - 2024",
    title: "Frontend Developer & Warehouse Manager",
    company: "Nuovo Centro Ricambi s.r.l.s.",
    description:
      "Design, development and maintenance of the website, built using HTML, CSS and JavaScript, focused on clarity and usability. In parallel, Warehouse and spare parts sales manager, responsible for inventory management, customer support and sales operations.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    year: "2025 - Present",
    title: "Frontend Developer Freelance",
    company: "Pizza D'Italia s.r.l.s.",
    description:
      "Design, development and maintenance of the website. Responsive and mobile-first application built with Next.js, TypeScript and Tailwind CSS. Optimized for performance, SEO and usability, featuring a modern layout and intuitive navigation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 4,
    year: "2026 - Present",
    title: "Full Stack Developer",
    company: "Personal Project",
    description:
      "Design, development and maintenance of a movie and series tracking app. User management, favorites and watchlists. Real-time updates via Supabase Realtime.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
    ],
  },
];

// ============================================
// Component
// ============================================

export default function Experience() {
  // Animation refs
  const titleRef = useScrollReveal({ y: 40, duration: 0.8 });
  const introRef = useScrollReveal({ y: 30, duration: 0.8, delay: 0.2 });
  const timelineRef = useScrollReveal({
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    batch: true,
  });

  return (
    <>
      {/* Header */}
      <div className="text-center mb-12 lg:mb-20">
        <h1 ref={titleRef as any} className="mb-4 leading-tight page-title">
          <span className="gradient-brand bg-clip-text text-transparent">
            Experience
          </span>
        </h1>
        <p ref={introRef as any} className="text-light-secondary page-subtitle">
          My professional journey
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 gradient-brand-vertical opacity-50" />

        {/* Card Container */}
        <div ref={timelineRef as any} className="flex flex-col gap-8 pl-8">
          {experiences.toReversed().map((exp, index) => (
            <div
              key={exp.id}
              className={`relative lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16 lg:self-start" : "lg:pl-8 lg:self-end"}`}
            >
              {/* Line Dot */}
              <div
                className={`absolute -left-[2.45rem] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full gradient-brand border-4 border-white 
                ${index % 2 === 0 ? "lg:left-auto lg:right-[0.5rem]" : "lg:-left-[1.50rem]"}`}
              />

              {/* Experience Card */}
              <ExperienceCard
                year={exp.year}
                title={exp.title}
                company={exp.company}
                description={exp.description}
                technologies={exp.technologies}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
