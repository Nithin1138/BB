"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export interface WikipediaSyncInfo {
  articleTitle: string;
  wikipediaUrl: string;
  latestRevisionId: number;
  lastSyncedRevisionId: number;
  lastSyncedAt: string;
  isUpToDate: boolean;
  syncCount: number;
  lastChangesSummary: string;
  latencyMs: number;
}

export function useWikipediaSync() {
  const router = useRouter();
  const [syncInfo, setSyncInfo] = useState<WikipediaSyncInfo | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "polling">("connecting");
  const eventSourceRef = useRef<EventSource | null>(null);

  // 1. Fetch current status
  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/sync/wikipedia/status");
      if (res.ok) {
        const data = await res.json();
        setSyncInfo(data);
      }
    } catch (err) {
      console.error("[useWikipediaSync] checkStatus error:", err);
    }
  }, []);

  // 2. Trigger manual or force sync
  const triggerSync = useCallback(async (force = false) => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/sync/wikipedia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await checkStatus();
        if (data.hasUpdate && data.changes?.length > 0) {
          setNotification(`Wikipedia updated: ${data.changes[0]}`);
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("bbpulse:wikipedia_synced", { detail: data }));
          }
          router.refresh();
          setTimeout(() => setNotification(null), 8000);
        } else {
          setNotification(`Synchronized with Wikipedia (Rev #${data.revisionId})`);
          setTimeout(() => setNotification(null), 4000);
        }
      }
    } catch (err) {
      console.error("[useWikipediaSync] triggerSync error:", err);
    } finally {
      setIsSyncing(false);
    }
  }, [checkStatus, router]);

  // 3. Connect to SSE stream for low-latency live updates
  useEffect(() => {
    checkStatus();

    let es: EventSource | null = null;
    try {
      es = new EventSource("/api/sync/wikipedia/stream");
      eventSourceRef.current = es;

      es.onopen = () => {
        setConnectionStatus("connected");
      };

      es.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === "wiki_update") {
            // Live update arrived!
            checkStatus();
            setNotification(`Live Wikipedia Update: ${payload.changes?.[0] || "Revision #" + payload.revisionId}`);
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("bbpulse:wikipedia_synced", { detail: payload }));
            }
            router.refresh();
            setTimeout(() => setNotification(null), 8000);
          }
        } catch {
          // ignore
        }
      };

      es.onerror = () => {
        setConnectionStatus("polling");
        if (es) {
          es.close();
        }
      };
    } catch {
      setConnectionStatus("polling");
    }

    // Fallback polling interval every 25s
    const pollInterval = setInterval(() => {
      checkStatus();
    }, 25000);

    return () => {
      clearInterval(pollInterval);
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [checkStatus]);

  return {
    syncInfo,
    isSyncing,
    notification,
    connectionStatus,
    triggerSync,
    refreshStatus: checkStatus
  };
}
