"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User as UserIcon,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  LogOut,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, register, logout } = useAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpCatName, setSignUpCatName] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFillDemo = () => {
    setSignInEmail("member@valiuwhiskers.com");
    setSignInPassword("wellness2026");
    setErrorMessage(null);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const res = await login(signInEmail, signInPassword);
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage("Signed in successfully. Redirecting to store.");
      setTimeout(() => {
        router.push("/shop");
      }, 1200);
    } else {
      setErrorMessage(res.error || "Unable to sign in. Please verify your credentials.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signUpFirstName || !signUpEmail || !signUpPassword) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);
    const res = await register({
      firstName: signUpFirstName,
      lastName: signUpLastName,
      email: signUpEmail,
      password: signUpPassword,
      catName: signUpCatName,
    });
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage("Your account has been created. Welcome to ValiuWhiskers.");
      setTimeout(() => {
        router.push("/shop");
      }, 1200);
    } else {
      setErrorMessage(res.error || "Registration could not be completed.");
    }
  };

  if (user) {
    return (
      <div className="min-h-[80vh] bg-[#34241D] text-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-[#241812] border border-[#443026] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#C5C622]/20 text-[#C5C622] flex items-center justify-center mx-auto mb-3">
              <UserIcon className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif italic text-white">
              Welcome Back, {user.firstName}
            </h1>
            <p className="text-xs text-stone-300">
              Active Member since {user.memberSince}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#2E1E17] border border-[#443026] space-y-2 text-xs">
            <div className="flex justify-between text-stone-300">
              <span>Account Email:</span>
              <span className="text-white font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Feline Companion:</span>
              <span className="text-[#C5C622] font-semibold">{user.catName || "Whiskers"}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Membership Tier:</span>
              <span className="text-white">VIP Nutritional Club</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/shop"
              className="w-full py-3 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-xs uppercase tracking-wider hover:bg-[#B4B51E] transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Explore Recipe Collection</span>
            </Link>

            <button
              type="button"
              onClick={logout}
              className="w-full py-2.5 rounded-full border border-[#553F32] hover:border-red-400 text-stone-300 hover:text-red-400 text-xs font-medium transition-colors flex items-center justify-center space-x-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-[#34241D] text-white py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#241812] border border-[#443026] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C5C622]">
            ValiuWhiskers Club
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif italic text-white">
            {mode === "signin" ? "Account Sign In" : "Join The Feline Club"}
          </h1>
          <p className="text-xs text-stone-300 max-w-xs mx-auto">
            {mode === "signin"
              ? "Access exclusive recipe orders and shipment tracking"
              : "Register to unlock tailored feline dietary recommendations"}
          </p>
        </div>

        <div className="grid grid-cols-2 p-1 bg-[#1A100B] rounded-xl border border-[#3E2D24] text-xs">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setErrorMessage(null);
            }}
            className={`py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              mode === "signin"
                ? "bg-[#C5C622] text-[#241812] font-semibold shadow-xs"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMessage(null);
            }}
            className={`py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              mode === "signup"
                ? "bg-[#C5C622] text-[#241812] font-semibold shadow-xs"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Create Account
          </button>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 flex items-start space-x-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-start space-x-2.5 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="signin-email"
                className="block text-xs font-medium text-stone-300 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="signin-email"
                  type="email"
                  required
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  placeholder="member@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#1B110B] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="signin-password"
                  className="block text-xs font-medium text-stone-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Password reset instructions simulated to your email.")}
                  className="text-[11px] text-[#C5C622] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-[#1B110B] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-white cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 text-xs text-stone-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#553F32] bg-[#1B110B] text-[#C5C622] focus:ring-[#C5C622]"
                />
                <span>Remember this device</span>
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-[11px] text-stone-400 hover:text-[#C5C622] flex items-center space-x-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#C5C622]" />
                <span>Fill Demo</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-xs uppercase tracking-wider hover:bg-[#B4B51E] disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md mt-2"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In To Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label
                  htmlFor="signup-firstname"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  First Name
                </label>
                <input
                  id="signup-firstname"
                  type="text"
                  required
                  value={signUpFirstName}
                  onChange={(e) => setSignUpFirstName(e.target.value)}
                  placeholder="Terry"
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1B110B] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-lastname"
                  className="block text-xs font-medium text-stone-300 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="signup-lastname"
                  type="text"
                  value={signUpLastName}
                  onChange={(e) => setSignUpLastName(e.target.value)}
                  placeholder="Francine"
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1B110B] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="block text-xs font-medium text-stone-300 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#1B110B] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-password"
                className="block text-xs font-medium text-stone-300 mb-1"
              >
                Password (Minimum Six Characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-[#1B110B] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-stone-400 hover:text-white cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="signup-catname"
                className="block text-xs font-medium text-stone-300 mb-1"
              >
                Cat Name (Optional)
              </label>
              <input
                id="signup-catname"
                type="text"
                value={signUpCatName}
                onChange={(e) => setSignUpCatName(e.target.value)}
                placeholder="Milo"
                className="w-full px-3 py-2.5 rounded-lg bg-[#1B110B] border border-[#553F32] text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#C5C622]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#C5C622] text-[#241812] font-semibold text-xs uppercase tracking-wider hover:bg-[#B4B51E] disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md mt-2"
            >
              {isSubmitting ? (
                <span>Creating Account...</span>
              ) : (
                <>
                  <span>Complete Registration</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-[#3E2D24] text-center">
          <p className="text-[11px] text-stone-400">
            Protected by bank grade 256 bit encryption. By continuing you agree to our store policies.
          </p>
        </div>
      </div>
    </div>
  );
}
