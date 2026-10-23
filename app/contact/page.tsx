"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { siteData } from "@/data/siteData";
import NewsletterSection from "@/components/NewsletterSection";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    topic: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#34241D] text-white min-h-screen py-10 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex items-center space-x-2 text-xs text-stone-300">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-white">Contact Us</span>
        </div>

        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight">
            We are Here for <span className="font-serif italic">You</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
            Have questions about recipes, ingredients, feeding guidelines, or an
            existing order? Our dedicated feline wellness team is delighted to
            assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-8 bg-[#281A13] p-8 sm:p-10 border border-[#443026]">
            <h2 className="text-2xl font-serif italic text-white">
              Direct Inquiries
            </h2>

            <div className="space-y-6 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-[#C5C622] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Fulfillment Studio</p>
                  <p>{siteData.contact.addressLine1}</p>
                  <p>{siteData.contact.addressLine2}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-[#C5C622] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Electronic Mail</p>
                  <p>{siteData.contact.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-[#C5C622] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Customer Support</p>
                  <p>{siteData.contact.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-5 h-5 text-[#C5C622] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Operating Hours</p>
                  <p>Monday to Friday: 9am to 6pm PST</p>
                  <p>Saturday: 10am to 4pm PST</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#281A13] p-8 sm:p-10 border border-[#443026]">
            <h2 className="text-2xl font-serif italic text-white mb-6">
              Send a Message
            </h2>

            {submitted ? (
              <div className="p-6 rounded-md bg-[#241812] border border-[#C5C622]/40 text-center space-y-3">
                <p className="text-base text-[#C5C622] font-semibold">
                  Message Dispatched
                </p>
                <p className="text-xs text-stone-300">
                  Thank you for contacting ValiuWhiskers. A nutritional advisor
                  will respond within twenty four hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full bg-[#1F140E] border border-stone-600 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5C622]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full bg-[#1F140E] border border-stone-600 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5C622]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formState.topic}
                    onChange={(e) =>
                      setFormState({ ...formState, topic: e.target.value })
                    }
                    className="w-full bg-[#1F140E] border border-stone-600 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5C622] cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking">Order Tracking</option>
                    <option value="Nutritional Guidance">
                      Nutritional Guidance
                    </option>
                    <option value="Wholesale Partnerships">
                      Wholesale Partnerships
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="w-full bg-[#1F140E] border border-stone-600 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C5C622]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#C5C622] text-[#241812] text-xs font-semibold uppercase tracking-wider hover:bg-[#B4B51E] transition-colors cursor-pointer mt-2"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="pt-16">
        <NewsletterSection />
      </div>
    </div>
  );
}
