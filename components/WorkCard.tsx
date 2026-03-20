import Image from "next/image";
import Link from "next/link";

interface WorkCardProps {
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
}

export default function WorkCard({
  title,
  description,
  image,
  url,
  technologies,
}: WorkCardProps) {
  return (
    // Wrapper for GSAP animation (outer)
    <div className="w-full h-full">
      {/* Card with hover effects (inner) */}
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full group"
      >
        <div className="relative overflow-hidden rounded-xl border border-light h-full flex flex-col transition-transform duration-300 hover:scale-105">
          {/* Image Background */}
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Content with glassmorphism */}
          <div className="bg-light-surface/10 backdrop-blur-lg p-6 flex flex-col flex-grow">
            {/* Title */}
            <h3 className="text-xl font-light mb-2 text-light-secondary">
              {title}
            </h3>

            {/* Description */}
            <p className="text-light-secondary font-light text-sm mb-4 flex-grow line-clamp-2">
              {description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-light-accent/10 text-light-accent rounded-lg border border-light-accent/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
