# ValiuWhiskers

Theme provided by Undiegravity.

## Project Features

* Complete e-commerce store frontend for premium organic feline nourishment.
* Hero showcase with custom typography and promotional banner.
* Explore our recipes dual split showcases with full responsive scaling.
* Nutritional promise section highlighting organic certification, zero fillers, and local sourcing.
* Promotional incentive callout with instant discount activation.
* Most loved recipe highlights with live inventory preview.
* Interactive product catalog with category switching, price filtering, size filtering, and multi-criteria sorting.
* Comprehensive product detail view with multi-size selection, quantity controls, expandable specifications, and social sharing.
* Slide-out shopping cart drawer with live state management, quantity adjustment, subtotal calculations, and checkout simulation.
* Responsive navigation with mobile menu and free shipping announcement bar.
* Informational brand pages for about us, contact us, and retail store policies.

## Tech Stack and Versions

* Next.js: 16.4.2
* React: 19.3.0
* React DOM: 19.3.0
* TypeScript: 5.x
* Tailwind CSS: 4.x
* Lucide React: 1.16.0

## Backend API Endpoint List

* GET /api/products : Retrieve list of products with optional query filtering by category and featured status.
* GET /api/products/[id] : Retrieve detailed information for a single product by numeric identifier or url slug.
* POST /api/cart : Synchronize customer shopping cart items with backend session storage.
* POST /api/newsletter : Record visitor email address for marketing subscription dispatch.
* POST /api/contact : Submit customer support inquiries and nutritional advice requests.
