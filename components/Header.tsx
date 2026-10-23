"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { siteData } from "@/data/siteData";

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOverlay = usePathname() === "/";

  return (
    <header
      className={`${
        isOverlay ? "absolute inset-x-0 top-3 sm:top-5" : "relative pt-3 sm:pt-4"
      } z-40 w-full px-3 sm:px-6 lg:px-10`}
    >
      <div className="w-full bg-[#C5C622] text-[#241812] shadow-md transition-colors">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs sm:text-sm font-medium">
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-base sm:text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              {siteData.brandName}
            </Link>
            <nav className="hidden md:flex items-center space-x-5">
              {siteData.navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:opacity-70 transition-opacity text-xs sm:text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-xs">
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 12c4 4 8 4 12 0 3 2 7 2 8 0-1-2-5-2-8 0-4-4-8-4-12 0z" />
            </svg>
            <span className="tracking-wide">{siteData.announcement}</span>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-5">
            <button
              type="button"
              className="hidden sm:flex items-center space-x-1.5 hover:opacity-75 transition-opacity cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Log In</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="flex items-center space-x-1 hover:opacity-75 transition-opacity cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold">{totalItems}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 hover:opacity-75"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#B8B91D] px-4 py-3 border-t border-[#A8A919] space-y-2">
            {siteData.navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium hover:opacity-80"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#A8A919] flex items-center justify-between text-xs">
              <span className="flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Log In</span>
              </span>
              <span>{siteData.announcement}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
