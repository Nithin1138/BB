"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  ShieldAlert,
  ShieldCheck,
  Radio,
  Users,
  MessageSquare,
  FileCheck,
  LayoutDashboard
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useAuth();

  const adminNav = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Moderation Queue", href: "/admin/moderation", icon: ShieldAlert, badge: "Live" },
    { name: "Housemates", href: "/admin/contestants", icon: Users },
    { name: "Polls & Ballots", href: "/admin/polls", icon: Radio },
    { name: "Editorial Debates", href: "/admin/debates", icon: MessageSquare },
    { name: "Observatory Submissions", href: "/admin/roundup", icon: FileCheck },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Admin Subheader Notice */}
      <div className="bg-[#121210] dark:bg-[#131316] text-[#FAF9F6] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md border border-[#E8E6DF]/20 dark:border-[#24242A]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#E03137] rounded-xl text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif italic font-bold text-base sm:text-lg tracking-tight">
              BBPulse Editorial Moderation & Dispatch Desk
            </h2>
            <div className="font-mono text-[11px] text-[#FAF9F6]/70 mt-0.5">
              Verified Terminal • Active Authorization: <strong className="text-[#FF453A] uppercase">{role}</strong>
            </div>
          </div>
        </div>

        <div className="font-mono text-xs text-[#FAF9F6]/80 bg-[#1A1A1E] px-3 py-1.5 rounded-lg border border-[#333338]">
          SEASON 10 DASAVATHARAM • DAY · 24 DISPATCH
        </div>
      </div>

      {/* Admin Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2 border-b border-[#E8E6DF] dark:border-[#24242A]">
        {adminNav.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all active:scale-95 shrink-0 ${
                isActive
                  ? "bg-[#121210] dark:bg-[#F3F2EE] text-[#FAF9F6] dark:text-[#121210] shadow-xs"
                  : "bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.name}</span>
              {item.badge && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#E03137]" />
              )}
            </Link>
          );
        })}
      </div>

      {/* Main Admin Page Area */}
      <div>{children}</div>
    </div>
  );
}
