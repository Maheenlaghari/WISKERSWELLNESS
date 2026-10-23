export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  category: string;
  categoryLabel: string;
  sizes: string[];
  weight: string;
  description: string;
  productInfo: string;
  shippingInfo: string;
  refundPolicy: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface CategoryItem {
  id: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title?: string;
  items: { label: string; href: string }[];
}

export interface SiteConfig {
  name: string;
  announcement: string;
  contact: {
    addressLine1: string;
    addressLine2: string;
    email: string;
    phone: string;
  };
  socialLinks: { label: string; href: string }[];
  footerLinks: { label: string; href: string }[];
}
