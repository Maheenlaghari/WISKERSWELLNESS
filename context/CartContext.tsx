"use client";

import React, {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
  useMemo,
} from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "valiu_cart";
const COOKIE_KEY = "valiu_cart";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener("storage", callback);
  window.addEventListener("valiu_cart_update", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("valiu_cart_update", callback);
  };
}

function getSnapshot(): string {
  if (typeof window === "undefined") {
    return "[]";
  }

  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local && local !== "[]") {
      return local;
    }
  } catch {
    // fallback to cookies
  }

  try {
    const cookie = getCookie(COOKIE_KEY);
    if (cookie && cookie !== "[]") {
      try {
        localStorage.setItem(STORAGE_KEY, cookie);
      } catch {
        // ignore storage quota error
      }
      return cookie;
    }
  } catch {
    // fallback
  }

  return "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  const json = JSON.stringify(items);

  try {
    localStorage.setItem(STORAGE_KEY, json);
  } catch {
    // ignore storage quota or disabled mode
  }

  try {
    if (items.length === 0) {
      deleteCookie(COOKIE_KEY);
    } else {
      setCookie(COOKIE_KEY, json, 30);
    }
  } catch {
    // ignore cookie security restrictions
  }

  window.dispatchEvent(new Event("valiu_cart_update"));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartJson = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const cart: CartItem[] = useMemo(() => {
    try {
      return JSON.parse(cartJson);
    } catch {
      return [];
    }
  }, [cartJson]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    size: string = product.sizes[0] || "Standard"
  ) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    let next: CartItem[];
    if (existingIndex > -1) {
      next = [...cart];
      next[existingIndex] = {
        ...next[existingIndex],
        quantity: next[existingIndex].quantity + quantity,
      };
    } else {
      next = [...cart, { product, quantity, selectedSize: size }];
    }

    saveCart(next);
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    const next = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === size)
    );
    saveCart(next);
  };

  const updateQuantity = (
    productId: string,
    size: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    const next = cart.map((item) =>
      item.product.id === productId && item.selectedSize === size
        ? { ...item, quantity }
        : item
    );
    saveCart(next);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
