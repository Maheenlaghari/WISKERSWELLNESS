"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { products } from "@/data/productsData";
import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ id }: { id: string }) {
  const product =
    products.find((p) => p.slug === id || p.id === id) || products[0];

  const { addToCart, setIsCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes[0] || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleAccordion = (name: string) => {
    setOpenSection(openSection === name ? null : name);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize);
    setIsCartOpen(true);
  };

  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-10 px-6 sm:px-10 lg:px-14">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/shop" className="hover:text-white transition-colors">
            All Products
          </Link>
          <span>&gt;</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 pt-4">
          <div className="relative aspect-square w-full bg-[#ECE5DC] rounded-none overflow-hidden flex items-center justify-center p-8 shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-contain p-6"
            />
          </div>

          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-white">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3 text-lg font-semibold">
                <span>${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-medium text-stone-300">
                  Size *
                </label>
                <div className="flex items-center space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                        selectedSize === size
                          ? "bg-white text-[#241812] border-white"
                          : "border-stone-500 text-stone-300 hover:border-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-medium text-stone-300">
                  Quantity *
                </label>
                <div className="flex items-center border border-stone-500 rounded-md w-32 justify-between px-3 py-1.5 bg-[#271A14]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-stone-300 hover:text-white p-1"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-stone-300 hover:text-white p-1"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3 rounded-full bg-white text-[#241812] font-semibold text-xs uppercase tracking-wider hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 rounded-full bg-[#241812] text-white border border-[#443026] font-semibold text-xs uppercase tracking-wider hover:bg-[#1B110B] transition-colors cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-2">
                {product.description}
              </p>
            </div>

            <div className="border-t border-[#4A372E] pt-4 space-y-3">
              <div className="border-b border-[#4A372E] pb-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("productInfo")}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-medium py-1 cursor-pointer"
                >
                  <span>Product Info</span>
                  {openSection === "productInfo" ? (
                    <ChevronUp className="w-4 h-4 text-stone-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-300" />
                  )}
                </button>
                {openSection === "productInfo" && (
                  <p className="text-xs text-stone-300 pt-2 leading-relaxed">
                    {product.productInfo}
                  </p>
                )}
              </div>

              <div className="border-b border-[#4A372E] pb-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("shippingInfo")}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-medium py-1 cursor-pointer"
                >
                  <span>Shipping Info</span>
                  {openSection === "shippingInfo" ? (
                    <ChevronUp className="w-4 h-4 text-stone-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-300" />
                  )}
                </button>
                {openSection === "shippingInfo" && (
                  <p className="text-xs text-stone-300 pt-2 leading-relaxed">
                    {product.shippingInfo}
                  </p>
                )}
              </div>

              <div className="border-b border-[#4A372E] pb-3">
                <button
                  type="button"
                  onClick={() => toggleAccordion("refundPolicy")}
                  className="w-full flex items-center justify-between text-xs sm:text-sm font-medium py-1 cursor-pointer"
                >
                  <span>Return and Refund Policy</span>
                  {openSection === "refundPolicy" ? (
                    <ChevronUp className="w-4 h-4 text-stone-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-300" />
                  )}
                </button>
                {openSection === "refundPolicy" && (
                  <p className="text-xs text-stone-300 pt-2 leading-relaxed">
                    {product.refundPolicy}
                  </p>
                )}
              </div>

              <div className="pt-4 flex items-center space-x-4 text-stone-400">
                <span className="text-xs">Share:</span>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                  className="w-7 h-7 rounded-full bg-[#ECE5DC] hover:bg-[#C5C622] text-[#241812] flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Pinterest"
                  className="w-7 h-7 rounded-full bg-[#ECE5DC] hover:bg-[#C5C622] text-[#241812] flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.026-.65 2.565-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.357-.053.218-.173.265-.4.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on WhatsApp"
                  className="w-7 h-7 rounded-full bg-[#ECE5DC] hover:bg-[#C5C622] text-[#241812] flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on X"
                  className="w-7 h-7 rounded-full bg-[#ECE5DC] hover:bg-[#C5C622] text-[#241812] flex items-center justify-center transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
