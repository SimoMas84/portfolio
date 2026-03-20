import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Simone Massaccesi portfolio website.",
};

export default function Privacy() {
  return (
    <main className="relative min-h-[calc(100vh-80px)] max-w-4xl mx-auto px-4 lg:px-8 py-40 lg:py-60">
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 leading-tight text-4xl lg:text-5xl">
          <span className="gradient-brand bg-clip-text text-transparent">
            Privacy Policy
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
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            1. Introduction
          </h2>
          <p className="text-light-secondary leading-relaxed">
            This Privacy Policy describes how Simone Massaccesi ("I", "me", or
            "my") collects, uses, and protects your personal information when
            you visit simonemassaccesi.it (the "Website").
          </p>
        </section>

        {/* Information Collection */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            2. Information I Collect
          </h2>
          <h3 className="text-xl font-semibold text-light-primary mb-3">
            2.1 Information You Provide
          </h3>
          <p className="text-light-secondary leading-relaxed mb-4">
            When you use the contact form, I collect:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Message content</li>
          </ul>

          <h3 className="text-xl font-semibold text-light-primary mb-3 mt-6">
            2.2 Automatically Collected Information
          </h3>
          <p className="text-light-secondary leading-relaxed mb-4">
            I may automatically collect:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
          </ul>
        </section>

        {/* How I Use Information */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            3. How I Use Your Information
          </h2>
          <p className="text-light-secondary leading-relaxed mb-4">
            I use the collected information to:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>Respond to your inquiries via the contact form</li>
            <li>Improve the website experience</li>
            <li>Analyze website usage and performance</li>
            <li>Remember your theme preference (dark/light mode)</li>
          </ul>
        </section>

        {/* Data Storage */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            4. Data Storage and Security
          </h2>
          <p className="text-light-secondary leading-relaxed mb-4">
            Your contact form submissions are processed via Resend email service
            and stored temporarily for communication purposes only. Theme
            preferences are stored locally in your browser using LocalStorage.
          </p>
          <p className="text-light-secondary leading-relaxed">
            I implement reasonable security measures to protect your personal
            information, but no method of transmission over the Internet is 100%
            secure.
          </p>
        </section>

        {/* Third-Party Services */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            5. Third-Party Services
          </h2>
          <p className="text-light-secondary leading-relaxed mb-4">
            This website uses:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>
              <strong>Resend</strong> - Email delivery service for contact form
              submissions
            </li>
            <li>
              <strong>Vercel</strong> - Website hosting provider
            </li>
          </ul>
          <p className="text-light-secondary leading-relaxed mt-4">
            These services have their own privacy policies governing their use
            of your information.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            6. Your Rights (GDPR)
          </h2>
          <p className="text-light-secondary leading-relaxed mb-4">
            Under GDPR, you have the right to:
          </p>
          <ul className="list-disc list-inside text-light-secondary space-y-2 ml-4">
            <li>
              <strong>Access</strong> - Request a copy of your personal data
            </li>
            <li>
              <strong>Rectification</strong> - Request correction of inaccurate
              data
            </li>
            <li>
              <strong>Erasure</strong> - Request deletion of your data
            </li>
            <li>
              <strong>Restriction</strong> - Request limitation of processing
            </li>
            <li>
              <strong>Portability</strong> - Request transfer of your data
            </li>
            <li>
              <strong>Objection</strong> - Object to processing of your data
            </li>
          </ul>
          <p className="text-light-secondary leading-relaxed mt-4">
            To exercise these rights, contact me at:{" "}
            <a
              href="mailto:mail@simonemassaccesi.it"
              className="text-blue-500 hover:underline"
            >
              mail@simonemassaccesi.it
            </a>
          </p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            7. Data Retention
          </h2>
          <p className="text-light-secondary leading-relaxed">
            I retain your contact form information only as long as necessary to
            respond to your inquiry, after which it is deleted. Theme
            preferences remain in your browser's LocalStorage until manually
            cleared.
          </p>
        </section>

        {/* Children's Privacy */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            8. Children's Privacy
          </h2>
          <p className="text-light-secondary leading-relaxed">
            This website is not intended for children under 13 years of age. I
            do not knowingly collect personal information from children under
            13.
          </p>
        </section>

        {/* Changes to Policy */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            9. Changes to This Policy
          </h2>
          <p className="text-light-secondary leading-relaxed">
            I may update this Privacy Policy from time to time. The updated
            version will be indicated by the "Last updated" date at the top of
            this page.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-light-primary mb-4">
            10. Contact Me
          </h2>
          <p className="text-light-secondary leading-relaxed">
            If you have questions about this Privacy Policy, please contact me
            at:
          </p>
          <p className="text-light-secondary mt-4">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:mail@simonemassaccesi.it"
              className="text-blue-500 hover:underline"
            >
              mail@simonemassaccesi.it
            </a>
            <br />
            <strong>Location:</strong> Narni, Italy
          </p>
        </section>
      </div>
    </main>
  );
}
