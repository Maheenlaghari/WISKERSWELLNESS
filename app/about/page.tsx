import React from "react";
import Image from "next/image";
import Link from "next/link";
import PromoBanner from "@/components/PromoBanner";
import NewsletterSection from "@/components/NewsletterSection";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-10 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">About Us</span>
        </div>

        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-tight">
            Devoted to <span className="font-serif italic">Pure</span>
            <br />
            Feline Vitality
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl font-light">
            Founded with a steadfast mission: To elevate feline nutrition by
            respecting biological balance. We create wholesome, preservative free
            meals crafted from clean harvest ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src="/assets/sec-2-2.avif"
              alt="Organic Essentials feline nutrition"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C5C622]">
              Our Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal leading-snug">
              Every Bowl Rooted in{" "}
              <span className="font-serif italic">Integrity</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              We partnered with certified animal nutritionists and regional
              family farmers to formulate recipes that honor natural carnivore
              biology. Each can and pouch contains nutrient dense protein, clean
              vitamins, and zero synthetic fillers.
            </p>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              From our humane sourcing practices to eco conscious packaging,
              every step reflects our unwavering reverence for animal welfare.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-block px-8 py-3 rounded-full bg-[#C5C622] text-[#241812] text-xs font-semibold uppercase tracking-wider hover:bg-[#B4B51E] transition-colors"
              >
                Explore Recipes
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-[#443026]">
          <div className="space-y-3">
            <h3 className="font-serif italic text-2xl text-white">
              Organic Certified
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              One hundred percent verified clean ingredients grown without
              chemical fertilizers or hazardous pesticides.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-serif text-2xl text-white">
              Zero Synthetic Fillers
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Never corn, wheat, soy, artificial flavors, chemical colorants, or
              harsh chemical binders.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-serif italic text-2xl text-white">
              Locally Sourced
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Proud partnerships with responsible regional agriculture
              advocating humane animal welfare standards.
            </p>
          </div>
        </div>
      </div>

      <PromoBanner />
      <NewsletterSection />
    </div>
  );
}
