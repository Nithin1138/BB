"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Bell,
  Check,
  ChevronDown,
  User as UserIcon,
  ShieldAlert,
  Settings,
  LogOut,
  Flame,
  Radio,
  Menu
} from "lucide-react";
import { StorageService } from "@/lib/storage";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenMobileMenu?: () => void;
}

export function Header({ onOpenSearch, onOpenMobileMenu }: HeaderProps) {
  const pathname = usePathname();
  const { user, role, setRole, openAuthModal, logout } = useAuth();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState(() => StorageService.getNotifications(user?.id || ""));

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Vote", href: "/vote", badge: "Live" },
    { name: "Nominations", href: "/contestants/nominations" },
    { name: "Contestants", href: "/contestants" },
    { name: "Chats", href: "/chats", badge: "Live" },
    { name: "Upcoming", href: "/upcoming" },
    { name: "Discuss", href: "/discuss" },
    { name: "Trend", href: "/trend" },
    { name: "Predict", href: "/predict" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    notifications.forEach(n => StorageService.markNotificationAsRead(n.id));
    setNotifications(StorageService.getNotifications(user?.id || ""));
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0C0C0D]/95 backdrop-blur-md border-b border-[#E4E4E7] dark:border-[#232328]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-14 sm:h-15 flex items-center justify-between">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-md bg-[#09090B] dark:bg-[#F4F4F5] flex items-center justify-center text-white dark:text-[#09090B] shadow-2xs group-hover:scale-105 transition-all">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="8" />
                <path d="M12 4v4m0 8v4M4 12h4m8 0h4" strokeLinecap="round" />
                <circle cx="12" cy="12" r="2.5" fill="#FF4500" stroke="none" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#09090B] dark:text-[#F4F4F5] font-sans">
                BBPULSE
              </span>
              <span className="text-[10px] font-mono font-medium text-[#71717A] tracking-widest uppercase">
                TELUGU
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md text-xs lg:text-[13px] transition-all duration-150 relative flex items-center gap-1.5 active:scale-95 ${
                    isActive
                      ? "text-[#09090B] dark:text-[#F4F4F5] font-semibold bg-[#F4F4F5] dark:bg-[#1B1B1F]"
                      : "text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5]/60 dark:hover:bg-[#141416] font-medium"
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right actions: Search, Notifications, Role Switcher / Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Global Search trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 text-xs text-[#71717A] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] bg-white hover:bg-[#F4F4F5] dark:bg-[#141416] dark:hover:bg-[#1B1B1F] border border-[#E4E4E7] hover:border-[#09090B]/30 dark:border-[#232328] dark:hover:border-[#F4F4F5]/30 px-2.5 sm:px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer active:scale-95"
            aria-label="Search BBPulse"
          >
            <Search className="w-3.5 h-3.5 text-[#71717A]" />
            <span className="hidden sm:inline text-xs font-mono">Search...</span>
            <kbd className="hidden lg:inline text-[10px] bg-[#F4F4F5] dark:bg-[#1B1B1F] border border-[#E4E4E7] dark:border-[#232328] text-[#71717A] dark:text-[#A1A1AA] px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Notification dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative p-2 text-[#52525B] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] rounded-lg transition-all duration-150 active:scale-90 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF4500]" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl shadow-xl p-3 z-50 text-xs animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7] dark:border-[#232328] mb-2">
                  <span className="font-serif italic font-bold text-sm text-[#09090B] dark:text-[#F4F4F5]">Dispatches</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="font-mono text-[10px] text-[#FF4500] hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="space-y-1.5 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <Link
                      key={n.id}
                      href={n.link}
                      onClick={() => setShowNotifDropdown(false)}
                      className={`block p-2 rounded-lg transition-colors ${
                        n.read
                          ? "bg-white dark:bg-[#141416] hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F]"
                          : "bg-[#F4F4F5] dark:bg-[#1B1B1F]/70 hover:bg-[#E4E4E7]/60 dark:hover:bg-[#1B1B1F]"
                      }`}
                    >
                      <div className="font-medium text-[#09090B] dark:text-[#F4F4F5]">{n.title}</div>
                      <div className="text-[#52525B] dark:text-[#A1A1AA] text-[11px] mt-0.5 leading-snug">{n.message}</div>
                      <div className="text-[10px] font-mono text-[#71717A] mt-1">{n.created_at}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role selector dropdown: Visible on desktop */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#09090B] dark:text-[#F4F4F5] bg-[#F4F4F5] dark:bg-[#141416] hover:bg-[#E4E4E7] dark:hover:bg-[#1B1B1F] px-2.5 py-1.5 rounded-lg border border-[#E4E4E7] dark:border-[#232328] transition-all duration-150 active:scale-95 cursor-pointer"
              title="Switch user role for testing"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span className="capitalize">{role === "user" ? `@${user?.username || 'user'}` : role}</span>
              <ChevronDown className="w-3 h-3 text-[#71717A]" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-xl shadow-xl p-1.5 z-50 text-xs animate-in fade-in duration-150">
                <div className="px-2.5 py-1.5 font-mono text-[9px] uppercase font-bold tracking-wider text-[#71717A]">
                  Role Audit View:
                </div>
                <button
                  onClick={() => { setRole("user"); setShowRoleDropdown(false); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] flex items-center justify-between text-[#09090B] dark:text-[#F4F4F5] cursor-pointer transition-colors"
                >
                  <span>Fan User (@nithin24)</span>
                  {role === "user" && <Check className="w-3.5 h-3.5 text-[#FF4500]" />}
                </button>
                <button
                  onClick={() => { setRole("moderator"); setShowRoleDropdown(false); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] flex items-center justify-between text-[#09090B] dark:text-[#F4F4F5] cursor-pointer transition-colors"
                >
                  <span>Moderator</span>
                  {role === "moderator" && <Check className="w-3.5 h-3.5 text-[#FF4500]" />}
                </button>
                <button
                  onClick={() => { setRole("admin"); setShowRoleDropdown(false); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] flex items-center justify-between text-[#09090B] dark:text-[#F4F4F5] cursor-pointer transition-colors"
                >
                  <span>Admin</span>
                  {role === "admin" && <Check className="w-3.5 h-3.5 text-[#FF4500]" />}
                </button>
                <button
                  onClick={() => { setRole("visitor"); setShowRoleDropdown(false); }}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] flex items-center justify-between text-[#09090B] dark:text-[#F4F4F5] cursor-pointer transition-colors"
                >
                  <span>Anonymous Visitor</span>
                  {role === "visitor" && <Check className="w-3.5 h-3.5 text-[#FF4500]" />}
                </button>

                <div className="border-t border-[#E4E4E7] dark:border-[#232328] my-1" />

                <Link
                  href="/admin"
                  onClick={() => setShowRoleDropdown(false)}
                  className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#FF4500]/10 flex items-center gap-1.5 text-[#FF4500] font-medium transition-colors"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Admin & Mod Portal</span>
                </Link>
              </div>
            )}
          </div>

          {/* User Profile or Sign In CTA */}
          {user ? (
            <Link
              href={`/u/${user.username}`}
              className="flex items-center gap-2 pl-0.5 group"
              title="View Public Profile"
            >
              <img
                src={user.avatar_url}
                alt={user.display_name}
                className="w-7.5 h-7.5 rounded-full border border-[#E4E4E7] dark:border-[#232328] object-cover"
              />
            </Link>
          ) : (
            <button
              onClick={() => openAuthModal("google")}
              className="text-xs font-semibold bg-[#09090B] dark:bg-[#F4F4F5] hover:bg-black dark:hover:bg-white text-white dark:text-[#09090B] px-3.5 py-1.5 rounded-md transition-all shadow-xs cursor-pointer active:scale-95"
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Drawer Trigger */}
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="p-1.5 sm:p-2 text-[#52525B] hover:text-[#09090B] dark:text-[#A1A1AA] dark:hover:text-[#F4F4F5] hover:bg-[#F4F4F5] dark:hover:bg-[#141416] rounded-md transition-all active:scale-90 md:hidden cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Desktop Vote CTA Button */}
          <Link
            href="/vote"
            className="hidden xl:flex items-center gap-1.5 text-xs font-semibold bg-[#FF4500] hover:bg-[#E03E00] text-white px-3.5 py-1.5 rounded-md transition-all shadow-xs ml-1 active:scale-95"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>Cast Ballot</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
