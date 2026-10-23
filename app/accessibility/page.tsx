import React from "react";
import Link from "next/link";

export default function AccessibilityPage() {
  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Accessibility Statement</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight">
          Accessibility <span className="font-serif italic">Statement</span>
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#281A13] p-8 border border-[#443026]">
          <h2 className="text-base font-semibold text-white">
            Inclusive Digital Experience
          </h2>
          <p>
            ValiuWhiskers is committed to providing a digital storefront that is
            accessible to all visitors, including individuals utilizing assistive
            technologies such as screen readers and keyboard navigation.
          </p>

          <h2 className="text-base font-semibold text-white">Feedback</h2>
          <p>
            If you encounter difficulty accessing any part of this website,
            please contact our care team at info@mysite.com for personalized
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
