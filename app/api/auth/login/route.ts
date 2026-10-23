import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least six characters" },
        { status: 400 }
      );
    }

    const namePart = email.split("@")[0];
    const capitalizedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const user = {
      id: `usr_${Math.floor(100000 + Math.random() * 900000)}`,
      firstName: capitalizedName,
      lastName: "Member",
      email,
      catName: "Whiskers",
      memberSince: "October 2026",
      token: `jwt_valiu_${Date.now()}`,
    };

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
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
      { success: false, error: "Server authentication error" },
      { status: 500 }
    );
  }
}
