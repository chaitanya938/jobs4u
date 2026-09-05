import { revalidatePath } from "next/cache";
import { getInterviewConfig, saveInterviewConfig } from "@/lib/interview-store";
import { ShellContainer } from "@/components/site-shell";
import { redirect, notFound } from "next/navigation";

export default async function AdminInterviewEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const currentConfig = getInterviewConfig();
    const collection = currentConfig.find((c) => c.id === id);

    if (!collection) {
        notFound();
    }

    async function saveCollection(formData: FormData) {
        "use server";

        const title = formData.get("title") as string;
        const description = (formData.get("description") as string) || "";
        const itemsString = formData.get("items") as string;
        const items = itemsString.split("\n").map(p => p.trim()).filter(p => p.length > 0);

        if (!title) return;

        const config = getInterviewConfig();
        const index = config.findIndex((c) => c.id === id);
        if (index > -1) {
            config[index] = {
                id,
                title,
                description,
                items,
            };
            saveInterviewConfig(config);
        }

        revalidatePath("/interview");
        revalidatePath("/admin/interview");
        redirect("/admin/interview");
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-8 max-w-2xl">
                <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Edit Question Collection</h1>
                </section>

                <form action={saveCollection} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Collection ID</label>
                        <input value={collection.id} disabled className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-500 cursor-not-allowed" />
                        <p className="text-xs text-slate-500">ID cannot be changed after creation.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Title</label>
                        <input name="title" defaultValue={collection.title} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" placeholder="e.g. C Programming Questions" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Description (Optional)</label>
                        <input name="description" defaultValue={collection.description} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" placeholder="A brief hint or note under the title." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Questions (One per line)</label>
                        <textarea name="items" defaultValue={collection.items.join("\n")} rows={15} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none leading-relaxed" placeholder="Enter questions here, one on each line..." required />
                        <p className="text-xs text-slate-500">Each separate line will automatically become a newly numbered question.</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <a href="/admin/interview" className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</a>
                        <button type="submit" className="rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">Save Changes</button>
                    </div>
                </form>
            </ShellContainer>
        </div>
    );
}
