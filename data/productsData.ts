import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Chicken Pâté",
    slug: "chicken-pate",
    price: 5.0,
    image: "/assets/product-1.jpe",
    category: "wet food",
    categoryLabel: "Wet Food",
    sizes: ["3 oz", "5.5 oz"],
    weight: "3 oz",
    description:
      "A velvety pâté crafted from organic chicken and wholesome natural ingredients. This complete recipe is rich in high quality protein and essential nutrients, offering a smooth texture that cats love and balanced nutrition they need every day.",
    productInfo:
      "Crafted with pasture raised organic chicken, organic chicken broth, and organic carrots. Enhanced with taurine, vitamins A, D3, and E for optimum vitality and digestive balance.",
    shippingInfo:
      "Complimentary ground shipping on orders over forty dollars. Standard delivery arrives in two to four business days across all states.",
    refundPolicy:
      "Thirty day satisfaction promise. If your companion does not love every bite, contact our concierge team for an immediate replacement or full refund.",
    inStock: true,
  },
  {
    id: "2",
    name: "Salmon Stew",
    slug: "salmon-stew",
    price: 5.0,
    badge: "Best Seller",
    image: "/assets/product-2.jpe",
    category: "wet food",
    categoryLabel: "Wet Food",
    sizes: ["3 oz", "5.5 oz"],
    weight: "3 oz",
    description:
      "Tender wild caught salmon gently simmered in savory nutrient rich broth. Packed with essential omega fatty acids to nourish coat brilliance and joint flexibility.",
    productInfo:
      "Sustainably harvested wild salmon with organic pumpkin, spinach, and cranberries. Fortified with essential chelated minerals.",
    shippingInfo:
      "Complimentary ground shipping on orders over forty dollars. Arrives in secure insulated packaging.",
    refundPolicy:
      "Thirty day satisfaction promise for all purchases without hassle.",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Turkey Terrine",
    slug: "turkey-terrine",
    price: 5.0,
    image: "/assets/product-1.jpe",
    category: "wet food",
    categoryLabel: "Wet Food",
    sizes: ["3 oz", "5.5 oz"],
    weight: "3 oz",
    description:
      "Delicate rustic terrine made with free range turkey and organic garden vegetables. Formulated for sensitive stomachs and discerning taste buds.",
    productInfo:
      "Real turkey meat, organic sweet potatoes, and organic celery simmered to lock in natural moisture and pure aroma.",
    shippingInfo:
      "Dispatched within twenty four hours. Free delivery on orders exceeding forty dollars.",
    refundPolicy:
      "Guaranteed happiness for your feline companion or full reimbursement.",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Chicken Bites",
    slug: "chicken-bites",
    price: 5.0,
    image: "/assets/product-4.jpe",
    category: "cat treats",
    categoryLabel: "Cat Treats",
    sizes: ["2 oz", "4 oz"],
    weight: "2 oz",
    description:
      "Single ingredient freeze dried raw chicken morsels. Crunchy bite sized treats that preserve all raw nutrients and intense natural flavor.",
    productInfo:
      "One single wholesome ingredient: One hundred percent pure organic chicken breast. No artificial colors or preservatives.",
    shippingInfo:
      "Freshly sealed foil packs shipped promptly in eco friendly parcels.",
    refundPolicy:
      "Return anytime within thirty days if not entirely pleased.",
    inStock: true,
  },
  {
    id: "5",
    name: "Salmon Bites",
    slug: "salmon-bites",
    price: 5.0,
    image: "/assets/product-4.jpe",
    category: "cat treats",
    categoryLabel: "Cat Treats",
    sizes: ["2 oz", "4 oz"],
    weight: "2 oz",
    description:
      "Crunchy freeze dried bites made from cold water wild caught salmon. Irresistible reward treats that promote cardiovascular wellness.",
    productInfo:
      "Pure wild Alaskan salmon gently freeze dried in small batches to preserve natural enzymes and vitamins.",
    shippingInfo:
      "Ships within one business day via expedited tracked delivery.",
    refundPolicy:
      "Our feline delight guarantee covers every bag with a full refund.",
    inStock: true,
  },
  {
    id: "6",
    name: "Turkey Bites",
    slug: "turkey-bites",
    price: 5.0,
    image: "/assets/product-4.jpe",
    category: "cat treats",
    categoryLabel: "Cat Treats",
    sizes: ["2 oz", "4 oz"],
    weight: "2 oz",
    description:
      "Pure organic turkey liver and breast treats baked to crispy perfection. Ideal for positive training reinforcement and everyday bonding.",
    productInfo:
      "Slowly roasted organic turkey with zero grains, zero gluten, and zero artificial flavors.",
    shippingInfo:
      "Orders dispatched quickly from local fulfillment centers.",
    refundPolicy:
      "Thirty day complete peace of mind guarantee on all treats.",
    inStock: true,
    featured: true,
  },
  {
    id: "7",
    name: "Chicken Recipe",
    slug: "chicken-recipe",
    price: 19.0,
    originalPrice: 25.0,
    badge: "Sale",
    image: "/assets/product-3.jpe",
    category: "dry food",
    categoryLabel: "Dry Food",
    sizes: ["3 lb", "6 lb"],
    weight: "3 lb",
    description:
      "Crisp extruded kibble made with high proportion fresh deboned chicken and ancient grains. Delivers sustained energy and optimal dental cleaning action.",
    productInfo:
      "Fresh deboned chicken, green peas, chickpeas, organic flaxseed, and natural antioxidant rosemary extract.",
    shippingInfo:
      "Heavy duty resealable packaging delivered safely to your doorstep.",
    refundPolicy:
      "Full refund guarantee if your cat does not eagerly finish the bag.",
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "Salmon Recipe",
    slug: "salmon-recipe",
    price: 25.0,
    image: "/assets/product-5.jpe",
    category: "dry food",
    categoryLabel: "Dry Food",
    sizes: ["3 lb", "6 lb"],
    weight: "3 lb",
    description:
      "Ocean fresh salmon kibble paired with holistic herbs and probiotics. Formulated to optimize feline digestion and support silky coat shine.",
    productInfo:
      "Wild caught salmon meal, lentils, dried kelp, and live active probiotics for balanced intestinal flora.",
    shippingInfo:
      "Complimentary express shipping on all multi bag bundles.",
    refundPolicy:
      "Try with total confidence backed by our thirty day refund policy.",
    inStock: true,
  },
  {
    id: "9",
    name: "Turkey Recipe",
    slug: "turkey-recipe",
    price: 25.0,
    image: "/assets/product-5.jpe",
    category: "dry food",
    categoryLabel: "Dry Food",
    sizes: ["3 lb", "6 lb"],
    weight: "3 lb",
    description:
      "Rich protein dry formula packed with free range turkey and farm garden greens. Specifically proportioned to support lean muscle maintenance.",
    productInfo:
      "Real roasted turkey, whole cranberries, chia seeds, and chelated zinc for strong immune defense.",
    shippingInfo:
      "Fresh batch packing with expedited courier delivery.",
    refundPolicy:
      "Risk free trial with prompt refunds on request.",
    inStock: true,
  },
];

export const categories = [
  { id: "all", label: "All Products" },
  { id: "dry food", label: "Dry Food" },
  { id: "wet food", label: "Wet Food" },
  { id: "cat treats", label: "Cat Treats" },
  { id: "favorite recipes", label: "Favorite Recipes" },
  { id: "sale", label: "Sale" },
];
