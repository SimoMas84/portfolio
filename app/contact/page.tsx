"use client";

import { useState, useEffect } from "react";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ContactCard from "@/components/ContactCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ============================================
// TypeScript Interfaces
// ============================================

interface ContactInfo {
  icon: LucideIcon;
  title: string;
  value: string;
  href?: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

// ============================================
// Static Data
// ============================================

const contacts: ContactInfo[] = [
  {
    icon: Mail,
    title: "Email",
    value: "simone.massaccesi@hotmail.it",
    href: "mailto:simone.massaccesi@hotmail.it",
  },
  {
    icon: Linkedin,
    title: "Linkedin",
    value: "simonemassaccesi",
    href: "https://linkedin.com/in/simonemassaccesi",
  },
  {
    icon: Github,
    title: "GitHub",
    value: "SimoMas84",
    href: "https://github.com/SimoMas84",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Narni, Italy",
  },
];

const INITIAL_FORM_STATE: FormData = {
  name: "",
  email: "",
  message: "",
};

const TOAST_DURATION = 4000; // milliseconds

// ============================================
// Component
// ============================================

export default function Contact() {
  // ----------------------------------------
  // Animation refs
  // ----------------------------------------

  const titleRef = useScrollReveal({ y: 40, duration: 0.8 });
  const subtitleRef = useScrollReveal({ y: 30, duration: 0.8, delay: 0.2 });
  const cardsRef = useScrollReveal({
    y: 20,
    duration: 0.6,
    stagger: 0.1,
    batch: true,
  });
  const formRef = useScrollReveal({ y: 30, duration: 0.8, delay: 0.3 });

  // ----------------------------------------
  // State
  // ----------------------------------------

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [attempted, setAttempted] = useState<boolean>(false);

  // ----------------------------------------
  // Effects
  // ----------------------------------------

  // Auto-hide success message
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), TOAST_DURATION);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-hide error message
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), TOAST_DURATION);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // ----------------------------------------
  // Validation Functions
  // ----------------------------------------

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFieldValid = (field: keyof FormData, value: string): boolean => {
    if (field === "email") {
      return value.trim() !== "" && validateEmail(value);
    }
    return value.trim() !== "";
  };

  const isFormValid: boolean =
    isFieldValid("name", formData.name) &&
    isFieldValid("email", formData.email) &&
    isFieldValid("message", formData.message);

  // ----------------------------------------
  // Dynamic Styles
  // ----------------------------------------

  const getInputStyles = (field: keyof FormData, value: string): string => {
    const baseStyles =
      "w-full px-4 py-3 rounded-lg bg-white/10 text-light-primary placeholder:text-light-secondary outline-none transition-all border border-light";

    const hasValue = value.trim() !== "";

    // Empty field
    if (!hasValue) {
      // Show red if form submission was attempted
      if (attempted) {
        return `${baseStyles} shadow-[inset_0_0_16px_rgba(239,68,68,1)]`;
      }
      // Default: blue glow on focus
      return `${baseStyles} focus:shadow-[inset_0_0_16px_rgba(59,130,246,1)]`;
    }

    // Valid field: green glow
    if (isFieldValid(field, value)) {
      return `${baseStyles} shadow-[inset_0_0_16px_rgba(34,197,94,1)]`;
    }

    // Invalid field: red glow
    return `${baseStyles} shadow-[inset_0_0_16px_rgba(239,68,68,1)]`;
  };

  // ----------------------------------------
  // Event Handlers
  // ----------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setAttempted(true);

    // Frontend validation - block if invalid
    if (!isFormValid) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success: reset form
      setSuccess(true);
      setFormData(INITIAL_FORM_STATE);
      setAttempted(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------
  // Render
  // ----------------------------------------

  return (
    <>
      {/* Header - Centered */}
      <div className="text-center mb-12 lg:mb-20 max-w-5xl mx-auto">
        {/* Title with animation */}
        <h1 ref={titleRef as any} className="mb-4 leading-tight page-title">
          <span className="gradient-brand bg-clip-text text-transparent">
            Contact
          </span>
        </h1>

        {/* Subtitle with animation */}
        <p
          ref={subtitleRef as any}
          className="text-light-secondary page-subtitle"
        >
          Let's work together
        </p>
      </div>

      {/* Content: Cards + Form */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12">
        {/* Left Column: Contact Cards with stagger animation */}
        <div
          ref={cardsRef as any}
          className="flex flex-col gap-4 h-full justify-between"
        >
          {contacts.map((contact) => (
            <ContactCard
              key={contact.title}
              icon={contact.icon}
              title={contact.title}
              value={contact.value}
              href={contact.href}
            />
          ))}

          {/* Status Card */}
          <div className="p-5 bg-light-surface/10 backdrop-blur-lg border border-light rounded-xl">
            {/* Title with animated dot */}
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <h3 className="text-light-primary font-semibold">
                Available For Work
              </h3>
            </div>
            {/* Description */}
            <p className="text-light-secondary text-sm">
              Currently open to freelance projects and full-time opportunities.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form with animation */}
        <div ref={formRef as any}>
          <form
            onSubmit={handleSubmit}
            className="bg-light-surface/10 backdrop-blur-lg border border-light rounded-xl p-8"
          >
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-light-primary font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={getInputStyles("name", formData.name)}
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-light-primary font-medium mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={getInputStyles("email", formData.email)}
                placeholder="your@email.com"
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-light-primary font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                rows={5}
                onChange={handleChange}
                className={`${getInputStyles("message", formData.message)} resize-none`}
                placeholder="Your message..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-lg gradient-brand text-white font-semibold hover:opacity-90 transition-opacity hover:cursor-pointer disabled:opacity-50 disabled:cursor-wait"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      {success && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl bg-green-500 text-white font-medium shadow-lg animate-fade-in">
          Message sent successfully
        </div>
      )}

      {error && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl bg-red-500 text-white font-medium shadow-lg animate-fade-in">
          {error}
        </div>
      )}
    </>
  );
}
