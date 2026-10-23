"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find(
    (item) => item.product.id === product.id
  );

  return (
    <div className="group flex flex-col justify-between bg-[#ECE5DC] text-[#241812] transition-all hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden p-4">
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-semibold px-2 py-0.5 bg-[#1F140F] text-white">
            {product.badge}
          </span>
        )}

        <Link
          href={`/shop/${product.slug}`}
          className="relative block w-full h-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-102"
          />
        </Link>

        <div className="absolute bottom-2.5 right-2.5 z-20">
          {cartItem ? (
            <div className="flex items-center space-x-1.5 bg-white border border-stone-300 rounded-full px-2 py-1 shadow-xs">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(
                    product.id,
                    cartItem.selectedSize,
                    cartItem.quantity - 1
                  )
                }
                className="text-stone-700 hover:text-black p-0.5 cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-xs font-semibold px-1 min-w-[14px] text-center">
                {cartItem.quantity}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateQuantity(
                    product.id,
                    cartItem.selectedSize,
                    cartItem.quantity + 1
                  )
                }
                className="text-stone-700 hover:text-black p-0.5 cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="w-7 h-7 rounded-full bg-white hover:bg-stone-100 text-[#241812] border border-stone-300 flex items-center justify-center shadow-xs hover:scale-105 transition-transform cursor-pointer"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 flex flex-col justify-between flex-1">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-medium tracking-tight text-[#241812] group-hover:text-[#9A9B1A] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs sm:text-sm font-semibold text-[#241812]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-stone-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
