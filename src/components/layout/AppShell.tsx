"use client";

import React, { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { MobileMenuDrawer } from "./MobileMenuDrawer";
import { Footer } from "./Footer";
import { AuthModal } from "@/components/auth/AuthModal";
import { SearchModal } from "@/components/search/SearchModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-[#FFFFFF] dark:bg-[#0C0C0D] text-[#09090B] dark:text-[#F4F4F5] selection:bg-[#FF4500]/20 selection:text-[#FF4500] transition-colors duration-200 overflow-x-hidden w-full max-w-full">
          {/* Global Header */}
          <Header
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          {/* Main Content Area: Responsive container with padding-bottom for mobile bottom navigation */}
          <main className="flex-1 w-full max-w-[1280px] mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-24 md:pb-8 animate-page-enter">
            {children}
          </main>

        {/* Global Editorial Footer */}
        <div>
          <Footer />
        </div>

        {/* Mobile Bottom Navigation Bar (md:hidden) */}
        <BottomNav onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

        {/* Mobile Slide-Over Menu Drawer */}
        <MobileMenuDrawer
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Global Modals */}
        <AuthModal />
        <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </div>
    </AuthProvider>
  </ThemeProvider>
);
}
