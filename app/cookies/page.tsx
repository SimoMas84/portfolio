import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy for Simone Massaccesi portfolio website.",
};

export default function Cookies() {
  return (
    <main className="relative min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 lg:px-8 py-40 lg:py-60">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 leading-tight text-4xl lg:text-5xl">
          <span className="gradient-brand bg-clip-text text-transparent">
            Cookie Policy
          </span>
        </h1>
        <p className="text-light-secondary text-sm">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none space-y-8">
        {/* What are cookies */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            1. What Are Cookies
          </h2>
          <p className="text-light-secondary leading-relaxed">
            Cookies are small text files stored on your device when you visit a
            website. This website uses browser LocalStorage, which functions
            similarly to cookies, to enhance your experience.
          </p>
        </section>

        {/* How I use cookies */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            2. How I Use LocalStorage
          </h2>
          <p className="text-light-secondary leading-relaxed mb-4">
            This website uses LocalStorage for:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>
              <strong>Theme Preference</strong> - Remembering your dark/light
              mode choice
            </li>
          </ul>
          <p className="text-light-secondary leading-relaxed mt-4">
            <strong>Note:</strong> This data is stored locally in your browser
            and is not transmitted to any server or third party.
          </p>
        </section>

        {/* Types of cookies */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            3. Types of Data Storage
          </h2>

          <h3 className="text-xl font-semibold text-light-primary mb-3">
            3.1 Essential Storage
          </h3>
          <p className="text-light-secondary leading-relaxed mb-4">
            <strong>Theme Preference:</strong> Stores your dark/light mode
            selection
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-1 ml-4">
            <li>Purpose: Remember your visual preference</li>
            <li>Duration: Until you clear browser data</li>
            <li>Type: LocalStorage (not a cookie)</li>
          </ul>
        </section>

        {/* Third-party cookies */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            4. Third-Party Services
          </h2>
          <p className="text-light-secondary leading-relaxed mb-4">
            This website is hosted on Vercel, which may use cookies for:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>Security and DDoS protection</li>
            <li>Load balancing</li>
            <li>Performance monitoring</li>
          </ul>
          <p className="text-light-secondary leading-relaxed mt-4">
            For more information, see{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Vercel's Privacy Policy
            </a>
            .
          </p>
        </section>

        {/* Managing cookies */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            5. Managing LocalStorage and Cookies
          </h2>
          <p className="text-light-secondary leading-relaxed mb-4">
            You can control and delete LocalStorage data through your browser
            settings:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>
              <strong>Chrome:</strong> Settings → Privacy and security → Clear
              browsing data
            </li>
            <li>
              <strong>Firefox:</strong> Settings → Privacy & Security → Cookies
              and Site Data
            </li>
            <li>
              <strong>Safari:</strong> Preferences → Privacy → Manage Website
              Data
            </li>
            <li>
              <strong>Edge:</strong> Settings → Privacy, search, and services →
              Clear browsing data
            </li>
          </ul>
          <p className="text-light-secondary leading-relaxed mt-4">
            <strong>Note:</strong> Clearing this data will reset your theme
            preference to the default (dark mode).
          </p>
        </section>

        {/* Updates */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            6. Updates to This Policy
          </h2>
          <p className="text-light-secondary leading-relaxed">
            I may update this Cookie Policy from time to time. The updated
            version will be indicated by the "Last updated" date at the top of
            this page.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            7. Contact
          </h2>
          <p className="text-light-secondary leading-relaxed">
            If you have questions about this Cookie Policy, contact me at:{" "}
            <a
              href="mailto:mail@simonemassaccesi.it"
              className="text-blue-500 hover:underline"
            >
              mail@simonemassaccesi.it
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
