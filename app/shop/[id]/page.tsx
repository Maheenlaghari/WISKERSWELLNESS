import React, { Suspense } from "react";
import { products } from "@/data/productsData";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#34241D] flex items-center justify-center text-white">
          <span>Loading...</span>
        </div>
      }
    >
      <ProductDetailClient id={id} />
    </Suspense>
  );
}
