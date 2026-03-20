import type { LucideIcon } from "lucide-react";

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
}

export default function ContactCard({
  icon: Icon,
  title,
  value,
  href,
}: ContactCardProps) {
  const cardContent = (
    <>
      {/* Icon */}
      <div className="p-3 rounded-lg gradient-brand">
        <Icon size={24} className="text-white" />
      </div>

      {/* Text */}
      <div>
        <p className="text-light-secondary text-sm">{title}</p>
        <p className="text-light-primary text-sm md:text-base lg:text-lg">
          {value}
        </p>
      </div>
    </>
  );

  const baseStyles =
    "flex flex-1 items-center gap-4 p-5 bg-light-surface/10 backdrop-blur-lg border border-light rounded-xl";
  const hoverStyles = href
    ? "transition-transform duration-300 hover:scale-105"
    : "";

  // Wrapper for GSAP (outer)
  return (
    <div className="w-full">
      {/* Card with hover effects (inner) */}
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyles} ${hoverStyles}`}
        >
          {cardContent}
        </a>
      ) : (
        <div className={baseStyles}>{cardContent}</div>
      )}
    </div>
  );
}
