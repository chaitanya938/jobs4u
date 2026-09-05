"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ViewTracker({
    type,
    title,
    url,
    company,
    jobId,
    searchQuery,
}: {
    type: "page_view" | "job_view" | "referral_view" | "resume_view" | "interview_view" | "question_view";
    title: string;
    url: string;
    company?: string;
    jobId?: string;
    searchQuery?: string;
}) {
    useEffect(() => {
        void trackEvent({
            type,
            title,
            url,
            company,
            jobId,
            searchQuery,
        });
    }, [type, title, url, company, jobId, searchQuery]);

    return null;
}
