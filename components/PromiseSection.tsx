"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";

export default function PromiseSection() {
  const { promise } = siteData;
  const sectionRef = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        const angle = progress * 180;
        setRotation(angle);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#34241D] text-white py-20 sm:py-28 px-4 sm:px-8 lg:px-12 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto">
        {promise.sectionTitle && (
          <div className="text-center sm:text-left mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#C5C622] font-semibold">
              {promise.sectionTitle}
            </span>
          </div>
        )}

        <div className="relative min-h-[520px] lg:min-h-[640px] flex items-center justify-center">
          <div className="relative w-[280px] sm:w-[380px] lg:w-[460px] aspect-square flex items-center justify-center">
            <div
              className="absolute inset-[-14%] sm:inset-[-18%] z-0 pointer-events-none transition-transform duration-75 ease-out will-change-transform"
              style={{ transform: `rotate(${rotation}deg)` }}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 600 600"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="300"
                  cy="300"
                  r="276"
                  stroke="rgba(255, 255, 255, 0.42)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                <g transform="translate(24, 300)">
                  <circle
                    r="8.5"
                    fill="#34241D"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1.5"
                  />
                  <circle r="3.5" fill="#FFFFFF" />
                </g>

                <g transform="translate(515, 155)">
                  <circle
                    r="8.5"
                    fill="#34241D"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1.5"
                  />
                  <circle r="3.5" fill="#FFFFFF" />
                </g>

                <g transform="translate(240, 566)">
                  <circle
                    r="8.5"
                    fill="#34241D"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1.5"
                  />
                  <circle r="3.5" fill="#FFFFFF" />
                </g>
              </svg>
            </div>

            <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-2xl">
              <Image
                src={promise.centerGraphic}
                alt="Honest nutrition split bowl with fresh organic ingredients and wholesome recipe"
                fill
                priority
                className="object-contain"
              />

              <div
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white z-20 pointer-events-none shadow-sm"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="hidden lg:block absolute left-2 xl:left-8 top-1/2 -translate-y-1/2 max-w-xs text-right pr-4 z-20">
            <h3 className="font-serif italic text-3xl sm:text-4xl xl:text-5xl text-white mb-2 tracking-tight">
              Organic Certified
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Formulated with clean certified ingredients from trusted growers.
            </p>
          </div>

          <div className="hidden lg:block absolute right-2 xl:right-8 top-10 xl:top-14 max-w-xs text-left pl-4 z-20">
            <h3 className="font-serif italic text-3xl sm:text-4xl xl:text-5xl text-white mb-2 tracking-tight">
              Zero Fillers
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Absolutely free from synthetic additives, corn, wheat, and soy.
            </p>
          </div>

          <div className="hidden lg:block absolute right-2 xl:right-8 bottom-10 xl:bottom-14 max-w-xs text-left pl-4 z-20">
            <h3 className="font-serif italic text-3xl sm:text-4xl xl:text-5xl text-white mb-2 tracking-tight">
              Locally Sourced
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
              Raised sustainably on regional farms committed to animal welfare.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 lg:hidden border-t border-[#443026] pt-10 text-center sm:text-left">
          <div className="space-y-2">
            <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
              Organic Certified
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Formulated with clean certified ingredients from trusted growers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
              Zero Fillers
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Absolutely free from synthetic additives, corn, wheat, and soy.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif italic text-2xl sm:text-3xl text-white">
              Locally Sourced
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              Raised sustainably on regional farms committed to animal welfare.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
