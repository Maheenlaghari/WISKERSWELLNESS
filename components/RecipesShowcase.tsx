import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/data/siteData";
import ScrollReveal from "@/components/ScrollReveal";

export default function RecipesShowcase() {
  const { recipesShowcase } = siteData;

  return (
    <section className="w-full bg-[#34241D] text-white pt-10 pb-6 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-sm sm:text-base font-normal tracking-wide text-stone-300 mb-6">
            {recipesShowcase.sectionTitle}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {recipesShowcase.items.map((item, idx) => (
            <ScrollReveal
              key={item.id}
              direction="up"
              delay={idx * 150}
              className="h-full"
            >
              <Link
                href={item.href}
                className="group relative block aspect-square sm:aspect-[4/3] md:aspect-[1/1] overflow-hidden rounded-none"
              >
                <Image
                  src={item.image}
                  alt={`${item.titleLine1} ${item.titleLine2}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div
                  className={`absolute p-8 z-10 ${
                    item.position === "top left"
                      ? "top-0 left-0"
                      : "bottom-0 left-0"
                  }`}
                >
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-none tracking-tight text-white drop-shadow-sm">
                    {item.titleLine1}
                    <br />
                    {item.titleLine2}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
