"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { products, categories } from "@/data/productsData";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(45);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [priceOpen, setPriceOpen] = useState(true);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);

  const availableSizes = ["2 oz", "3 oz", "4 oz", "5.5 oz", "3 lb", "6 lb"];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory === "all") return true;
        if (selectedCategory === "sale") return !!p.badge && p.badge.toLowerCase() === "sale";
        if (selectedCategory === "favorite recipes") return !!p.featured;
        return p.category.toLowerCase() === selectedCategory.toLowerCase();
      })
      .filter((p) => p.price <= maxPrice)
      .filter((p) => (selectedSize ? p.sizes.includes(selectedSize) : true))
      .sort((a, b) => {
        if (sortBy === "price low") return a.price - b.price;
        if (sortBy === "price high") return b.price - a.price;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [selectedCategory, maxPrice, selectedSize, sortBy]);

  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-8 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">All Products</span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight">
            All Products
          </h1>
        </div>

        <div className="flex items-center space-x-6 overflow-x-auto pb-2 border-b border-[#4A372E] text-xs sm:text-sm whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`pb-2 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-4">
          <aside className="lg:col-span-1 space-y-6">
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
              Filter by
            </h2>

            <div className="border-t border-[#4A372E] pt-4">
              <button
                type="button"
                onClick={() => setPriceOpen(!priceOpen)}
                className="w-full flex items-center justify-between text-xs sm:text-sm font-medium py-1 cursor-pointer"
              >
                <span>Price</span>
                {priceOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-300" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-300" />
                )}
              </button>

              {priceOpen && (
                <div className="pt-3 space-y-2">
                  <input
                    type="range"
                    min={5}
                    max={45}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs pt-1">
                    <span className="text-[#C5C622] font-semibold">
                      Up to ${maxPrice}
                    </span>
                    <span className="text-stone-400">$45</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#4A372E] pt-4">
              <button
                type="button"
                onClick={() => setSizeOpen(!sizeOpen)}
                className="w-full flex items-center justify-between text-xs sm:text-sm font-medium py-1 cursor-pointer"
              >
                <span>Size</span>
                {sizeOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-300" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-300" />
                )}
              </button>

              {sizeOpen && (
                <div className="pt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSize(null)}
                    className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                      selectedSize === null
                        ? "bg-[#C5C622] text-[#241812] font-semibold"
                        : "bg-[#251710] text-stone-300 hover:text-white"
                    }`}
                  >
                    All
                  </button>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(selectedSize === size ? null : size)
                      }
                      className={`px-3 py-1 rounded-full text-xs cursor-pointer ${
                        selectedSize === size
                          ? "bg-[#C5C622] text-[#241812] font-semibold"
                          : "bg-[#251710] text-stone-300 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-[#4A372E] pt-4">
              <button
                type="button"
                onClick={() => setWeightOpen(!weightOpen)}
                className="w-full flex items-center justify-between text-xs sm:text-sm font-medium py-1 cursor-pointer"
              >
                <span>Weight</span>
                {weightOpen ? (
                  <ChevronUp className="w-4 h-4 text-stone-300" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-stone-300" />
                )}
              </button>

              {weightOpen && (
                <div className="pt-3 text-xs text-stone-300 space-y-1">
                  <p>Standard retail can and bag weights</p>
                </div>
              )}
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between text-xs sm:text-sm text-stone-300 pb-2">
              <span>{filteredProducts.length} products</span>

              <div className="flex items-center space-x-2">
                <label htmlFor="sortBySelect" className="text-stone-300">
                  Sort by:
                </label>
                <select
                  id="sortBySelect"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#271A14] border border-[#4A372E] rounded-md px-3 py-1 text-white text-xs focus:outline-none focus:border-[#C5C622] cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price low">Price: Low to High</option>
                  <option value="price high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product, idx) => (
                <ScrollReveal
                  key={product.id}
                  direction="up"
                  delay={(idx % 3) * 100}
                >
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 space-y-3">
                <p className="text-stone-300 text-sm">
                  No recipes match your current filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setMaxPrice(45);
                    setSelectedSize(null);
                  }}
                  className="px-5 py-2 rounded-full bg-[#C5C622] text-[#241812] text-xs font-semibold hover:bg-[#B4B51E]"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
