import { notFound } from "next/navigation";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import { fetchJobBySlug } from "@/lib/jobs-store";
import { EditJobForm } from "./edit-job-form";

export const metadata = createPageMetadata({
    title: "Edit Job",
    description: "Edit an existing job.",
    path: "/admin/jobs/edit",
});

export default async function EditJobPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await fetchJobBySlug(slug);

    if (!job) {
        notFound();
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-8">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Edit Job</h1>
                    <p className="max-w-3xl text-base leading-8 text-slate-600">
                        Update the details for <strong>{job.title}</strong> below.
                    </p>
                </section>

                <EditJobForm job={job} />
            </ShellContainer>
        </div>
    );
}
