"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { siteData } from "@/data/siteData";

export default function PromiseSection() {
  const { promise } = siteData;
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current || !ringRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom >= -300 && rect.top <= windowHeight + 300) {
        const centerOffset = windowHeight / 2 - (rect.top + rect.height / 2);
        const angle = centerOffset * 0.25;
        ringRef.current.style.transform = `rotate(${angle}deg)`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
          <div className="text-center sm:text-left mb-6 sm:mb-10">
            <span className="text-sm text-[#E2D8CC] font-normal tracking-normal opacity-90">
              {promise.sectionTitle}
            </span>
          </div>
        )}

        <div className="relative min-h-[520px] lg:min-h-[640px] flex items-center justify-center">
          <div className="relative w-[300px] sm:w-[400px] lg:w-[460px] aspect-square flex items-center justify-center">
            {/* Dashed outer ring with 3 feature dots */}
            <div
              ref={ringRef}
              className="absolute inset-[-14%] sm:inset-[-18%] z-0 pointer-events-none transition-transform duration-100 ease-out will-change-transform"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 600 600"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer dashed circle */}
                <circle
                  cx="300"
                  cy="300"
                  r="276"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />

                {/* Left Dot (Organic Certified - angle -164.0 deg) */}
                <g transform="translate(34.7, 223.9)">
                  <circle
                    r="8.5"
                    fill="#34241D"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1.5"
                  />
                  <circle r="4" fill="#FFFFFF" />
                </g>

                {/* Top Right Dot (Zero Fillers - angle -44.3 deg) */}
                <g transform="translate(497.5, 107.2)">
                  <circle
                    r="8.5"
                    fill="#34241D"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1.5"
                  />
                  <circle r="4" fill="#FFFFFF" />
                </g>

                {/* Bottom Left Dot (angle +113.2 deg) */}
                <g transform="translate(191.3, 553.7)">
                  <circle
                    r="8.5"
                    fill="#34241D"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1.5"
                  />
                  <circle r="4" fill="#FFFFFF" />
                </g>
              </svg>
            </div>

            {/* Split food bowl with internal divider */}
            <div className="relative z-10 w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]">
              <Image
                src={promise.centerGraphic}
                alt="Honest nutrition split bowl with fresh organic ingredients and wholesome recipe"
                fill
                priority
                className="object-contain"
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
