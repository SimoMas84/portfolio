import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="h-[100px] max-w-4xl mx-auto">
        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <Link
            href="mailto:mail@simonemassaccesi.it"
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
            href="https://www.github.com/simonemassaccesi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light-secondary hover:text-light-primary transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </Link>
        </div>

        {/* Policy Links */}
        <div className="flex items-center justify-center gap-4">
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
        <p className="text-center text-xs text-light-secondary p-2">
          © {currentYear} Simone Massaccesi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
