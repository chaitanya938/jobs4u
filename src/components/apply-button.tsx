"use client";

import { trackEvent } from "@/lib/analytics";

export function ApplyButton({
    href,
    title,
    company,
    jobId,
}: {
    href: string;
    title: string;
    company: string;
    jobId: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
                void trackEvent({
                    type: "apply_click",
                    url: href,
                    title,
                    company,
                    jobId,
                });
            }}
            className="jobs4u-focus inline-flex items-center justify-center rounded-2xl bg-[#1ed760] px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-950 transition hover:opacity-90 shadow-sm hover:scale-105"
        >
            Apply Now
        </a>
    );
}
