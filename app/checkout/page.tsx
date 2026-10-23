"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  ShoppingBag,
  CreditCard,
  Truck,
  Tag,
  Check,
  AlertCircle,
  Clock,
  Printer,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

interface OrderConfirmation {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  status: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  shippingMethod: string;
  items: Array<{
    product: {
      name: string;
      image: string;
      price: number;
    };
    quantity: number;
    selectedSize: string;
  }>;
  totals: {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    grandTotal: number;
  };
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();

  const [email, setEmail] = useState("");
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [stateRegion, setStateRegion] = useState("California");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [phone, setPhone] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">(
    "standard"
  );
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(
    null
  );

  const standardShippingCost = totalPrice >= 40 ? 0 : 4.99;
  const shippingFee =
    shippingMethod === "express" ? 9.99 : standardShippingCost;

  const estimatedTax = (totalPrice - couponDiscount) * 0.0825;
  const grandTotal = Math.max(
    0,
    totalPrice - couponDiscount + shippingFee + estimatedTax
  );

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const clean = couponCode.trim().toUpperCase();

    if (!clean) return;

    if (clean === "VALIU10") {
      const discount = totalPrice * 0.1;
      setCouponDiscount(discount);
      setAppliedCoupon("VALIU10 (10% Off)");
      setCouponCode("");
    } else if (clean === "PURRFECT") {
      const discount = Math.min(5, totalPrice);
      setCouponDiscount(discount);
      setAppliedCoupon("PURRFECT ($5 Off)");
      setCouponCode("");
    } else if (clean === "FREESHIP") {
      setCouponDiscount(shippingFee);
      setAppliedCoupon("FREESHIP (Free Delivery)");
      setCouponCode("");
    } else {
      setCouponError("Invalid discount code. Try VALIU10 or PURRFECT");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponError(null);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 2) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (cart.length === 0) {
      setFormError("Your basket is empty. Please add items before checking out.");
      return;
    }

    if (!email || !firstName || !lastName || !address || !city || !zipCode) {
      setFormError("Please fill in all required delivery fields.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvc || !cardName) {
        setFormError("Please enter valid card payment details.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        items: cart,
        customer: {
          firstName,
          lastName,
          email,
          phone,
          address,
          apartment,
          city,
          state: stateRegion,
          zip: zipCode,
          country,
          deliveryNotes,
        },
        shippingMethod: {
          id: shippingMethod,
          name:
            shippingMethod === "express"
              ? "Express Priority Delivery"
              : "Standard Ground Delivery",
        },
        payment: {
          type: paymentMethod === "card" ? "Credit Card" : "Cash on Delivery",
          lastFour: cardNumber.replace(/\s/g, "").slice(-4) || "4242",
        },
        discountCode: appliedCoupon,
        totals: {
          subtotal: Number(totalPrice.toFixed(2)),
          shipping: Number(shippingFee.toFixed(2)),
          discount: Number(couponDiscount.toFixed(2)),
          tax: Number(estimatedTax.toFixed(2)),
          grandTotal: Number(grandTotal.toFixed(2)),
        },
      };

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to complete checkout");
      }

      const result: OrderConfirmation = await response.json();
      setConfirmedOrder(result);

      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("valiu_orders");
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(result);
        localStorage.setItem("valiu_orders", JSON.stringify(list));
      }

      clearCart();
    } catch {
      setFormError("An unexpected error occurred while placing your order. Please retry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedOrder) {
    return (
      <div className="min-h-screen bg-[#241812] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#34241D] rounded-2xl border border-[#4E372B] p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-[#C5C622]/20 text-[#C5C622] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <p className="text-xs font-semibold text-[#C5C622] uppercase tracking-widest">
                Payment Received
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif italic">
                Thank You For Your Order
              </h1>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                We have received your order and our culinary kitchen is preparing your fresh recipe batch.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#271A14] border border-[#3E2D24] text-xs">
              <div>
                <span className="text-stone-400 block mb-0.5">Order Number</span>
                <span className="font-semibold text-white">{confirmedOrder.orderId}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Order Date</span>
                <span className="font-semibold text-white">{confirmedOrder.orderDate}</span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Estimated Arrival</span>
                <span className="font-semibold text-[#C5C622]">
                  {confirmedOrder.estimatedDelivery}
                </span>
              </div>
              <div>
                <span className="text-stone-400 block mb-0.5">Total Paid</span>
                <span className="font-semibold text-white">
                  ${confirmedOrder.totals.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#271A14] border border-[#3E2D24] space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5C622]">
                Order Status
              </h2>
              <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                <div className="space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#C5C622] text-[#241812] flex items-center justify-center mx-auto font-bold text-xs">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-white block">Placed</span>
                </div>
                <div className="space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#C5C622] text-[#241812] flex items-center justify-center mx-auto font-bold text-xs">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium text-white block">Prepping</span>
                </div>
                <div className="space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#3E2D24] text-stone-400 flex items-center justify-center mx-auto font-bold text-xs">
                    3
                  </div>
                  <span className="text-stone-400 block">Dispatched</span>
                </div>
                <div className="space-y-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#3E2D24] text-stone-400 flex items-center justify-center mx-auto font-bold text-xs">
                    4
                  </div>
                  <span className="text-stone-400 block">Delivered</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-white border-b border-[#3E2D24] pb-2">
                Purchased Recipes ({confirmedOrder.items.length})
              </h2>
              <div className="divide-y divide-[#3E2D24]">
                {confirmedOrder.items.map((item, idx) => (
                  <div
                    key={`${item.product.name}-${idx}`}
                    className="py-3 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded bg-[#ECE5DC] overflow-hidden shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-stone-400">
                          Portion: {item.selectedSize} | Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#271A14] border border-[#3E2D24] text-xs">
              <div>
                <p className="text-stone-400 mb-1">Delivering To:</p>
                <p className="font-medium text-white">{confirmedOrder.customer.name}</p>
                <p className="text-stone-300">{confirmedOrder.customer.address}</p>
                {confirmedOrder.customer.apartment && (
                  <p className="text-stone-300">{confirmedOrder.customer.apartment}</p>
                )}
                <p className="text-stone-300">
                  {confirmedOrder.customer.city}, {confirmedOrder.customer.state} {confirmedOrder.customer.zip}
                </p>
                <p className="text-stone-300">{confirmedOrder.customer.country}</p>
                <p className="text-stone-400 mt-1">{confirmedOrder.customer.email}</p>
              </div>
              <div className="space-y-1.5 sm:border-l sm:border-[#3E2D24] sm:pl-4">
                <p className="text-stone-400">Payment Breakdown:</p>
                <div className="flex justify-between text-stone-300">
                  <span>Subtotal</span>
                  <span>${confirmedOrder.totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Delivery</span>
                  <span>
                    {confirmedOrder.totals.shipping === 0
                      ? "Free"
                      : `$${confirmedOrder.totals.shipping.toFixed(2)}`}
                  </span>
                </div>
                {confirmedOrder.totals.discount > 0 && (
                  <div className="flex justify-between text-[#C5C622]">
                    <span>Discount</span>
                    <span>-${confirmedOrder.totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-300">
                  <span>Estimated Tax</span>
                  <span>${confirmedOrder.totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-[#3E2D24]">
                  <span>Total</span>
                  <span>${confirmedOrder.totals.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-[#5E483B] hover:border-white text-xs font-semibold text-stone-300 hover:text-white transition-colors flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Order Receipt</span>
              </button>

              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-xs uppercase tracking-wider hover:bg-[#B4B51E] transition-colors text-center shadow-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#241812] text-white">
      <header className="border-b border-[#3E2D24] bg-[#1E130E] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-[#C5C622] hover:opacity-90 transition-opacity"
          >
            ValiuWhiskers
          </Link>

          <div className="flex items-center space-x-1.5 text-xs text-stone-300">
            <Lock className="w-3.5 h-3.5 text-[#C5C622]" />
            <span>Secure 256 Bit Encrypted Checkout</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-center space-x-2 text-xs text-stone-400 mb-8">
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white font-medium">Checkout</span>
        </div>

        {cart.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 space-y-5 bg-[#34241D] rounded-2xl border border-[#4E372B] p-8">
            <div className="w-16 h-16 rounded-full bg-[#271A14] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8 text-[#5E483B]" />
            </div>
            <h2 className="text-xl font-bold font-serif italic">Your Basket is Empty</h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              Add some of our freshly prepared recipes to your basket before proceeding with checkout.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-2.5 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-xs uppercase tracking-wider hover:bg-[#B4B51E] transition-colors"
            >
              Browse Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-8">
              {formError && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-700/60 flex items-start space-x-3 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmitOrder} className="space-y-8">
                <section className="bg-[#34241D] rounded-2xl border border-[#4E372B] p-5 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#443026] pb-3">
                    <h2 className="text-base font-semibold text-white">
                      1. Contact Details
                    </h2>
                    <span className="text-xs text-stone-400">Required</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="email-address-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        id="email-address-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="recipient@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone-number-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Phone Number for Delivery Updates
                      </label>
                      <input
                        id="phone-number-input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="555 019 2834"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <label className="flex items-center space-x-2 text-xs text-stone-300 cursor-pointer pt-1">
                      <input
                        type="checkbox"
                        checked={subscribeNewsletter}
                        onChange={(e) => setSubscribeNewsletter(e.target.checked)}
                        className="rounded border-[#553F32] bg-[#241812] text-[#C5C622] focus:ring-[#C5C622]"
                      />
                      <span>Email me exclusive feline nutrition recipes and deals</span>
                    </label>
                  </div>
                </section>

                <section className="bg-[#34241D] rounded-2xl border border-[#4E372B] p-5 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#443026] pb-3">
                    <h2 className="text-base font-semibold text-white">
                      2. Delivery Address
                    </h2>
                    <span className="text-xs text-stone-400">Doorstep delivery</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="first-name-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        First Name
                      </label>
                      <input
                        id="first-name-input"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Terry"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="last-name-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        id="last-name-input"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Francine"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="street-address-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Street Address
                      </label>
                      <input
                        id="street-address-input"
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="500 Terry Francine Street"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="apartment-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Apartment, Suite, Unit (Optional)
                      </label>
                      <input
                        id="apartment-input"
                        type="text"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="Apt 4B"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="city-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        City
                      </label>
                      <input
                        id="city-input"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="San Francisco"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state-select"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        State or Province
                      </label>
                      <select
                        id="state-select"
                        value={stateRegion}
                        onChange={(e) => setStateRegion(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors cursor-pointer"
                      >
                        <option value="California">California</option>
                        <option value="New York">New York</option>
                        <option value="Texas">Texas</option>
                        <option value="Washington">Washington</option>
                        <option value="Florida">Florida</option>
                        <option value="Illinois">Illinois</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Colorado">Colorado</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="zip-code-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        ZIP Code
                      </label>
                      <input
                        id="zip-code-input"
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="94158"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country-select"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Country
                      </label>
                      <select
                        id="country-select"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors cursor-pointer"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="delivery-notes-input"
                        className="block text-xs font-medium text-stone-300 mb-1"
                      >
                        Delivery Instructions or Gate Code (Optional)
                      </label>
                      <textarea
                        id="delivery-notes-input"
                        rows={2}
                        value={deliveryNotes}
                        onChange={(e) => setDeliveryNotes(e.target.value)}
                        placeholder="Please place packages inside the porch entryway."
                        className="w-full px-3.5 py-2 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors resize-none"
                      />
                    </div>
                  </div>
                </section>

                <section className="bg-[#34241D] rounded-2xl border border-[#4E372B] p-5 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#443026] pb-3">
                    <h2 className="text-base font-semibold text-white">
                      3. Shipping Method
                    </h2>
                    <span className="text-xs text-[#C5C622]">Cold Pack Insulated</span>
                  </div>

                  <div className="space-y-3">
                    <label
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        shippingMethod === "standard"
                          ? "bg-[#271A14] border-[#C5C622]"
                          : "bg-[#241812] border-[#443026] hover:border-[#553F32]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="text-[#C5C622] focus:ring-[#C5C622]"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Standard Ground Delivery
                          </p>
                          <p className="text-xs text-stone-400">
                            Arrives in 3 to 5 business days
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#C5C622]">
                        {standardShippingCost === 0 ? "Free" : `$${standardShippingCost.toFixed(2)}`}
                      </span>
                    </label>

                    <label
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        shippingMethod === "express"
                          ? "bg-[#271A14] border-[#C5C622]"
                          : "bg-[#241812] border-[#443026] hover:border-[#553F32]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="text-[#C5C622] focus:ring-[#C5C622]"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">
                            Express Priority Delivery
                          </p>
                          <p className="text-xs text-stone-400">
                            Arrives in 1 to 2 business days
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-white">
                        $9.99
                      </span>
                    </label>
                  </div>
                </section>

                <section className="bg-[#34241D] rounded-2xl border border-[#4E372B] p-5 sm:p-7 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#443026] pb-3">
                    <h2 className="text-base font-semibold text-white">
                      4. Payment Details
                    </h2>
                    <span className="text-xs text-stone-400">Encrypted</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 text-xs font-medium cursor-pointer transition-colors ${
                        paymentMethod === "card"
                          ? "bg-[#271A14] border-[#C5C622] text-[#C5C622]"
                          : "bg-[#241812] border-[#443026] text-stone-400 hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cod")}
                      className={`py-2.5 px-3 rounded-xl border flex items-center justify-center space-x-2 text-xs font-medium cursor-pointer transition-colors ${
                        paymentMethod === "cod"
                          ? "bg-[#271A14] border-[#C5C622] text-[#C5C622]"
                          : "bg-[#241812] border-[#443026] text-stone-400 hover:text-white"
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      <span>Pay on Arrival</span>
                    </button>
                  </div>

                  {paymentMethod === "card" ? (
                    <div className="space-y-3">
                      <div>
                        <label
                          htmlFor="card-number-input"
                          className="block text-xs font-medium text-stone-300 mb-1"
                        >
                          Card Number
                        </label>
                        <input
                          id="card-number-input"
                          type="text"
                          maxLength={19}
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4000 1234 5678 9010"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="card-expiry-input"
                            className="block text-xs font-medium text-stone-300 mb-1"
                          >
                            Expiration (MM/YY)
                          </label>
                          <input
                            id="card-expiry-input"
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            placeholder="08/28"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="card-cvc-input"
                            className="block text-xs font-medium text-stone-300 mb-1"
                          >
                            Security Code (CVC)
                          </label>
                          <input
                            id="card-cvc-input"
                            type="password"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                            placeholder="123"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="cardholder-name-input"
                          className="block text-xs font-medium text-stone-300 mb-1"
                        >
                          Name on Card
                        </label>
                        <input
                          id="cardholder-name-input"
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="Terry Francine"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#241812] border border-[#553F32] text-sm text-white focus:outline-hidden focus:border-[#C5C622] transition-colors"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-[#241812] border border-[#443026] text-xs text-stone-300 space-y-1">
                      <p className="font-medium text-white">Cash or Card upon Doorstep Delivery</p>
                      <p className="text-stone-400">
                        Our courier will bring a contactless wireless reader upon delivery.
                      </p>
                    </div>
                  )}
                </section>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-sm uppercase tracking-wider hover:bg-[#B4B51E] disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xl hover:shadow-2xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-[#241812] border-t-transparent rounded-full animate-spin" />
                      <span>Processing Order...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Place Order • ${grandTotal.toFixed(2)}</span>
                    </div>
                  )}
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 sticky top-8 space-y-6">
              <div className="bg-[#34241D] rounded-2xl border border-[#4E372B] p-5 sm:p-7 space-y-6">
                <div className="flex items-center justify-between border-b border-[#443026] pb-3">
                  <h2 className="text-base font-semibold text-white">
                    Order Summary ({cart.reduce((acc, i) => acc + i.quantity, 0)})
                  </h2>
                  <Link
                    href="/shop"
                    className="text-xs text-[#C5C622] hover:underline"
                  >
                    Edit Basket
                  </Link>
                </div>

                <div className="divide-y divide-[#443026] max-h-80 overflow-y-auto pr-1 space-y-3">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="pt-3 first:pt-0 flex items-center space-x-3 text-xs"
                    >
                      <div className="relative w-14 h-14 rounded-lg bg-[#ECE5DC] overflow-hidden shrink-0 border border-[#553F32]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-1"
                        />
                        <span className="absolute -top-1 -right-1 bg-[#241812] text-[#C5C622] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#C5C622]">
                          {item.quantity}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate text-xs">
                          {item.product.name}
                        </p>
                        <p className="text-stone-400 text-[11px]">
                          Portion: {item.selectedSize}
                        </p>
                        <p className="text-[#C5C622] font-semibold mt-0.5">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#443026]">
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Discount code: VALIU10"
                        className="w-full pl-8 pr-3 py-2 rounded-lg bg-[#241812] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#443026] hover:bg-[#553F32] text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {couponError && (
                    <p className="text-[11px] text-red-400 mt-1.5">{couponError}</p>
                  )}

                  {appliedCoupon && (
                    <div className="mt-2 flex items-center justify-between p-2 rounded-md bg-[#241812] border border-[#C5C622]/40 text-xs text-[#C5C622]">
                      <span className="flex items-center space-x-1.5">
                        <Tag className="w-3 h-3" />
                        <span>{appliedCoupon} applied</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-stone-400 hover:text-white cursor-pointer text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-[#443026] text-xs">
                  <div className="flex justify-between text-stone-300">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-stone-300">
                    <span>Delivery</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-[#C5C622] font-semibold">Free</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-[#C5C622]">
                      <span>Promo Discount</span>
                      <span>-${couponDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-300">
                    <span>Estimated Sales Tax</span>
                    <span>${estimatedTax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold text-white pt-3 border-t border-[#443026]">
                    <span>Total Amount</span>
                    <span className="text-base text-[#C5C622]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#2B1D17] border border-[#3E2D24] space-y-2.5 text-xs text-stone-300">
                <div className="flex items-center space-x-2 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#C5C622]" />
                  <span>The ValiuWhiskers Guarantee</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Real culinary ingredients formulated for your feline family. Free returns within 30 days if your cat is not fully delighted.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
