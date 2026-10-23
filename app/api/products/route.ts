import { NextResponse } from "next/server";
import { products } from "@/data/productsData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  let filtered = [...products];

  if (category && category !== "all") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (featured === "true") {
    filtered = filtered.filter((p) => p.featured);
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    data: filtered,
  });
}
