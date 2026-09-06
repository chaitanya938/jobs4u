"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

export function GoogleAnalytics() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname || typeof window.gtag !== "function") {
            return;
        }

        const query = window.location.search.slice(1);
        const pagePath = query ? `${pathname}?${query}` : pathname;

        window.gtag("event", "page_view", {
            page_path: pagePath,
            page_location: window.location.href,
            page_title: document.title,
        });
    }, [pathname]);

    return null;
}
