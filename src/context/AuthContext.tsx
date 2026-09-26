"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { StorageService } from "@/lib/storage";

interface AuthContextType {
  user: User | null;
  role: UserRole | "visitor";
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalStep: "google" | "username" | "age";
  isGoogleConfigured: boolean;
  openAuthModal: (initialStep?: "google" | "username" | "age") => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  completeOnboarding: (username: string, ageConfirmed: boolean, favoriteContestantId?: string) => Promise<boolean>;
  setRole: (role: UserRole | "visitor") => void;
  logout: () => void;
  toggleFollowContestant: (contestantId: string) => void;
  checkUsernameAvailable: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalStep, setAuthModalStep] = useState<"google" | "username" | "age">("google");
  const [role, setRoleState] = useState<UserRole | "visitor">("user");
  const [isGoogleConfigured, setIsGoogleConfigured] = useState(false);

  useEffect(() => {
    // 1. Initialize user from local storage
    const storedUser = StorageService.getUser();
    if (storedUser) {
      setUser(storedUser);
      setRoleState(storedUser.role);
    }

    // 2. Verify with server session (/api/auth/me)
    async function verifySession() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setIsGoogleConfigured(Boolean(data.isGoogleConfigured));
          if (data.user) {
            setUser(data.user);
            setRoleState(data.user.role);
            StorageService.setUser(data.user);
          }
        }
      } catch (err) {
        console.error("Session verification error:", err);
      }
    }
    verifySession();
  }, []);

  const openAuthModal = (step: "google" | "username" | "age" = "google") => {
    setAuthModalStep(step);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async () => {
    if (isGoogleConfigured) {
      const returnTo = typeof window !== "undefined" ? window.location.pathname + window.location.search : "/";
      window.location.href = `/api/auth/google?returnTo=${encodeURIComponent(returnTo)}`;
      return;
    }

    // Fallback: If Google credentials are not yet added to Vercel/environment,
    // advance to username onboarding so the user can test the app smoothly
    setAuthModalStep("username");
  };

  const checkUsernameAvailable = (username: string): boolean => {
    const cleaned = username.toLowerCase().replace("@", "").trim();
    if (!/^[a-z0-9_]{3,20}$/.test(cleaned)) return false;
    const reserved = ["admin", "moderator", "bbpulse", "support", "official", "system"];
    return !reserved.includes(cleaned);
  };

  const completeOnboarding = async (
    username: string,
    ageConfirmed: boolean,
    favoriteContestantId?: string
  ): Promise<boolean> => {
    const cleaned = username.toLowerCase().replace("@", "").trim();
    if (!checkUsernameAvailable(cleaned) || !ageConfirmed) {
      return false;
    }

    const newUser: User = {
      id: "usr_" + Date.now(),
      email_private: "fan.secure@gmail.com",
      username: cleaned,
      display_name: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
      avatar_url: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80`,
      bio: "Bigg Boss Telugu community member",
      role: "user",
      age_confirmed: true,
      joined_date: new Date().toISOString().split("T")[0],
      followed_contestants: favoriteContestantId ? [favoriteContestantId] : [],
      blocked_users: [],
      predictions_count: 0,
      accuracy_rate: 0
    };

    StorageService.setUser(newUser);
    setUser(newUser);
    setRoleState("user");
    setIsAuthModalOpen(false);
    return true;
  };

  const setRole = (newRole: UserRole | "visitor") => {
    setRoleState(newRole);
    if (newRole === "visitor") {
      setUser(null);
    } else {
      const current = user || StorageService.getUser();
      const updated: User = {
        ...current,
        role: newRole
      };
      StorageService.setUser(updated);
      setUser(updated);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout API error:", err);
    }
    StorageService.clearUser();
    setUser(null);
    setRoleState("visitor");
  };

  const toggleFollowContestant = (contestantId: string) => {
    if (!user) {
      openAuthModal();
      return;
    }
    const updatedFollows = StorageService.toggleFollowContestant(user.id, contestantId);
    const updatedUser = { ...user, followed_contestants: updatedFollows };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user && role !== "visitor",
        isAuthModalOpen,
        authModalStep,
        isGoogleConfigured,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        completeOnboarding,
        setRole,
        logout,
        toggleFollowContestant,
        checkUsernameAvailable,
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
