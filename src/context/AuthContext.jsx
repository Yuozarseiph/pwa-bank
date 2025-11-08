"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error reading auth state:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Handle authentication redirects
  useEffect(() => {
    if (loading) return;

    const publicPaths = ["/auth", "/", "/soon", "/new-ad"];
    const isPublicPath = publicPaths.some((path) => pathname === path);

    // Check if trying to access profile route
    const isProfileRoute = pathname.startsWith("/profile/");

    if (isProfileRoute) {
      // If not logged in, redirect to auth
      if (!user) {
        router.push("/auth");
        return;
      }

      // If logged in, check if viewing own profile
      const profileIdMatch = pathname.match(/\/profile\/(\d+)/);
      if (profileIdMatch) {
        const requestedId = parseInt(profileIdMatch[1]);
        const authenticatedUserId = parseInt(user.id);

        // If trying to view someone else's profile, redirect to own profile
        if (requestedId !== authenticatedUserId) {
          router.replace(`/profile/${authenticatedUserId}`);
          return;
        }
      }
    }

    // If user is not logged in and trying to access protected route
    if (!user && !isPublicPath && !isProfileRoute) {
      router.push("/auth");
    }

    // If user is logged in and trying to access auth page
    if (user && pathname === "/auth") {
      router.push(`/profile/${user.id}`);
    }
  }, [user, pathname, loading, router]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    router.push(`/profile/${userData.id}`);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/auth");
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
