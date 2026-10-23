import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, shippingMethod, payment, discountCode, totals } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Basket is empty" },
        { status: 400 }
      );
    }

    if (!customer?.email || !customer?.firstName || !customer?.address) {
      return NextResponse.json(
        { error: "Incomplete shipping information" },
        { status: 400 }
      );
    }

    const orderNumber = `VW${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const responsePayload = {
      success: true,
      orderId: orderNumber,
      orderDate: formattedDate,
      estimatedDelivery: shippingMethod?.id === "express" ? "1 to 2 business days" : "3 to 5 business days",
      status: "Confirmed",
      customer: {
        name: `${customer.firstName} ${customer.lastName || ""}`.trim(),
        email: customer.email,
        phone: customer.phone || "",
        address: customer.address,
        apartment: customer.apartment || "",
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        country: customer.country,
      },
      shippingMethod: shippingMethod?.name || "Standard Delivery",
      items,
      totals,
      discountCode: discountCode || null,
      paymentMethod: payment?.type || "Credit Card",
      createdAt: now.toISOString(),
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
