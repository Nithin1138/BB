"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { INITIAL_CONTESTANTS } from "@/lib/mock-data";
import { X, Check, AlertCircle, Shield } from "lucide-react";

export function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalStep,
    signInWithGoogle,
    completeOnboarding,
    checkUsernameAvailable
  } = useAuth();

  const [usernameInput, setUsernameInput] = useState("telugu_fan_99");
  const [ageConfirmed, setAgeConfirmed] = useState(true);
  const [selectedContestant, setSelectedContestant] = useState<string>("c_priya");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleGoogleClick = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await signInWithGoogle();
    } catch {
      setErrorMsg("Unable to authenticate with Google. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishOnboarding = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!ageConfirmed) {
      setErrorMsg("You must be 18 or older to create a BBPulse account.");
      return;
    }

    const valid = checkUsernameAvailable(usernameInput);
    if (!valid) {
      setErrorMsg("Username must be 3-20 lowercase characters, numbers or underscores.");
      return;
    }

    setIsSubmitting(true);
    const success = await completeOnboarding(usernameInput, ageConfirmed, selectedContestant);
    setIsSubmitting(false);

    if (!success) {
      setErrorMsg("This BBPulse ID is already reserved or unavailable.");
    }
  };

  const isUsernameValid = checkUsernameAvailable(usernameInput);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 dark:bg-black/75 backdrop-blur-[2px] p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-[#131316] border-t sm:border border-[#E8E6DF] dark:border-[#24242A] rounded-t-3xl sm:rounded-2xl w-full max-w-[480px] p-6 sm:p-8 shadow-2xl relative text-[#121210] dark:text-[#F3F2EE] max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom duration-250">
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1 bg-[#E8E6DF] dark:bg-[#24242A] rounded-full mx-auto mb-4 sm:hidden" />

        {/* Close button */}
        <button
          onClick={closeAuthModal}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[#8A8983] hover:text-[#121210] dark:hover:text-[#F3F2EE] p-1.5 rounded-lg hover:bg-[#FAF9F6] dark:hover:bg-[#18181C] transition-colors cursor-pointer active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {authModalStep === "google" ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono tracking-widest text-[#E03137] dark:text-[#FF453A] uppercase font-semibold">
                AUTHENTICATED FAN ACCESS
              </span>
              <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[#121210] dark:text-[#F3F2EE] mt-2">
                Join <span className="italic">BBPulse</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5B56] dark:text-[#A1A1AA] mt-1.5 leading-relaxed">
                Participate in verified weekly community polls, join live episode debates, and log verifiable prediction accuracy.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              onClick={handleGoogleClick}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-white dark:bg-[#18181C] border border-[#E8E6DF] dark:border-[#24242A] hover:border-[#121210]/40 dark:hover:border-[#F3F2EE]/40 hover:bg-[#FAF9F6] dark:hover:bg-[#1C1C22] text-[#121210] dark:text-[#F3F2EE] font-mono text-xs font-semibold py-3 px-4 rounded-xl shadow-xs transition-all group cursor-pointer active:scale-98"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.13C3.25 21.37 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.13z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span>{isSubmitting ? "Connecting..." : "Continue with Google"}</span>
            </button>

            <div className="mt-5 p-3.5 bg-[#FAF9F6] dark:bg-[#18181C] rounded-xl border border-[#E8E6DF] dark:border-[#24242A] flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-[#E03137] dark:text-[#FF453A] shrink-0 mt-0.5" />
              <div className="text-xs text-[#5C5B56] dark:text-[#A1A1AA] leading-relaxed">
                <span className="font-semibold text-[#121210] dark:text-[#F3F2EE]">Privacy Guarantee:</span> Your Google email address is never made public. Only your chosen handle (`@username`) appears on community votes and discussions.
              </div>
            </div>

            <p className="text-[11px] font-mono text-[#8A8983] dark:text-[#7A7A85] text-center mt-5 leading-normal">
              18+ age verification required. Grounded in community standards.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFinishOnboarding}>
            <div className="mb-5">
              <span className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase font-semibold">
                STEP 02 OF 02
              </span>
              <h2 className="text-xl font-serif font-medium tracking-tight text-[#121210] dark:text-[#F3F2EE] mt-1.5">
                Choose your <span className="italic">BBPulse ID</span>
              </h2>
              <p className="text-xs text-[#5C5B56] dark:text-[#A1A1AA] mt-1">
                This public handle identifies your ballots, debate stances, and accuracy record.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg flex items-center gap-2 text-xs text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Username Input with realtime validation */}
              <div>
                <label htmlFor="bbpulse-id" className="block text-xs font-mono font-medium text-[#121210] dark:text-[#F3F2EE] mb-1.5">
                  BBPulse Public Handle
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8A8983] dark:text-[#7A7A85] font-mono">
                    @
                  </span>
                  <input
                    id="bbpulse-id"
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                    placeholder="your_handle"
                    maxLength={20}
                    className="w-full pl-8 pr-10 py-2.5 bg-[#FAF9F6] dark:bg-[#18181C] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] dark:focus:border-[#FF453A] focus:bg-white dark:focus:bg-[#131316] rounded-xl text-sm font-mono outline-hidden transition-all text-[#121210] dark:text-[#F3F2EE]"
                    required
                  />
                  {usernameInput.length >= 3 && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                      {isUsernameValid ? (
                        <Check className="w-4 h-4 text-[#10B981]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#E03137]" />
                      )}
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-mono text-[#8A8983] dark:text-[#7A7A85] mt-1">
                  3–20 characters. Letters, numbers, and underscores only.
                </p>
              </div>

              {/* Optional Favorite Contestant */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#121210] dark:text-[#F3F2EE] mb-1.5">
                  Favorite Contestant (Optional)
                </label>
                <select
                  value={selectedContestant}
                  onChange={(e) => setSelectedContestant(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF9F6] dark:bg-[#18181C] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl text-xs font-mono outline-hidden text-[#121210] dark:text-[#F3F2EE]"
                >
                  <option value="">None / Neutral Fan</option>
                  {INITIAL_CONTESTANTS.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.telugu_name})
                    </option>
                  ))}
                </select>
              </div>

              {/* Age confirmation check */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded-md border-[#E8E6DF] dark:border-[#24242A] text-[#E03137] dark:text-[#FF453A] focus:ring-[#E03137]"
                    required
                  />
                  <span className="text-xs text-[#5C5B56] dark:text-[#A1A1AA] leading-snug">
                    <strong className="text-[#121210] dark:text-[#F3F2EE]">Age Verification:</strong> I confirm that I am 18 years of age or older to participate on BBPulse.
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => authModalStep === "username" ? closeAuthModal() : null}
                className="w-1/3 py-2.5 px-4 text-xs font-mono text-[#5C5B56] dark:text-[#A1A1AA] hover:text-[#121210] dark:hover:text-[#F3F2EE] hover:bg-[#FAF9F6] dark:hover:bg-[#18181C] rounded-xl transition-all cursor-pointer active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isUsernameValid || !ageConfirmed || isSubmitting}
                className="w-2/3 py-2.5 px-4 text-xs font-mono font-medium bg-[#121210] dark:bg-[#F3F2EE] hover:bg-[#E03137] dark:hover:bg-[#FF453A] text-white dark:text-[#121210] dark:hover:text-white rounded-xl shadow-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
              >
                {isSubmitting ? "Setting Up..." : "Enter BBPulse →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
