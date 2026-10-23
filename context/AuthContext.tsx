"use client";

import React, {
  createContext,
  useContext,
  useSyncExternalStore,
  useMemo,
  useState,
  useCallback,
} from "react";
import { User } from "@/types";

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  catName?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = "valiu_user";
const USER_COOKIE_KEY = "valiu_user_session";

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

function subscribeAuth(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener("valiu_auth_update", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("valiu_auth_update", callback);
  };
}

function getAuthSnapshot(): string {
  if (typeof window === "undefined") return "null";
  try {
    const local = localStorage.getItem(USER_STORAGE_KEY);
    if (local && local !== "null") return local;
  } catch {
    // fallback to cookies
  }

  try {
    const cookie = getCookie(USER_COOKIE_KEY);
    if (cookie && cookie !== "null") return cookie;
  } catch {
    // fallback
  }

  return "null";
}

function getAuthServerSnapshot(): string {
  return "null";
}

function saveUserSession(userData: User | null) {
  if (typeof window === "undefined") return;
  if (userData) {
    const json = JSON.stringify(userData);
    try {
      localStorage.setItem(USER_STORAGE_KEY, json);
    } catch {
      // ignore quota
    }
    setCookie(USER_COOKIE_KEY, json, 30);
  } else {
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch {
      // ignore
    }
    deleteCookie(USER_COOKIE_KEY);
  }
  window.dispatchEvent(new Event("valiu_auth_update"));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const userJson = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getAuthServerSnapshot
  );

  const user: User | null = useMemo(() => {
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }, [userJson]);

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Invalid login credentials" };
      }

      saveUserSession(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during authentication" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (formData: RegisterData) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Unable to create account" };
      }

      saveUserSession(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during registration" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    saveUserSession(null);
    fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
