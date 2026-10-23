import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteData } from "@/data/siteData";

export default function HeroSection() {
  const { hero } = siteData;

  return (
    <section className="relative w-full h-[90vh] min-h-[90vh] flex items-center overflow-hidden bg-[#241812]">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.backgroundImage}
          alt="ValiuWhiskers Hero"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-16">
        <div className="max-w-xl text-white space-y-6">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-tight font-normal leading-[0.95]">
            <span className="font-bold">{hero.titlePrefix}</span>{" "}
            <span className="font-serif italic font-light">
              {hero.titleItalic}
            </span>
            <br />
            <span className="font-bold block mt-1">{hero.titleSuffix}</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-200 max-w-md leading-relaxed font-light">
            {hero.description}
          </p>

          <div className="pt-2">
            <Link
              href={hero.ctaHref}
              className="font-serif italic text-lg sm:text-xl underline underline-offset-4 decoration-1 hover:text-[#C5C622] transition-colors"
            >
              {hero.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
