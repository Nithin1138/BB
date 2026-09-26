"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ShareCardConfig } from "@/types";
import { X, Copy, Check, Download, Share2, Sparkles } from "lucide-react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ShareCardConfig;
}

export function ShareModal({ isOpen, onClose, config }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [cardTheme, setCardTheme] = useState<"editorial_light" | "obsidian_noir">("editorial_light");
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.origin + (config.url || "") : "https://bbpulse.app";
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const isLight = cardTheme === "editorial_light";

      // Background
      ctx.fillStyle = isLight ? "#FFFFFF" : "#0C0C0D";
      ctx.fillRect(0, 0, 1200, 630);

      // Editorial Hairline Border
      ctx.strokeStyle = isLight ? "#E4E4E7" : "#232328";
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 30, 1140, 570);

      // Bespoke Aperture Mark
      ctx.fillStyle = isLight ? "#09090B" : "#F4F4F5";
      ctx.fillRect(80, 80, 48, 48);
      ctx.fillStyle = isLight ? "#FFFFFF" : "#0C0C0D";
      ctx.font = "bold 20px monospace";
      ctx.fillText("BB", 92, 111);

      // Brand Title
      ctx.fillStyle = isLight ? "#09090B" : "#F4F4F5";
      ctx.font = "bold 36px sans-serif";
      ctx.fillText("BBPULSE", 145, 112);

      ctx.fillStyle = isLight ? "#71717A" : "#71717A";
      ctx.font = "500 16px monospace";
      ctx.fillText("TELUGU OBSERVATORY DISPATCH", 145, 138);

      // Headline
      ctx.fillStyle = isLight ? "#09090B" : "#FFFFFF";
      ctx.font = "bold 46px sans-serif";
      ctx.fillText(config.headline, 80, 260);

      // Electric Orange Metric
      ctx.fillStyle = "#FF4500";
      ctx.font = "bold 76px monospace";
      ctx.fillText(config.main_metric, 80, 370);

      if (config.secondary_metric) {
        ctx.fillStyle = isLight ? "#71717A" : "#A1A1AA";
        ctx.font = "500 24px sans-serif";
        ctx.fillText(config.secondary_metric, 80, 420);
      }

      // Disclaimer & Broadsheet URL
      ctx.fillStyle = isLight ? "#71717A" : "#71717A";
      ctx.font = "400 16px monospace";
      ctx.fillText(config.disclaimer, 80, 530);
      ctx.fillText("bbpulse.app • Independent Fan Intelligence", 80, 560);

      const link = document.createElement("a");
      link.download = `bbpulse-dispatch-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-[#141416] border border-[#E4E4E7] dark:border-[#232328] rounded-2xl sm:rounded-xl w-full max-w-[760px] shadow-2xl p-4 sm:p-6 relative text-[#09090B] dark:text-[#F4F4F5] my-auto max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-150">
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1 bg-[#E4E4E7] dark:bg-[#32323A] rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#E4E4E7] dark:border-[#232328]">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF4500] bg-[#FF4500]/10 px-2 py-0.5 rounded-sm font-semibold">
                Social Dispatch Card
              </span>
            </div>
            <h2 id="share-modal-title" className="font-serif italic font-bold text-lg sm:text-xl text-[#09090B] dark:text-[#F4F4F5] mt-1">
              Share Community Intelligence
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[#71717A] hover:text-[#09090B] dark:hover:text-[#F4F4F5] p-1.5 rounded-md hover:bg-[#F4F4F5] dark:hover:bg-[#1B1B1F] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 mt-4 sm:mt-6">
          {/* Left: Card Preview */}
          <div className="md:col-span-7 flex flex-col items-center justify-center bg-[#F4F4F5] dark:bg-[#1B1B1F] p-3 sm:p-5 rounded-xl border border-[#E4E4E7] dark:border-[#232328]">
            <div
              ref={cardRef}
              className={`w-full min-h-[220px] sm:aspect-[16/10] rounded-lg p-4 sm:p-6 flex flex-col justify-between shadow-2xs border transition-all ${
                cardTheme === "editorial_light"
                  ? "bg-white border-[#E4E4E7] text-[#09090B]"
                  : "bg-[#0C0C0D] border-[#232328] text-[#F4F4F5]"
              }`}
            >
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center text-xs shrink-0 ${
                    cardTheme === "editorial_light"
                      ? "bg-[#09090B] text-white"
                      : "bg-[#F4F4F5] text-[#09090B]"
                  }`}>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <circle cx="12" cy="12" r="8" />
                      <circle cx="12" cy="12" r="2.5" fill="#FF4500" stroke="none" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-xs tracking-tight font-sans">BBPULSE</div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-[#71717A]">
                      Bigg Boss Telugu
                    </div>
                  </div>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded bg-[#FF4500]/10 text-[#FF4500] font-bold">
                  {config.type.toUpperCase()}
                </span>
              </div>

              {/* Card Middle: Headline & Main Metric */}
              <div className="my-auto py-2">
                <div className="font-serif italic text-base sm:text-lg font-bold tracking-tight leading-snug">
                  {config.headline}
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#FF4500] tracking-tight tabular-nums">
                    {config.main_metric}
                  </span>
                  {config.secondary_metric && (
                    <span className="font-mono text-xs text-[#71717A] dark:text-[#A1A1AA] font-medium">
                      {config.secondary_metric}
                    </span>
                  )}
                </div>

                {config.contestant_name && (
                  <div className="flex items-center gap-2 mt-3">
                    {config.contestant_avatar && (
                      <img
                        src={config.contestant_avatar}
                        alt=""
                        className="w-10 h-10 rounded-xl object-cover border-2 border-[#E4E4E7] dark:border-[#27272A] shadow-2xs shrink-0"
                      />
                    )}
                    <span className="font-serif font-semibold text-xs">{config.contestant_name}</span>
                  </div>
                )}
              </div>

              {/* Card Bottom: Disclaimers & URL */}
              <div className="pt-3 border-t border-current/10 flex items-center justify-between font-mono text-[9px] text-[#71717A]">
                <span className="truncate mr-2">{config.disclaimer}</span>
                <span className="font-semibold shrink-0">bbpulse.app</span>
              </div>
            </div>

            <div className="font-mono text-[10px] text-[#71717A] mt-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF4500]" />
              <span>Optimized 1200x630 broadsheet format for X, WhatsApp & Instagram</span>
            </div>
          </div>

          {/* Right: Controls & Actions (5 columns) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A] mb-2">
                Card Atmosphere
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCardTheme("editorial_light")}
                  className={`p-2.5 rounded-md border text-xs font-medium transition-all text-left cursor-pointer ${
                    cardTheme === "editorial_light"
                      ? "border-[#FF4500] bg-[#FF4500]/5 text-[#FF4500] font-semibold"
                      : "border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#1B1B1F] text-[#71717A]"
                  }`}
                >
                  <div className="font-medium text-[#09090B] dark:text-[#F4F4F5]">Chalk Paper</div>
                  <div className="font-mono text-[9px] text-[#71717A]">Pure broadsheet</div>
                </button>
                <button
                  onClick={() => setCardTheme("obsidian_noir")}
                  className={`p-2.5 rounded-md border text-xs font-medium transition-all text-left cursor-pointer ${
                    cardTheme === "obsidian_noir"
                      ? "border-[#FF4500] bg-[#FF4500]/5 text-[#FF4500] font-semibold"
                      : "border-[#E4E4E7] dark:border-[#232328] bg-white dark:bg-[#1B1B1F] text-[#71717A]"
                  }`}
                >
                  <div className="font-medium text-[#09090B] dark:text-[#F4F4F5]">Obsidian Noir</div>
                  <div className="font-mono text-[9px] text-[#71717A]">Midnight contrast</div>
                </button>
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#71717A] mb-1.5">
                  Direct Dispatch URL
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={typeof window !== "undefined" ? window.location.origin + (config.url || "") : "https://bbpulse.app"}
                    className="w-full bg-white dark:bg-[#1B1B1F] border border-[#E4E4E7] dark:border-[#232328] rounded-md px-2.5 py-2 text-xs text-[#71717A] font-mono outline-hidden select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="p-2 bg-white dark:bg-[#1B1B1F] hover:bg-[#F4F4F5] dark:hover:bg-[#232328] text-[#09090B] dark:text-[#F4F4F5] rounded-md border border-[#E4E4E7] dark:border-[#232328] transition-colors cursor-pointer shrink-0"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-[#E4E4E7] dark:border-[#232328]">
              <button
                onClick={handleSimulateDownload}
                className="w-full py-2.5 px-4 bg-[#FF4500] hover:bg-[#E03E00] active:scale-95 text-white rounded-md font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Dispatch (PNG)</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full py-2 px-4 bg-white dark:bg-[#1B1B1F] hover:bg-[#F4F4F5] dark:hover:bg-[#232328] border border-[#E4E4E7] dark:border-[#232328] text-[#09090B] dark:text-[#F4F4F5] rounded-md font-mono text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? "Link Copied!" : "Copy Shareable Link"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
