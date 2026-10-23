"use client";

import React, { useState } from "react";
import { siteData } from "@/data/siteData";
import ScrollReveal from "@/components/ScrollReveal";

export default function NewsletterSection() {
  const { newsletter } = siteData;
  const [email, setEmail] = useState("");
  const [consented, setConsented] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consented) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative w-full bg-[#34241D] text-white py-20 px-6 sm:px-10 lg:px-14 overflow-hidden border-t border-[#423028]">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-[800px] h-[800px] rounded-full border border-dashed border-stone-400" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <ScrollReveal direction="right" delay={100}>
          <div className="flex items-start space-x-4">
            <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center mt-1.5 shrink-0">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            <div className="space-y-3">
              <h3 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                {newsletter.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed font-light">
                {newsletter.description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={200} className="max-w-md w-full">
          <div>
            {submitted ? (
              <div className="p-4 rounded-lg bg-[#271A14] border border-[#443026] text-sm text-[#C5C622]">
                Thank you for joining our pack. Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={newsletter.emailPlaceholder}
                    className="w-full bg-transparent border-b border-stone-400 pb-2 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="newsletterConsent"
                    required
                    checked={consented}
                    onChange={(e) => setConsented(e.target.checked)}
                    className="w-4 h-4 rounded-xs border-stone-400 text-[#C5C622] focus:ring-0 focus:outline-none cursor-pointer"
                  />
                  <label
                    htmlFor="newsletterConsent"
                    className="text-xs text-stone-300 cursor-pointer"
                  >
                    {newsletter.consentText}
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-8 py-2 rounded-full bg-white text-[#241812] text-xs font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  {newsletter.buttonText}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
