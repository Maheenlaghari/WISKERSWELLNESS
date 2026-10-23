"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  const router = useRouter();
  const freeShippingThreshold = 40;
  const amountNeeded = Math.max(0, freeShippingThreshold - totalPrice);
  const progressPercent = Math.min(100, (totalPrice / freeShippingThreshold) * 100);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    }

    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ease-in-out ${
        isCartOpen ? "visible" : "invisible pointer-events-none"
      }`}
      aria-hidden={!isCartOpen}
    >
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isCartOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div
          className={`w-screen max-w-md bg-[#271A14] text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-5 sm:p-6 border-b border-[#3E2D24] flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C5C622]" />
              <h2 className="text-lg font-semibold tracking-wide">
                Your Basket ({totalItems})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#3E2D24] hover:text-[#C5C622] transition-colors cursor-pointer"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-3 bg-[#302018] border-b border-[#3E2D24]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Truck className="w-3.5 h-3.5 text-[#C5C622]" />
                {amountNeeded > 0 ? (
                  <span>
                    Add ${amountNeeded.toFixed(2)} more for Free Delivery
                  </span>
                ) : (
                  <span className="text-[#C5C622] font-medium">
                    You unlocked Free Delivery
                  </span>
                )}
              </span>
              <span className="text-stone-400 font-semibold text-[11px]">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-[#1F140F] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C5C622] h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#34241D] flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-[#5E483B]" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Your basket is empty</h3>
                  <p className="text-stone-400 text-xs mt-1">
                    Discover our wholesome human grade feline recipes
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-xs uppercase tracking-wider hover:bg-[#B4B51E] transition-colors"
                >
                  Explore Recipes
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex items-center space-x-3.5 p-3 rounded-lg bg-[#34241D] border border-[#443026] hover:border-[#553F32] transition-colors"
                >
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-[#ECE5DC] shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate text-white">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-stone-400">
                      Portion: {item.selectedSize}
                    </p>
                    <p className="text-sm font-semibold text-[#C5C622] mt-0.5">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-2">
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedSize)
                      }
                      className="text-stone-400 hover:text-red-400 transition-colors p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center space-x-1.5 border border-[#553F32] rounded-full px-2 py-0.5 bg-[#2B1D16]">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                        className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs px-1 font-semibold min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                        className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#3E2D24] bg-[#221610] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-stone-300">Subtotal</span>
                  <span className="text-lg font-bold text-white">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-400">
                  <span>Shipping</span>
                  <span>
                    {totalPrice >= freeShippingThreshold ? "Free" : "Calculated next"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-sm uppercase tracking-wider hover:bg-[#B4B51E] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5C622]" />
                <span>Encrypted 256 bit safe checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
