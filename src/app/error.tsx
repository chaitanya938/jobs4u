"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className="jobs4u-shell flex min-h-[70vh] items-center py-16">
            <div className="jobs4u-card w-full rounded-[2rem] p-8 text-center sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">500</p>
                <h1 className="jobs4u-heading mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Something went wrong</h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">Jobs4U hit an unexpected error while loading the page. You can try again or continue to the latest jobs.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={reset} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Try Again</button>
                    <Link href="/fresher-jobs" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">View Fresher Jobs</Link>
                </div>
            </div>
        </div>
    );
}
