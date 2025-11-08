"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
    if (loading) return;
    const privateRoutes = [
      "/profile",
      "/new-ad",
    ];
    const isPrivateRoute = privateRoutes.some((route) =>
      pathname.startsWith(route)
    );
    const isProfileRoute = pathname.startsWith("/profile/");

    if (isProfileRoute) {
      if (!user) {
        router.push("/auth");
        return;
      }
      const profileIdMatch = pathname.match(/\/profile\/(\d+)/);
      if (profileIdMatch) {
        const requestedId = parseInt(profileIdMatch[1]);
        const authenticatedUserId = parseInt(user.id);
        if (requestedId !== authenticatedUserId) {
          router.replace(`/profile/${authenticatedUserId}`);
          return;
        }
      }
    }
    if (!user && isPrivateRoute) {
      router.push("/auth");
      return;
    }
    if (user && pathname === "/auth") {
      router.push(`/profile/${user.id}`);
      return;
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
