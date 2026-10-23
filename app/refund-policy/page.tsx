import React from "react";
import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Refund Policy</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight">
          Refund <span className="font-serif italic">Policy</span>
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#281A13] p-8 border border-[#443026]">
          <h2 className="text-base font-semibold text-white">
            Thirty Day Satisfaction Guarantee
          </h2>
          <p>
            Your feline happiness is our absolute benchmark. If your cat does
            not enjoy any recipe, let us know within thirty days of delivery for
            a courteous full refund.
          </p>

          <h2 className="text-base font-semibold text-white">
            No Return Shipment Required
          </h2>
          <p>
            You do not need to ship open food back to us. We encourage donating
            unopened remaining cans or pouches to a local animal rescue shelter.
          </p>
        </div>
      </div>
    </div>
  );
}
