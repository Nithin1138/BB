import React from "react";
import Link from "next/link";
import { Tv, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-[480px] mx-auto py-24 text-center space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-[#F1F3F6] border border-[#E5E7EB] flex items-center justify-center mx-auto text-[#626873]">
        <Tv className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h1 className="text-2xl font-black text-[#111318] tracking-tight">
          This page went off the air.
        </h1>
        <p className="text-xs text-[#626873]">
          The episode moment or contestant discussion you are looking for does not exist or has been removed.
        </p>
      </div>

      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111318] dark:bg-white text-white dark:text-[#0A0D14] hover:bg-black dark:hover:bg-gray-100 active:scale-95 text-xs font-semibold rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go home</span>
        </Link>
      </div>
    </div>
  );
}
