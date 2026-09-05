import Link from "next/link";
import { revalidatePath } from "next/cache";
import { fetchActiveJobs, removeJobCategory } from "@/lib/jobs-store";
import { ShellContainer } from "@/components/site-shell";
import { JobCard, EmptyState, SectionHeading } from "@/components/cards";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
    title: "Admin - Experienced Jobs",
    description: "Manage experienced jobs.",
    path: "/admin/experienced-jobs",
});

export default async function AdminExperiencedJobsPage() {
    const jobs = (await fetchActiveJobs()).filter((job) =>
        job.categories.includes("Experienced")
    );

    async function deleteAction(formData: FormData) {
        "use server";
        const slug = formData.get("slug") as string;
        if (slug) {
            await removeJobCategory(slug, "Experienced");
            revalidatePath("/admin/experienced-jobs");
            revalidatePath("/experienced-jobs");
        }
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl ">Manage Experienced Jobs</h1>
                </section>

                <section className="space-y-6">
                    <SectionHeading
                        title="All experienced jobs"
                        action={<Link href="/admin/jobs/new" className="jobs4u-focus rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">Add New</Link>}
                    />

                    {jobs.length ? (
                        <div className="grid gap-3 grid-cols-1">
                            {jobs.map((job) => (
                                <div key={job.slug} className="relative group">
                                    <JobCard job={job} />
                                    <div className="absolute top-4 right-4 sm:top-5 sm:right-5 flex flex-col sm:flex-row shadow-sm sm:shadow-none bg-white p-2 sm:p-0 rounded-xl border border-slate-200 sm:border-transparent gap-2 items-end sm:items-center">
                                        <Link href={`/admin/jobs/${job.slug}/edit`} className="rounded border border-blue-500 text-blue-500 px-3 py-1 text-xs font-semibold hover:bg-blue-50 transition">Edit</Link>
                                        <form action={deleteAction}>
                                            <input type="hidden" name="slug" value={job.slug} />
                                            <button type="submit" className="rounded border border-red-500 text-red-500 px-3 py-1 text-xs font-semibold hover:bg-red-50 transition">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="No experienced jobs found" description="Publish verified experienced jobs from the admin dashboard to populate this section." />
                    )}
                </section>
            </ShellContainer>
        </div>
    );
}
