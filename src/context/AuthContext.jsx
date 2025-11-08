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

    // Define ONLY routes that need authentication
    const privateRoutes = [
      "/profile",
      "/dashboard", 
      "/new-ad",
      "/my-ads",
      "/settings"
      // Add any other protected routes here
    ];

    // Check if current path is a private route
    const isPrivateRoute = privateRoutes.some((route) => 
      pathname.startsWith(route)
    );

    // Special handling for profile routes
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

    // If user is NOT logged in and trying to access a private route
    if (!user && isPrivateRoute) {
      router.push("/auth");
      return;
    }

    // If user IS logged in and trying to access auth page, redirect to profile
    if (user && pathname === "/auth") {
      router.push(`/profile/${user.id}`);
      return;
    }

    // All other routes are accessible without authentication
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
