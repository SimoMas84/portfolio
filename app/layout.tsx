import type { Metadata } from "next";
import "./globals.css";
import { Poppins, JetBrains_Mono } from "next/font/google";
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
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
      <body className={`${poppins.className} ${jetbrainsMono.variable}`}>
        {/* Theme initialization script */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* App providers and components */}
        <ThemeProvider>
          <TransitionProvider>
            <ParticlesBackground />
            <Navbar />
            <PageTransition>
              <main className="relative mx-auto max-w-[2560px] px-4 lg:px-16 py-40 min-h-[calc(100dvh-100px)]">
                {children}
              </main>
            </PageTransition>
          </TransitionProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
