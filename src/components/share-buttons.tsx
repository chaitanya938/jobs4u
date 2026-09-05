"use client";

import { Copy, MessageCircle, Send, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function ShareButtons({ title, url }: { title: string; url: string }) {
    const [copied, setCopied] = useState(false);

    const shareUrl = encodeURIComponent(url);
    const shareText = encodeURIComponent(title);

    useEffect(() => {
        const timeout = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timeout);
    }, [copied]);

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        void trackEvent({ type: "share_click", title, url, shareChannel: "copy" });
    };

    return (
        <div className="flex flex-wrap gap-3">
            <a href={`https://wa.me/?text=${shareText}%20${shareUrl}`} target="_blank" rel="noreferrer" onClick={() => void trackEvent({ type: "share_click", title, url, shareChannel: "whatsapp" })} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-800">
                <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noreferrer" onClick={() => void trackEvent({ type: "share_click", title, url, shareChannel: "telegram" })} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-800">
                <Send className="h-4 w-4" /> Telegram
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" onClick={() => void trackEvent({ type: "share_click", title, url, shareChannel: "linkedin" })} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-teal-300 hover:text-teal-800">
                <Share2 className="h-4 w-4" /> LinkedIn
            </a>
            <button type="button" onClick={copyLink} className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-800">
                <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy Link"}
            </button>
        </div>
    );
}
