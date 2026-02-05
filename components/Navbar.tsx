"use client";

import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import {
  Home,
  Code2,
  Briefcase,
  LayoutPanelTop,
  Mail,
  Sun,
  Moon,
} from "lucide-react";

// TypeScript interface
interface NavLink {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
}

// Navigation data
const navLinks: NavLink[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/skills", icon: Code2, label: "Skills" },
  { href: "/experience", icon: Briefcase, label: "Experience" },
  { href: "/works", icon: LayoutPanelTop, label: "Works" },
  { href: "/contact", icon: Mail, label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-light-surface/10 backdrop-blur-lg border border-light rounded-xl px-6 py-5 shadow-lg">
        <div className="flex items-center gap-2">
          {/* Navigation Links */}
          <ul className="flex items-center justify-center gap-2 md:gap-10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300
                      ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-light-primary hover:bg-blue-400/20"
                      }`}
                  >
                    <Icon size={20} />
                    <span className="hidden md:inline">{link.label}</span>
                  </TransitionLink>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="w-px h-6 bg-light-border" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-light-primary hover:bg-blue-400/20 transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
