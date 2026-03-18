import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pb-2 h-[80px]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <Link
            href="mailto:simone.massaccesi@hotmail.it"
            className="text-light-secondary hover:text-light-primary transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </Link>

          <Link
            href="https://www.linkedin.com/in/simonemassaccesi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-secondary hover:text-light-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </Link>

          <Link
            href="https://www.github.com/SimoMas84"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-secondary hover:text-light-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </Link>
        </div>

        {/* Policy Links */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Link
            href="/privacy"
            className="text-xs text-light-secondary hover:text-light-primary transition-colors hover:underline"
          >
            Privacy Policy
          </Link>
          <span className="text-light-secondary text-xs">•</span>
          <Link
            href="/cookies"
            className="text-xs text-light-secondary hover:text-light-primary transition-colors hover:underline"
          >
            Cookie Policy
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-light-secondary">
          © {currentYear} Simone Massaccesi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
