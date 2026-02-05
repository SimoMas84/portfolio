import { IconType } from "react-icons";

interface SkillCardProps {
  icon: IconType;
  name: string;
  level: number;
}

export default function SkillCard({ icon: Icon, name, level }: SkillCardProps) {
  return (
    <div className="relative group">
      {/* Gradient border */}
      {/* <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500'/> */}

      {/* Card Content */}
      <div className="relative bg-light-surface/10 border border-light backdrop-blur-lg p-6 rounded-xl hover:scale-110 duration-500">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Icon className="w-12 h-12 text-light-primary" />
        </div>

        {/* Name */}
        <h3 className="text-center font-semibold text-light-primary mb-3">
          {name}
        </h3>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </div>
  );
}
