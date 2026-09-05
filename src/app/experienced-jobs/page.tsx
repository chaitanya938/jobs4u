import { AdSlotBottom, AdSlotTop } from "@/components/ad-slot";
import { EmptyState, JobCard, SectionHeading } from "@/components/cards";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import { fetchActiveJobs } from "@/lib/jobs-store";

export const metadata = createPageMetadata({
    title: "Experienced Jobs",
    description: "Browse experienced opportunities on Jobs4U.",
    path: "/experienced-jobs",
});

export default async function ExperiencedJobsPage() {
    const jobs = (await fetchActiveJobs()).filter((job) => job.categories.includes("Experienced"));

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Experienced Jobs</p>
                    <h1 className="jobs4u-heading max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Roles for experienced professionals</h1>
                    <p className="max-w-3xl text-base leading-8 text-slate-600">Search by experience band, company, location and skills once the live database is connected.</p>
                </section>

                <AdSlotTop />

                <section className="space-y-6">
                    <SectionHeading eyebrow="Experienced Opportunities" title="Latest roles" description="Use this page for 1-2, 2-3, 3-5 and 5+ year opportunities." />
                    {jobs.length ? (
                        <div className="grid gap-3 grid-cols-1">
                            {jobs.map((job) => <JobCard key={job.slug} job={job} />)}
                        </div>
                    ) : (
                        <EmptyState title="No experienced jobs found" description="Publish verified roles from the admin dashboard to populate this page." />
                    )}
                </section>

                <AdSlotBottom />
            </ShellContainer>
        </div>
    );
}

