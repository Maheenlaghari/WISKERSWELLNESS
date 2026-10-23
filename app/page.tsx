import React from "react";
import HeroSection from "@/components/HeroSection";
import RecipesShowcase from "@/components/RecipesShowcase";
import PromiseSection from "@/components/PromiseSection";
import PromoBanner from "@/components/PromoBanner";
import MostLovedSection from "@/components/MostLovedSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <RecipesShowcase />
      <PromiseSection />
      <PromoBanner />
      <MostLovedSection />
      <NewsletterSection />
    </div>
  );
}
