"use client";

import { trackEvent, type AnalyticsEventType } from "@/lib/analytics";

type TrackedLinkProps = {
    href: string;
    label: string;
    eventType: AnalyticsEventType;
    eventMeta?: Record<string, string>;
    className?: string;
};

export function TrackedExternalLink({ href, label, eventType, eventMeta, className = "" }: TrackedLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
                void trackEvent({
                    type: eventType,
                    url: href,
                    title: label,
                    meta: eventMeta,
                })
            }
            className={className}
        >
            {label}
        </a>
    );
}
