import Link from "next/link";
import { revalidatePath } from "next/cache";
import { getInterviewConfig, saveInterviewConfig } from "@/lib/interview-store";
import { ShellContainer } from "@/components/site-shell";
import { EmptyState } from "@/components/cards";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
    title: "Admin - Interview & Questions",
    description: "Manage interview question collections.",
    path: "/admin/interview",
});

export default function AdminInterviewPage() {
    const config = getInterviewConfig();

    async function deleteAction(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        if (id) {
            const currentConfig = getInterviewConfig();
            const newConfig = currentConfig.filter(c => c.id !== id);
            saveInterviewConfig(newConfig);
            revalidatePath("/interview");
            revalidatePath("/admin/interview");
        }
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                        <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Manage Interview Questions</h1>
                    </div>
                    <Link
                        href="/admin/interview/new"
                        className="jobs4u-focus rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800"
                    >
                        Add Collection
                    </Link>
                </section>

                <section className="space-y-6">
                    {config.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {config.map((category) => (
                                <div key={category.id} className="relative group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-start gap-3">
                                    <h3 className="font-bold text-slate-900 text-lg line-clamp-1">{category.title}</h3>
                                    <p className="text-slate-500 text-sm line-clamp-2 min-h-[40px]">{category.description || "No description provided."}</p>
                                    <div className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                        {category.items.length} Questions
                                    </div>
                                    <div className="flex gap-2 w-full mt-2 pt-4 border-t border-slate-100">
                                        <Link href={`/admin/interview/${category.id}/edit`} className="rounded text-center flex-1 border border-blue-500 text-blue-500 px-3 py-1.5 text-sm font-semibold hover:bg-blue-50 transition">
                                            Edit
                                        </Link>
                                        <form action={deleteAction} className="flex-1 flex">
                                            <input type="hidden" name="id" value={category.id} />
                                            <button type="submit" className="w-full rounded text-center border border-red-500 text-red-500 px-3 py-1.5 text-sm font-semibold hover:bg-red-50 transition">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState title="No question collections" description="Create a new collection of interview questions to display." />
                    )}
                </section>
            </ShellContainer>
        </div>
    );
}
