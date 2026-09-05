import Link from "next/link";

export default function NotFound() {
    return (
        <div className="jobs4u-shell flex min-h-[70vh] items-center py-16">
            <div className="jobs4u-card w-full rounded-[2rem] p-8 text-center sm:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">404</p>
                <h1 className="jobs4u-heading mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Page not found</h1>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">The page you requested does not exist, may have moved, or may have expired. Use the links below to continue browsing Jobs4U.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link href="/" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">Go Home</Link>
                    <Link href="/fresher-jobs" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">View Fresher Jobs</Link>
                </div>
            </div>
        </div>
    );
}
