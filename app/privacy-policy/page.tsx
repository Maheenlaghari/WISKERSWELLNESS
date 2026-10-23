import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Privacy Policy</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight">
          Privacy <span className="font-serif italic">Policy</span>
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#281A13] p-8 border border-[#443026]">
          <h2 className="text-base font-semibold text-white">Data Protection</h2>
          <p>
            ValiuWhiskers is committed to respecting your privacy. We gather
            essential delivery and contact details solely to fulfill your orders
            and provide nutritional updates.
          </p>

          <h2 className="text-base font-semibold text-white">
            Secure Processing
          </h2>
          <p>
            Payment processing is encrypted with modern tokenization standards.
            We never store or trade raw financial credentials.
          </p>
        </div>
      </div>
    </div>
  );
}
