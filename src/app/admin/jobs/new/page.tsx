import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import { JobEntryForm } from "./job-entry-form";

export const metadata = createPageMetadata({
    title: "Add Job",
    description: "Add a new job manually in Jobs4U.",
    path: "/admin/jobs/new",
});

export default function NewJobPage() {
    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-8">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Add a job manually</h1>
                    <p className="max-w-3xl text-base leading-8 text-slate-600">
                        This is the form you will use to add your daily jobs. Select the right category tab first, then fill the fields and publish when the Supabase save step is connected.
                    </p>
                </section>

                <JobEntryForm />
            </ShellContainer>
        </div>
    );
}
