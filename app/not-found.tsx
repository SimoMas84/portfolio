import TransitionLink from "@/components/TransitionLink";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[2560px] px-4 lg:px-16 py-40 min-h-screen flex flex-col items-center justify-center text-center">
      {/* Error Code */}
      <h1
        className="font-bold mb-4"
        style={{ fontSize: "clamp(6rem, 20vw, 15rem)" }}
      >
        <span className="gradient-brand bg-clip-text text-transparent">
          404
        </span>
      </h1>

      {/* Message */}
      <h2
        className="text-light-primary font-semibold mb-4"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
      >
        Page Not Found
      </h2>

      <p className="text-light-secondary mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      {/* Back Home Button */}
      <TransitionLink
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-white font-semibold hover:opacity-90 transition-opacity"
      >
        <Home size={20} />
        Back to Home
      </TransitionLink>
    </main>
  );
}
