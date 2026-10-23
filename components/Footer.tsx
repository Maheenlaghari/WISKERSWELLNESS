import React from "react";
import Link from "next/link";
import { siteData } from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="w-full bg-[#C5C622] text-[#241812] pt-12 pb-8 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none uppercase">
             Whiskers
              <br />
             Wellness
            </h2>
          </div>
        </div>

        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
          <div className="space-y-6">
            <div>
              <p>{siteData.contact.addressLine1}</p>
              <p>{siteData.contact.addressLine2}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <Link href="/shop" className="hover:opacity-75 transition-opacity">
                Shop
              </Link>
              <Link
                href="/about"
                className="hover:opacity-75 transition-opacity"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:opacity-75 transition-opacity"
              >
                Contact Us
              </Link>
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/shipping-policy"
                className="hover:opacity-75 transition-opacity"
              >
                Shipping Policy
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:opacity-75 transition-opacity"
              >
                Privacy Policy
              </Link>
              <Link
                href="/refund-policy"
                className="hover:opacity-75 transition-opacity"
              >
                Refund Policy
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p>{siteData.contact.email}</p>
              <p>{siteData.contact.phone}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-75 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-75 transition-opacity"
              >
                Facebook
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-75 transition-opacity"
              >
                TikTok
              </a>
            </div>

            <div className="flex flex-col space-y-2">
              <Link
                href="/accessibility"
                className="hover:opacity-75 transition-opacity"
              >
                Accessibility Statement
              </Link>
              <Link
                href="/terms"
                className="hover:opacity-75 transition-opacity"
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#B4B51E] text-xs">
        <p>{siteData.copyrightText}</p>
      </div>
    </footer>
  );
}
