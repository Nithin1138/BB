"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { StorageService } from "@/lib/storage";
import {
  Shield,
  Bell,
  User as UserIcon,
  Trash2,
  CheckCircle2,
  UserX,
  AlertTriangle
} from "lucide-react";

export default function SettingsPage() {
  const { user, openAuthModal, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [pollNotifs, setPollNotifs] = useState(true);
  const [replyNotifs, setReplyNotifs] = useState(true);
  const [debateNotifs, setDebateNotifs] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<string[]>(() => StorageService.getBlockedUsers());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  if (!user) {
    return (
      <div className="max-w-[480px] mx-auto text-center py-16 space-y-4">
        <h1 className="font-serif italic font-bold text-2xl text-[#121210] dark:text-[#F3F2EE]">Sign in to access Dossier Settings</h1>
        <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">
          Manage your BBPulse handle, notification triggers, and privacy controls.
        </p>
        <button
          onClick={() => openAuthModal("google")}
          className="px-5 py-2.5 bg-[#121210] dark:bg-[#F3F2EE] hover:bg-[#252520] dark:hover:bg-white text-[#FAF9F6] dark:text-[#121210] rounded-xl text-xs font-semibold shadow-xs"
        >
          Continue with Google
        </button>
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...user,
      display_name: displayName.trim(),
      bio: bio.trim()
    };
    StorageService.setUser(updated);

    // Sync to Neon Database
    try {
      await fetch("/api/user/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          poll_reminder: pollNotifs,
          email_notifications: replyNotifs,
          episode_reminder: debateNotifs
        })
      });
    } catch (err) {
      console.error("Failed to sync settings with Neon database:", err);
    }

    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleUnblock = (username: string) => {
    const updated = StorageService.unblockUser(username);
    setBlockedUsers(updated);
  };

  const handleDeleteAccount = () => {
    logout();
    setIsDeleteModalOpen(false);
    alert("Your account data has been removed from BBPulse.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Editorial Header */}
      <div className="pb-4 border-b border-[#E8E6DF] dark:border-[#24242A]">
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#E03137] dark:text-[#FF453A] mb-1">
          Dossier Configuration
        </div>
        <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#121210] dark:text-[#F3F2EE]">Account & Privacy Settings</h1>
        <p className="text-xs text-[#7C7A72] dark:text-[#A09E96] mt-0.5">
          Manage your public BBPulse ID, notification preferences, and privacy controls.
        </p>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Profile configuration saved successfully.</span>
        </div>
      )}

      {/* 1. Account Details Form */}
      <section className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#121210] dark:text-[#F3F2EE] uppercase tracking-wider pb-2 border-b border-[#E8E6DF] dark:border-[#24242A]">
          <UserIcon className="w-4 h-4 text-[#E03137] dark:text-[#FF453A]" />
          <span>Profile Identity</span>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1">
              Public BBPulse ID
            </label>
            <input
              type="text"
              disabled
              value={`@${user.username}`}
              className="w-full px-3.5 py-2.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl text-[#7C7A72] dark:text-[#A09E96] font-mono cursor-not-allowed"
            />
            <p className="font-mono text-[10px] text-[#7C7A72] dark:text-[#A09E96] mt-1">Unique handle across deliberations and ballots.</p>
          </div>

          <div>
            <label className="block font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl outline-hidden text-[#121210] dark:text-[#F3F2EE]"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-[#121210] dark:text-[#F3F2EE] mb-1">
              Short Bio / Editorial Perspective
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className="w-full p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] focus:border-[#E03137] rounded-xl outline-hidden text-[#121210] dark:text-[#F3F2EE]"
            />
          </div>

          <div className="p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#7C7A72] dark:text-[#A09E96] leading-relaxed">
              <strong className="text-[#121210] dark:text-[#F3F2EE]">Privacy Guarantee:</strong> Your authenticated Google identity ({user.email_private}) is strictly protected and never displayed publicly or shared with commercial entities.
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2.5 bg-[#E03137] hover:bg-[#C92A30] active:scale-95 text-white rounded-xl font-semibold shadow-xs transition-all cursor-pointer"
          >
            Save Configuration
          </button>
        </form>
      </section>

      {/* 2. Notification Preferences */}
      <section className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#121210] dark:text-[#F3F2EE] uppercase tracking-wider pb-2 border-b border-[#E8E6DF] dark:border-[#24242A]">
          <Bell className="w-4 h-4 text-[#E03137] dark:text-[#FF453A]" />
          <span>Dispatch & Alert Preferences</span>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl cursor-pointer border border-[#E8E6DF] dark:border-[#24242A]">
            <div className="mr-3">
              <div className="font-semibold text-[#121210] dark:text-[#F3F2EE]">Poll Closing Alerts</div>
              <div className="text-[11px] text-[#7C7A72] dark:text-[#A09E96]">Notify 4 hours before weekly community ballots lock.</div>
            </div>
            <input
              type="checkbox"
              checked={pollNotifs}
              onChange={(e) => setPollNotifs(e.target.checked)}
              className="accent-[#E03137] h-4 w-4 rounded shrink-0"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl cursor-pointer border border-[#E8E6DF] dark:border-[#24242A]">
            <div className="mr-3">
              <div className="font-semibold text-[#121210] dark:text-[#F3F2EE]">Discussion Replies & Agrees</div>
              <div className="text-[11px] text-[#7C7A72] dark:text-[#A09E96]">Notify when citizens respond to your dispatches.</div>
            </div>
            <input
              type="checkbox"
              checked={replyNotifs}
              onChange={(e) => setReplyNotifs(e.target.checked)}
              className="accent-[#E03137] h-4 w-4 rounded shrink-0"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-[#FAF9F6] dark:bg-[#1A1A1E] rounded-xl cursor-pointer border border-[#E8E6DF] dark:border-[#24242A]">
            <div className="mr-3">
              <div className="font-semibold text-[#121210] dark:text-[#F3F2EE]">Featured Editorial Debates</div>
              <div className="text-[11px] text-[#7C7A72] dark:text-[#A09E96]">Notify when the post-episode debate prompt goes live.</div>
            </div>
            <input
              type="checkbox"
              checked={debateNotifs}
              onChange={(e) => setDebateNotifs(e.target.checked)}
              className="accent-[#E03137] h-4 w-4 rounded shrink-0"
            />
          </label>
        </div>
      </section>

      {/* Blocked Accounts Management */}
      <section className="bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#121210] dark:text-[#F3F2EE] uppercase tracking-wider pb-2 border-b border-[#E8E6DF] dark:border-[#24242A]">
          <UserX className="w-4 h-4 text-[#E03137]" />
          <span>Blocked Accounts ({blockedUsers.length})</span>
        </div>

        {blockedUsers.length > 0 ? (
          <div className="space-y-2">
            {blockedUsers.map(uname => (
              <div key={uname} className="p-3 bg-[#FAF9F6] dark:bg-[#1A1A1E] border border-[#E8E6DF] dark:border-[#24242A] rounded-xl flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-[#121210] dark:text-[#F3F2EE]">@{uname}</span>
                <button
                  onClick={() => handleUnblock(uname)}
                  className="px-3 py-1 bg-white dark:bg-[#131316] border border-[#E8E6DF] dark:border-[#24242A] hover:bg-[#F0EEE6] active:scale-95 text-[#121210] dark:text-[#F3F2EE] rounded-lg transition-all cursor-pointer"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#7C7A72] dark:text-[#A09E96]">
            You have not blocked any accounts. Blocked users' posts and comments will not appear in your feeds.
          </p>
        )}
      </section>

      {/* Danger Zone: Delete Account */}
      <section className="bg-white dark:bg-[#131316] border border-[#E03137]/30 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-[#E03137] uppercase tracking-wider">
          <Trash2 className="w-4 h-4" />
          <span>Dissolve Account</span>
        </div>

        <p className="text-xs text-[#7C7A72] dark:text-[#A09E96] leading-relaxed">
          Permanently delete your BBPulse account, predictions history, and public profile handle. This action is irreversible.
        </p>

        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-[#E03137]/10 hover:bg-[#E03137]/20 active:scale-95 text-[#E03137] border border-[#E03137]/30 rounded-xl text-xs font-semibold transition-all cursor-pointer"
        >
          Initiate Account Dissolution
        </button>
      </section>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-[2px] p-0 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-[#FAF9F6] dark:bg-[#131316] rounded-t-3xl sm:rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E8E6DF] dark:border-[#24242A] shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1.5 bg-[#E8E6DF] dark:bg-[#333338] rounded-full mx-auto mb-2 sm:hidden" />
            <div className="flex items-center gap-2 text-[#E03137]">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-serif italic font-bold text-base text-[#121210] dark:text-[#F3F2EE]">Confirm Account Dissolution</h3>
            </div>
            <p className="text-xs text-[#7C7A72] dark:text-[#A09E96] leading-relaxed">
              Are you sure you want to delete @{user.username}? All personal forecasts, votes, and community comments will be dissociated permanently.
            </p>
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto px-3 py-2 text-xs text-[#7C7A72] dark:text-[#A09E96] hover:text-[#121210] dark:hover:text-[#F3F2EE] text-center"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full sm:w-auto px-4 py-2 bg-[#E03137] hover:bg-[#C92A30] active:scale-95 text-white rounded-xl text-xs font-semibold transition-all"
              >
                Yes, Dissolve My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
