import Link from "next/link";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
    title: "Admin",
    description: "Admin area for Jobs4U.",
    path: "/admin",
});

export default function AdminPage() {
    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer>
                <section className="jobs4u-card rounded-[2rem] p-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Jobs4U Admin</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">Use this protected area to manage jobs and content.</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link href="/admin/jobs/new" className="rounded-full bg-teal-700 px-5 py-3 text-sm font-semibold text-white">Add Job</Link>
                        <Link href="/fresher-jobs" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">View Site</Link>
                    </div>
                </section>
            </ShellContainer>
        </div>
    );
}
