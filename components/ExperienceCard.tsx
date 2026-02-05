interface ExperienceCardProps {
  year: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
}

export default function ExperienceCard({
  year,
  title,
  company,
  description,
  technologies,
}: ExperienceCardProps) {
  return (
    <div className="relative group">
      {/* Gradient border */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity" /> */}

      {/* Card content */}
      <div className="relative bg-light-surface/10 border border-light backdrop-blur-lg p-6 rounded-xl">
        {/* Year */}
        <div className="text-sm font-semibold text-light-accent mb-3">
          {year}
        </div>

        {/* Title & Company */}
        <h3 className="text-xl font-bold text-light-primary mb-1">
          {title}
        </h3>
        <p className="text-light-secondary mb-4">
          {company}
        </p>

        {/* Description */}
        <p className="text-light-secondary text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Technologies badges */}
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
  );
}