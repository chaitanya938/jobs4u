import { AdSlotBottom, AdSlotTop } from "@/components/ad-slot";
import { EmptyState, JobCard, SectionHeading } from "@/components/cards";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import { fetchActiveJobs } from "@/lib/jobs-store";

export const metadata = createPageMetadata({
    title: "Remote Jobs",
    description: "Browse remote and work-from-home roles on Jobs4U.",
    path: "/remote-jobs",
});

export default async function RemoteJobsPage() {
    const jobs = (await fetchActiveJobs()).filter((job) => job.categories.includes("Remote"));

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Remote Jobs</p>
                    <h1 className="jobs4u-heading max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Work-from-home and distributed roles</h1>
                    <p className="max-w-3xl text-base leading-8 text-slate-600">Filter by fresher, experienced, internship or technology when data is connected to the admin panel.</p>
                </section>

                <AdSlotTop />

                <section className="space-y-6">
                    <SectionHeading eyebrow="Remote Opportunities" title="Latest remote jobs" description="Only active remote jobs are shown here." />
                    {jobs.length ? (
                        <div className="grid gap-3 grid-cols-1">
                            {jobs.map((job) => <JobCard key={job.slug} job={job} />)}
                        </div>
                    ) : (
                        <EmptyState title="No remote jobs found" description="Publish verified remote opportunities to surface them here." />
                    )}
                </section>

                <AdSlotBottom />
            </ShellContainer>
        </div>
    );
}

