import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, catName } = await request.json();

    if (!firstName || !email || !password) {
      return NextResponse.json(
        { success: false, error: "First name, email, and password are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least six characters" },
        { status: 400 }
      );
    }

    const user = {
      id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
      firstName: firstName.trim(),
      lastName: lastName?.trim() || "",
      email: email.trim().toLowerCase(),
      catName: catName?.trim() || "Whiskers",
      memberSince: "October 2026",
      token: `jwt_valiu_${Date.now()}`,
    };

    const response = NextResponse.json({
      success: true,
      message: "Registration completed successfully",
      user,
    });

    response.cookies.set("valiu_auth_token", user.token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Server registration error" },
      { status: 500 }
    );
  }
}
