import Link from "next/link";
import { revalidatePath } from "next/cache";
import { fetchActiveJobs, addJobCategory } from "@/lib/jobs-store";
import { ShellContainer } from "@/components/site-shell";
import { JobCard, EmptyState, SectionHeading } from "@/components/cards";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
    title: "Admin - Referrals",
    description: "Manage referral jobs.",
    path: "/admin/referrals",
});

export default async function AdminReferralsPage() {
    // Show all active jobs across all categories since referrals apply to all, unless excluded
    const allJobs = await fetchActiveJobs();
    const jobs = allJobs.filter((job) => !job.categories.includes("NoReferral"));

    async function deleteAction(formData: FormData) {
        "use server";
        const slug = formData.get("slug") as string;
        if (slug) {
            await addJobCategory(slug, "NoReferral");
            revalidatePath("/admin/referrals");
            revalidatePath("/referrals");
        }
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl ">Manage Referrals (All Jobs)</h1>
                </section>

                <section className="space-y-6">
                    <SectionHeading
                        title="All available jobs"
                        description="This list contains all active jobs. They all automatically appear in the Referrals tab."
                        action={
                            <div className="flex gap-2">
                                <Link href="/admin/referrals/edit" className="jobs4u-focus rounded-full bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-300">Edit Page Content</Link>
                                <Link href="/admin/jobs/new" className="jobs4u-focus rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">Add New Post</Link>
                            </div>
                        }
                    />

                    {jobs.length ? (
                        <div className="grid gap-3 grid-cols-1">
                            {jobs.map((job) => (
                                <div key={job.slug} className="relative group">
                                    <JobCard job={job} showReferralBanner={true} />
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
                        <EmptyState title="No referral jobs found" description="Publish verified jobs from the admin dashboard to populate this section." />
                    )}
                </section>
            </ShellContainer>
        </div>
    );
}
