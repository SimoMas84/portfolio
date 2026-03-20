import { IconType } from "react-icons";
import BorderGlow from "./BorderGlow";

interface SkillCardProps {
  icon: IconType;
  name: string;
  level: number;
}

export default function SkillCard({ icon: Icon, name, level }: SkillCardProps) {
  return (
    <BorderGlow
      glowColor="210 80 70"
      borderRadius={12}
      backgroundColor="rgba(255, 255, 255, 0.15)"
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      colors={["#3455ff", "#96b1f8", "#6bcbc6"]}
    >
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <Icon className="w-12 h-12 text-light-primary" />
        </div>
        <h3 className="text-center text-light-primary mb-3">{name}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="gradient-brand h-full rounded-full transition-all duration-500"
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </BorderGlow>
  );
}
