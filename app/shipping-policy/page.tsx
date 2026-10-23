import React from "react";
import Link from "next/link";

export default function ShippingPolicyPage() {
  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Shipping Policy</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight">
          Shipping <span className="font-serif italic">Policy</span>
        </h1>

        <div className="space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#281A13] p-8 border border-[#443026]">
          <h2 className="text-base font-semibold text-white">
            Complimentary Delivery
          </h2>
          <p>
            We offer complimentary standard shipping on all qualifying orders
            exceeding forty dollars across all domestic destinations.
          </p>

          <h2 className="text-base font-semibold text-white">Fulfillment Time</h2>
          <p>
            Orders received before noon are packaged with thermal protective
            materials and dispatched within one to two business days.
          </p>

          <h2 className="text-base font-semibold text-white">Tracking Notice</h2>
          <p>
            A tracking confirmation is automatically dispatched to your email
            address once your parcel leaves our temperature controlled
            fulfillment facility.
          </p>
        </div>
      </div>
    </div>
  );
}
