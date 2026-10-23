import React from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/productsData";
import { siteData } from "@/data/siteData";
import ScrollReveal from "@/components/ScrollReveal";

export default function MostLovedSection() {
  const { mostLoved } = siteData;
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="w-full bg-[#34241D] text-white py-12 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <ScrollReveal direction="up" delay={50} className="h-full">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-auto min-h-[460px] lg:min-h-full overflow-hidden">
              <Image
                src={mostLoved.featureImage}
                alt="Most Loved Recipes cat"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-white tracking-tight drop-shadow-sm">
                    {mostLoved.titleLine1}
                    <br />
                    {mostLoved.titleLine2}
                  </h3>
                </div>
                <Link
                  href={mostLoved.ctaHref}
                  className="px-6 py-2 rounded-full border border-white/60 bg-black/20 backdrop-blur-xs text-xs sm:text-sm text-white hover:bg-white hover:text-[#241812] transition-all"
                >
                  {mostLoved.ctaText}
                </Link>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {featuredProducts.map((product, idx) => (
              <ScrollReveal
                key={product.id}
                direction="up"
                delay={100 + idx * 100}
                className="h-full"
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="group flex flex-col justify-between h-full bg-[#EFE9DF] text-[#241812] p-4 sm:p-6 transition-all hover:shadow-lg"
                >
                  <div className="relative aspect-square w-full mb-4 overflow-hidden">
                    {product.badge && (
                      <span className="absolute top-2 left-2 z-10 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-xs bg-[#241812] text-white">
                        {product.badge}
                      </span>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="pt-2 border-t border-[#DFD6C8] flex flex-col justify-between">
                    <h4 className="text-xs sm:text-sm font-medium tracking-tight group-hover:text-[#8E8B18] transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs sm:text-sm font-semibold">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-stone-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
