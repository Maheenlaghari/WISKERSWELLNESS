# 🐱 ValiuWhiskers — Premium Organic Feline Wellness & Nutrition

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Turbopack](https://img.shields.io/badge/Turbopack-Ready-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <strong>A modern, high-performance e-commerce platform and wellness boutique dedicated to certified organic feline nutrition, artisanal wet food recipes, and tailored dietary care.</strong>
</p>

[Explore Store](http://localhost:3000) • [View Catalog](http://localhost:3000/shop) • [API Documentation](#backend-api-specifications) • [Getting Started](#getting-started)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Customer Experience & Storefront](#customer-experience--storefront)
  - [E-Commerce Engine & Shopping Cart](#e-commerce-engine--shopping-cart)
  - [Customer Authentication & Accounts](#customer-authentication--accounts)
  - [Brand, Trust & Informational Pages](#brand-trust--informational-pages)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Backend API Specifications](#-backend-api-specifications)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
  - [Code Quality & Linting](#code-quality--linting)
- [Design Tokens & Aesthetics](#-design-tokens--aesthetics)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**ValiuWhiskers** is an end-to-end feline nourishment storefront engineered with **Next.js 16 (Turbopack App Router)**, **React 19**, and **Tailwind CSS v4**. It showcases veterinarian-formulated wet food recipes, clean culinary processes, and ethical sourcing through a fluid, responsive, and accessible user experience.

Every recipe is crafted with human-grade whole meats, zero artificial fillers, and non-GMO verified botanicals. The web application couples high-conversion e-commerce workflows (slide-out cart, dynamic pricing, real-time discount validation, full checkout simulation) with immersive micro-interactions and scroll-driven physics.

---

## ✨ Key Features

### Customer Experience & Storefront
- **Hero Showcase**: High-impact editorial hero section with responsive typography, value-prop badges, quick shopping triggers, and promotional badges.
- **Dual Split Recipes Showcase**: Side-by-side featured culinary recipes with high-res photography, dietary badges (Grain-Free, Wild-Caught, High-Moisture), and interactive quick links.
- **Interactive Nutritional Promise**: Dynamic scroll-driven rotating badge that smoothly turns in response to window scroll depth, flanked by our three core tenets: *100% Certified Organic*, *Zero Synthetic Fillers*, and *Ethical Local Sourcing*.
- **Most Loved Recipes Carousel**: Live shelf-ready preview of top-rated recipes with real-time stock indicators, flavor notes, price displays, and direct add-to-cart actions.
- **Promotional Incentive Banner**: Interactive promo banner offering an instant **15% off** discount code (`ORGANIC15`) with one-click activation.
- **Dynamic Product Catalog (`/shop`)**:
  - Filter by category: *All*, *Wet Food*, *Dry Kibble*, *Treats*, and *Broths*.
  - Sort by: *Featured*, *Price: Low to High*, *Price: High to Low*, and *Highest Rated*.
  - In-stock availability counters and quick filter resets.
- **Comprehensive Product Details (`/shop/[id]`)**:
  - Multi-size selector (e.g., 3 oz Can, 5.5 oz Can, 12-Pack Case) with instant price calculation.
  - Interactive quantity stepper and stock limit safeguards.
  - Expandable nutritional accordions for *Guaranteed Analysis*, *Full Ingredients List*, and *Feeding Guidelines*.
  - Native social share sheet (Pinterest, Facebook, Twitter, and Direct Link clipboard copy).

### E-Commerce Engine & Shopping Cart
- **Persistent Slide-Out Cart Drawer**:
  - Accessible drawer opening from any screen without interrupting navigation.
  - Real-time item additions, deletions, and quantity increments/decrements.
  - Free Shipping Progress Bar dynamically tracking progress toward the $45 free shipping threshold.
  - Auto-persisted in `localStorage` backed by unified `CartContext`.
- **Streamlined Checkout Simulation (`/checkout`)**:
  - Multi-section customer checkout with Shipping Address, Delivery Options, and Payment Methods.
  - Order subtotal, estimated tax, promotional code discount deduction, and grand total calculations.
  - Synchronous order confirmation modal generating simulated order confirmation tracking tokens.

### Customer Authentication & Accounts
- **Unified Auth Suite (`/login`)**:
  - Tabbed interface switching between *Sign In* and *Create Account*.
  - Client-side validation for emails, password security, and required fields.
  - Integrated with REST API endpoints (`/api/auth/login`, `/api/auth/register`, `/api/auth/logout`).
  - Active session state persistence across all pages with user avatar navigation pill.

### Brand, Trust & Informational Pages
- **About Us (`/about`)**: Full brand origin story, veterinary advisory board, and clean kitchen philosophy.
- **Contact Us (`/contact`)**: Customer care center with direct contact details, operating hours, and an interactive message submission form.
- **Store Policies**:
  - [Shipping Policy](/app/shipping-policy/page.tsx) (`/shipping-policy`) — delivery timeframes, free shipping thresholds, and temperature-controlled logistics.
  - [Refund Policy](/app/refund-policy/page.tsx) (`/refund-policy`) — 30-day "Clean Bowl Guarantee" return rules.
  - [Privacy Policy](/app/privacy-policy/page.tsx) (`/privacy-policy`) — CCPA/GDPR compliance and data encryption.
  - [Terms of Service](/app/terms/page.tsx) (`/terms`) — customer terms, subscription policies, and legal disclaimers.
  - [Accessibility Statement](/app/accessibility/page.tsx) (`/accessibility`) — WCAG 2.1 AA accessibility commitment.

---

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.4.2` | App Router, Turbopack, Partial Prerendering (PPR), API Routes |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | Modern Server & Client Components, Hooks, Context |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `5.x` | Strict type safety across models, APIs, and state |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `v4.x` | Utility-first styling with modern CSS variables |
| **Icons** | [Lucide React](https://lucide.dev/) | `^1.61.0` | Minimalist, pixel-perfect icon set |
| **Tooling** | [ESLint](https://eslint.org/) | `^9` | Code linting and style enforcement |

---

## 📁 Project Architecture & Directory Structure

```text
WISKERSWELLNESS/
├── app/                              # Next.js App Router root
│   ├── about/                        # About Us brand story page
│   ├── accessibility/                # Accessibility policy page
│   ├── api/                          # Backend REST API route handlers
│   │   ├── auth/                     # Authentication endpoints (login, register, logout)
│   │   ├── checkout/                 # Order creation & checkout simulation
│   │   └── products/                 # Product catalog & single product endpoints
│   ├── checkout/                     # Checkout & order processing page
│   ├── contact/                      # Contact & customer service page
│   ├── login/                        # Authentication (Sign in / Sign up) page
│   ├── privacy-policy/               # Privacy policy disclosure page
│   ├── refund-policy/                # Refund policy & returns guarantee page
│   ├── shipping-policy/              # Shipping information & tracking guidelines
│   ├── shop/                         # Product catalog listing with filter/sort
│   │   └── [id]/                     # Dynamic product details page & client view
│   ├── terms/                        # Terms of Service page
│   ├── favicon.ico                   # Application browser favicon
│   ├── globals.css                   # Global styles & Tailwind v4 theme definitions
│   ├── layout.tsx                    # Root layout with Cart, Auth & Toast providers
│   └── page.tsx                      # Homepage with all curated sections
├── components/                       # Reusable modular UI components
│   ├── CartDrawer.tsx                # Slide-out shopping cart drawer
│   ├── Footer.tsx                    # Global brand footer & accreditation
│   ├── Header.tsx                    # Sticky header, promo bar & navigation
│   ├── HeroSection.tsx               # Main hero section with CTA buttons
│   ├── MostLovedSection.tsx          # Featured top recipes highlight carousel
│   ├── NewsletterSection.tsx         # Customer newsletter signup module
│   ├── ProductCard.tsx               # Reusable product card with quick-add
│   ├── PromiseSection.tsx            # Scroll-driven rotating promise badge section
│   ├── PromoBanner.tsx               # Promotional coupon banner callout
│   ├── RecipesShowcase.tsx           # Split dual-recipe featured showcase
│   └── ScrollReveal.tsx              # Viewport intersection animation wrapper
├── context/                          # React Context state management
│   ├── AuthContext.tsx               # User authentication session context
│   └── CartContext.tsx               # Cart state, item storage & math context
├── data/                             # Mock databases & initial static data
│   ├── productsData.ts               # Product catalog specifications & reviews
│   └── siteData.ts                   # Navigation, promises, policies & content
├── public/                           # Static assets, images, and brand graphics
│   └── assets/                       # High-res photography, hero backgrounds & icons
├── types/                            # Global TypeScript interfaces & types
│   └── index.ts                      # Product, Cart, User, and Filter type definitions
├── eslint.config.mjs                 # ESLint flat configuration
├── next.config.ts                    # Next.js configuration (Turbopack, cache)
├── package.json                      # Project metadata and dependencies
├── tsconfig.json                     # TypeScript compiler options
└── README.md                         # Project documentation
```

---

## 📡 Backend API Specifications

The application includes built-in Next.js Route Handlers:

### 1. Products API
- **`GET /api/products`**
  - **Query Parameters**:
    - `category` *(optional)*: Filter by `wet-food`, `dry-kibble`, `treats`, `broths`, or `all`.
    - `featured` *(optional)*: Filter by boolean (`true`/`false`).
    - `search` *(optional)*: Case-insensitive search across title and description.
  - **Response**: `200 OK` with JSON array of product objects.

- **`GET /api/products/[id]`**
  - **Path Parameter**: `id` — numeric identifier or product URL slug.
  - **Response**: `200 OK` with detailed product object or `404 Not Found`.

### 2. Checkout API
- **`POST /api/checkout`**
  - **Payload**:
    ```json
    {
      "items": [
        { "id": "salmon-stew", "name": "Wild Salmon & Pumpkin Stew", "price": 4.29, "quantity": 4, "size": "3 oz Can" }
      ],
      "shippingDetails": {
        "fullName": "Jane Doe",
        "email": "jane@example.com",
        "address": "123 Whisker Way",
        "city": "Seattle",
        "postalCode": "98101"
      },
      "paymentMethod": "credit-card"
    }
    ```
  - **Response**: `200 OK` with generated `orderId`, `status: "confirmed"`, and timestamps.

### 3. Authentication API
- **`POST /api/auth/login`**
  - **Payload**: `{ "email": "customer@example.com", "password": "••••••••" }`
  - **Response**: `200 OK` with authenticated user payload and mock token.

- **`POST /api/auth/register`**
  - **Payload**: `{ "name": "Jane Doe", "email": "jane@example.com", "password": "••••••••" }`
  - **Response**: `201 Created` with newly created user record.

- **`POST /api/auth/logout`**
  - **Response**: `200 OK` session termination confirmation.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed on your local workstation:
- **Node.js**: `v18.18.0` or higher (Node.js 20+ LTS recommended)
- **Package Manager**: `npm` (v9+), `pnpm`, or `yarn`

### Installation
Clone the repository to your local machine:

```bash
git clone https://github.com/Maheenlaghari/WISKERSWELLNESS.git
cd WISKERSWELLNESS
```

Install project dependencies:

```bash
npm install
```

### Development Server
Start the Next.js development server powered by Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application with Hot Module Replacement (HMR).

### Production Build
Compile and optimize the application for production deployment:

```bash
# Generate optimized production build
npm run build

# Start production server
npm run start
```

### Code Quality & Linting
Run ESLint to check for code consistency and standard conventions:

```bash
npm run lint
```

---

## 🎨 Design Tokens & Aesthetics

- **Color Palette**:
  - Primary Brand Accent: Deep Forest Jade (`#1B4332`, `#2D6A4F`)
  - Warm Earth Ground: Soft Cream (`#FAF7F2`, `#F4EFE6`)
  - Golden Highlight: Honey Amber (`#D4A373`, `#E76F51`)
  - Typography Neutral: Charcoal Noir (`#1C1917`, `#44403C`)
- **Typography**: Clean, human-centered sans-serif paired with editorial display headings for a warm, apothecary-grade aesthetic.
- **Motion & Dynamics**: CSS transforms with `will-change: transform`, scroll-driven rotational math for badges, and lightweight cubic-bezier transitions.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to your branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is open-source and distributed under the **MIT License**. See the `LICENSE` file for details.

---

<div align="center">
  Crafted with care for cat wellness & longevity 🐾
</div>
