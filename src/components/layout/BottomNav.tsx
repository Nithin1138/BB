"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  MessageSquare,
  Radio,
  TrendingUp,
  Target,
  Menu
} from "lucide-react";

interface BottomNavProps {
  onOpenMobileMenu: () => void;
}

export function BottomNav({ onOpenMobileMenu }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Discuss", href: "/discuss", icon: MessageSquare },
    { name: "Vote", href: "/vote", icon: Radio, badge: "Live" },
    { name: "Trend", href: "/trend", icon: TrendingUp },
    { name: "Predict", href: "/predict", icon: Target },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0C0C0D]/95 backdrop-blur-xl border-t border-[#E4E4E7] dark:border-[#232328] px-1 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_-4px_25px_rgba(0,0,0,0.7)] select-none transition-colors duration-200"
      style={{ paddingBottom: "max(0.6rem, env(safe-area-inset-bottom))" }}
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg transition-all duration-150 relative min-w-[58px] active:scale-90 ${
                isActive
                  ? "text-[#09090B] dark:text-[#F4F4F5]"
                  : "text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5]"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? "stroke-[2.2] scale-105" : "stroke-[1.8]"}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#FF4500] ring-2 ring-white dark:ring-[#0C0C0D] animate-pulse" />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? "font-bold text-[#09090B] dark:text-[#F4F4F5]" : "font-medium"}`}>
                {item.name}
              </span>
              {isActive && (
                <span className="w-3.5 h-0.5 rounded-full bg-[#FF4500] mt-0.5" />
              )}
            </Link>
          );
        })}

        {/* More / Menu Drawer Trigger */}
        <button
          onClick={onOpenMobileMenu}
          className="flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl text-[#626873] dark:text-[#9CA3AF] hover:text-[#111318] dark:hover:text-white transition-all duration-200 relative min-w-[58px] active:scale-90 cursor-pointer"
          aria-label="More options"
        >
          <Menu className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-0.5 font-medium tracking-tight">More</span>
        </button>
      </div>
    </nav>
  );
}

