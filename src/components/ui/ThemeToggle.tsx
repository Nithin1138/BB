"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 rounded-xl bg-[#F1F3F6] dark:bg-[#1C2333] border border-[#E5E7EB] dark:border-[#232B3E] animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`relative inline-flex items-center justify-center gap-2 p-2 rounded-xl transition-all duration-300 ease-out active:scale-90 cursor-pointer select-none border border-[#E8E6DF] hover:border-[#121210]/30 dark:border-[#24242A] dark:hover:border-[#F3F2EE]/30 bg-[#FAF9F6] hover:bg-[#F0EEE6] dark:bg-[#131316] dark:hover:bg-[#1A1A1E] text-[#7C7A72] hover:text-[#121210] dark:text-[#A09E96] dark:hover:text-[#F3F2EE] shadow-xs ${className}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun
          className={`w-4 h-4 text-amber-500 absolute transition-all duration-300 transform ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        {/* Moon Icon */}
        <Moon
          className={`w-4 h-4 text-[#F3F2EE] absolute transition-all duration-300 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-medium tracking-tight">
          {isDark ? "Dark Theme" : "Light Theme"}
        </span>
      )}
    </button>
  );
}
