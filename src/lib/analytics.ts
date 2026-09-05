import { analyticsEventTypes } from "./site-data";

export type AnalyticsEventType = (typeof analyticsEventTypes)[number];

export type AnalyticsPayload = {
    type: AnalyticsEventType;
    url?: string;
    title?: string;
    company?: string;
    jobId?: string;
    trafficSource?: string;
    searchQuery?: string;
    shareChannel?: string;
    meta?: Record<string, string | number | boolean | null | undefined>;
};

export async function trackEvent(payload: AnalyticsPayload) {
    if (typeof window === "undefined") {
        return;
    }

    try {
        const body = JSON.stringify({
            ...payload,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            source: new URLSearchParams(window.location.search).get("utm_source") ?? "direct",
        });

        if (navigator.sendBeacon) {
            navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
            return;
        }

        await fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
        });
    } catch {
    }
}
