import Link from "next/link";
import ResumePagePreview from "@/app/resume/page";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
    title: "Admin - Resume Page",
    description: "Manage the Resume page content.",
    path: "/admin/resume",
});

export default async function AdminResumePage() {
    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-6">
                <section className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                        <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Manage Resume Page</h1>
                    </div>
                    <Link
                        href="/admin/resume/edit"
                        className="jobs4u-focus rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                        Edit Content
                    </Link>
                </section>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Live Preview
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden pointer-events-none relative shadow-sm">
                        {/* We pointer-events-none to prevent accidental clicks in the preview */}
                        <div className="opacity-90">
                            <ResumePagePreview />
                        </div>
                    </div>
                </div>
            </ShellContainer>
        </div>
    );
}
