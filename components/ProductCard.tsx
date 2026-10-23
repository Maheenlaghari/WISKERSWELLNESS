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
    <div className="group flex flex-col justify-between bg-[#EFE9DF] text-[#241812] transition-all hover:shadow-xl">
      <div className="relative aspect-square w-full overflow-hidden p-4">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 text-[10px] font-semibold px-2.5 py-0.5 bg-[#241812] text-white">
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
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute bottom-3 right-3 z-20">
          {cartItem ? (
            <div className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-xs border border-stone-300 rounded-full px-2 py-1 shadow-sm">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(
                    product.id,
                    cartItem.selectedSize,
                    cartItem.quantity - 1
                  )
                }
                className="text-stone-700 hover:text-black p-0.5"
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
                className="text-stone-700 hover:text-black p-0.5"
                aria-label="Increase quantity"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-[#241812] border border-stone-300 flex items-center justify-center shadow-sm hover:scale-110 transition-transform cursor-pointer"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 pt-3 border-t border-[#E2D9CC] flex flex-col justify-between flex-1">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-xs sm:text-sm font-medium tracking-tight hover:text-[#8E8B18] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 mt-1.5">
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
    </div>
  );
}
