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
      {/* Card content */}
      <div className="relative bg-light-surface/10 border border-light backdrop-blur-lg p-6 rounded-xl">
        {/* Year */}
        <div className="text-sm font-semibold text-light-accent mb-3">
          {year}
        </div>

        {/* Title & Company */}
        <h3 className="text-2xl text-light-primary mb-1">{title}</h3>
        <p className="text-light-secondary font-light mb-4">{company}</p>

        {/* Description */}
        <p className="text-light-secondary font-extralight leading-relaxed mb-4">
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
