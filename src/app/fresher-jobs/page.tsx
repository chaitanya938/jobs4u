import Link from "next/link";
import { AdSlotBottom, AdSlotTop } from "@/components/ad-slot";
import { EmptyState, JobCard, SectionHeading } from "@/components/cards";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import { fetchActiveJobs } from "@/lib/jobs-store";

export const metadata = createPageMetadata({
    title: "Fresher Jobs",
    description: "Browse fresher and entry-level opportunities on Jobs4U.",
    path: "/fresher-jobs",
});

export default async function FresherJobsPage() {
    const jobs = (await fetchActiveJobs()).filter((job) =>
        job.categories.includes("Fresher")
    );

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Fresher Jobs</p>
                    <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl ">Entry-level roles for students and fresh graduates</h1>
                    <p className="max-w-3xl text-base leading-8 text-slate-600">The list is grouped by recency so the newest opportunities stay visible first.</p>
                </section>

                <AdSlotTop />

                <section className="space-y-6">
                    <SectionHeading
                        eyebrow="Jobs"
                        title="All fresher jobs"
                    />
                    {jobs.length ? (
                        <div className="grid gap-3 grid-cols-1">
                            {jobs.map((job) => (
                                <JobCard key={job.slug} job={job} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="No fresher jobs found" description="Publish verified fresher jobs from the admin dashboard to populate this section." />
                    )}
                </section>

                <AdSlotBottom />
            </ShellContainer>
        </div>
    );
}

