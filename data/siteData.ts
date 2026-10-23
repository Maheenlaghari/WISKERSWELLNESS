export const siteData = {
  brandName: "Whiskers Wellness",
  announcement: "Free shipping on all orders over $40",
  contact: {
    addressLine1: "500 Terry Francine St.,",
    addressLine2: "San Francisco, CA 94158",
    email: "info@mysite.com",
    phone: "123 456 7890",
  },
  navLinks: [
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  footerShopLinks: [
    { label: "Shop", href: "/shop" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
  footerSocialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TikTok", href: "https://tiktok.com" },
    { label: "Accessibility Statement", href: "/accessibility" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
  hero: {
    titlePrefix: "Superb",
    titleItalic: "Feline",
    titleSuffix: "Nourishment",
    description:
      "Crafted from clean, wholesome ingredients to sustain your companion's natural vitality",
    ctaText: "Shop Now",
    ctaHref: "/shop",
    backgroundImage: "/assests/hero-bg.png",
  },
  recipesShowcase: {
    sectionTitle: "Explore Our Recipes",
    items: [
      {
        id: "biological-balance",
        titleLine1: "Biological",
        titleLine2: "Balance",
        image: "/assests/sec-2-1.jpe",
        href: "/shop?category=wet%20food",
        position: "top left",
      },
      {
        id: "organic-essentials",
        titleLine1: "Organic",
        titleLine2: "Essentials",
        image: "/assests/sec-2-2.avif",
        href: "/shop?category=dry%20food",
        position: "bottom left",
      },
    ],
  },
  promise: {
    sectionTitle: "Our Honest Promise",
    centerGraphic: "/assests/sec-3-svg.png",
    pillars: [
      {
        id: "organic",
        title: "Organic Certified",
        isItalic: true,
        description:
          "Formulated with clean certified ingredients from trusted growers.",
        position: "left",
      },
      {
        id: "fillers",
        title: "Zero Fillers",
        isItalic: false,
        description:
          "Absolutely free from synthetic additives, corn, wheat, and soy.",
        position: "top right",
      },
      {
        id: "sourced",
        title: "Locally Sourced",
        isItalic: true,
        description:
          "Raised sustainably on regional farms committed to animal welfare.",
        position: "bottom right",
      },
    ],
  },
  promo: {
    titleLine1: "Nourish",
    titleLine2: "More",
    titleItalic: "Save More",
    description:
      "Stock up on clean wellness and receive fifteen percent off your order.",
    ctaText: "Save Now",
    ctaHref: "/shop",
    backgroundImage: "/assests/sec-4.jpe",
  },
  mostLoved: {
    titleLine1: "Most Loved",
    titleLine2: "Recipes",
    ctaText: "View All",
    ctaHref: "/shop",
    featureImage: "/assests/sec-5.avif",
  },
  newsletter: {
    title: "Join Our Pack",
    description:
      "Receive expert feline nutrition guides and exclusive product launches.",
    emailPlaceholder: "Email *",
    consentText: "Yes, subscribe me to your newsletter. *",
    buttonText: "Submit",
  },
  copyrightText: "© 2035 ValiuWhiskers. Powered and secured by Wix.",
};
