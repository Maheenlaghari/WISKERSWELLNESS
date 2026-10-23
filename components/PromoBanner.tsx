import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import ScrollReveal from "@/components/ScrollReveal";

export default function PromoBanner() {
  const { promo } = siteData;

  return (
    <section className="w-full bg-[#34241D] px-6 sm:px-10 lg:px-14 py-8">
      <ScrollReveal direction="none" delay={100}>
        <div className="max-w-7xl mx-auto relative overflow-hidden min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-end lg:justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={promo.backgroundImage}
              alt="Nourish More Save More with ValiuWhiskers"
              fill
              className="object-cover object-center"
            />
          </div>

          <ScrollReveal direction="right" delay={250} className="relative z-10">
            <div className="w-full sm:w-[360px] md:w-[400px] lg:w-[420px] bg-[#C5C622] text-[#241812] p-8 sm:p-10 lg:p-12 flex flex-col justify-between shadow-2xl min-h-[460px] sm:min-h-[520px]">
              <div>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight">
                  {promo.titleLine1}
                  <br />
                  {promo.titleLine2}
                </h3>
                <p className="font-serif italic text-3xl sm:text-4xl lg:text-5xl mt-1 mb-8">
                  {promo.titleItalic}
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-xs sm:text-sm text-[#241812] leading-relaxed max-w-xs font-medium">
                  {promo.description}
                </p>
                <Link
                  href={promo.ctaHref}
                  className="inline-block px-8 py-3 rounded-full bg-[#34241D] text-white text-xs sm:text-sm font-semibold hover:bg-[#251710] transition-colors"
                >
                  {promo.ctaText}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </section>
  );
}
