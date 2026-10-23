import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Terms and Conditions</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight">
          Terms and <span className="font-serif italic">Conditions</span>
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#281A13] p-8 border border-[#443026]">
          <h2 className="text-base font-semibold text-white">General Usage</h2>
          <p>
            By accessing and purchasing from ValiuWhiskers, you acknowledge and
            agree to these terms and conditions alongside our privacy practices.
          </p>

          <h2 className="text-base font-semibold text-white">
            Recipe Formulations
          </h2>
          <p>
            All recipes are formulated to fulfill complete nutritional levels
            established by feline dietary profiles. Consult your veterinary
            professional for specific dietary considerations.
          </p>
        </div>
      </div>
    </div>
  );
}
