"use client";

import { useState, useRef, FormEvent, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { Zap, Rocket } from "lucide-react";

declare global {
  interface Window {
    grecaptcha: {
      getResponse: () => string;
      reset: () => void;
    };
  }
}

export default function ContactSection() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<{
    message: string;
    type: "success" | "error" | "loading" | "";
  }>({ message: "", type: "" });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    let recaptchaResponse = "";
    try {
      recaptchaResponse = window.grecaptcha?.getResponse() || "";
    } catch {
      // reCAPTCHA might not be loaded
    }

    if (!recaptchaResponse) {
      setStatus({ message: "Please complete the reCAPTCHA.", type: "error" });
      return;
    }

    setStatus({ message: "Sending...", type: "loading" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          "g-recaptcha-response": recaptchaResponse,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ message: "Message sent successfully!", type: "success" });
        form.reset();
        try {
          window.grecaptcha?.reset();
        } catch {
          // ignore
        }
      } else {
        setStatus({
          message: data.msg || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch {
      setStatus({
        message: "An error occurred. Please try again later.",
        type: "error",
      });
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal variant="hologram" duration={1000}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 text-center">
            Let&apos;s <span className="text-yellow-400">Connect</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200}>
          <p className="text-neutral-400 text-center mb-8 sm:mb-12 font-mono text-xs sm:text-sm">
            {"//"} Drop me a message
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Animated GIF */}
          <ScrollReveal variant="warp-in" delay={300} className="order-2 lg:order-1">
            <div className="rounded-xl overflow-hidden relative">
              <img
                src="/ezgif.com-gif-maker.gif"
                alt="Coding Animation"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-xs text-neutral-500 text-center mt-2 font-mono flex items-center justify-center gap-2">
              {"//"} My typical coding vibe <Zap size={12} className="text-yellow-400" />
            </p>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal variant="cyber-slide" delay={400} className="order-1 lg:order-2">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-yellow-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border-2 border-neutral-800 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors font-mono"
                  placeholder="your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-yellow-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border-2 border-neutral-800 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors font-mono"
                  placeholder="name@.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-mono text-yellow-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 bg-neutral-900 border-2 border-neutral-800 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors font-mono"
                  placeholder="Project Collaboration"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-yellow-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-neutral-900 border-2 border-neutral-800 rounded-lg text-white focus:border-yellow-400 focus:outline-none transition-colors font-mono resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {mounted && (
                <div
                  className="g-recaptcha"
                  data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                />
              )}

              <button type="submit" className="btn btn-primary btn-submit">
                <span className="btn-corner tl" />
                <span className="btn-corner tr" />
                <span className="btn-corner bl" />
                <span className="btn-corner br" />
                <span className="btn-label flex items-center justify-center gap-2">
                  <Rocket size={16} /> Send Message
                </span>
              </button>

              {status.message && (
                <div
                  className={`text-center text-sm font-mono ${
                    status.type === "success"
                      ? "text-green-400"
                      : status.type === "error"
                      ? "text-red-400"
                      : "text-neutral-400"
                  }`}
                >
                  {status.message}
                </div>
              )}
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
