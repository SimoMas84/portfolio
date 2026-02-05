import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { TransitionProvider } from "./context/TransitionContext";
import PageTransition from "@/components/PageTransition";
import ParticlesBackground from "@/components/ParticlesBackground";

// ============================================
// Metadata (SEO)
// ============================================

export const metadata: Metadata = {
  // Basic SEO
  title: "Simone Massaccesi | Web Developer",
  description:
    "Web developer with hands-on experience in modern technologies. Specialized in React, Node.js, Next.js, TypeScript, Tailwind CSS, PostgreSQL, MongoDB.",
  keywords: [
    "Simone Massaccesi",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "Portfolio",
    "Freelance Developer",
    "Narni",
    "Italy",
  ],
  authors: [{ name: "Simone Massaccesi" }],
  creator: "Simone Massaccesi",

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simonemassaccesi.it",
    siteName: "Simone Massaccesi Portfolio",
    title: "Simone Massaccesi | Web Developer",
    description:
      "Web developer with hands-on experience in modern technologies. Specialized in React, Node.js, Next.js, TypeScript, Tailwind CSS, PostgreSQL, MongoDB.",
    images: [
      {
        url: "https://simonemassaccesi.it/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Simone Massaccesi - Web Developer Portfolio",
      },
    ],
  },

  // Geolocation metadata
  other: {
    "geo.region": "IT-TR", // IT = Italy, TR = Terni province
    "geo.placename": "Narni",
    "geo.country": "IT",
    coverage: "Worldwide",
    distribution: "Global",
    rating: "General",
  },

  // Additional metadata
  metadataBase: new URL("https://simonemassaccesi.it"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ============================================
// Font Configuration
// ============================================

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// ============================================
// Theme Script (Prevent Flash)
// ============================================

const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  })();
`;

// ============================================
// Root Layout
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        {/* Theme initialization script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* App providers and components */}
        <ThemeProvider>
          <TransitionProvider>
            <ParticlesBackground />
            <Navbar />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </TransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
