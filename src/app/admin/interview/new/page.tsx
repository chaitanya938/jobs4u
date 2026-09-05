import { revalidatePath } from "next/cache";
import { getInterviewConfig, saveInterviewConfig, type InterviewCategory } from "@/lib/interview-store";
import { ShellContainer } from "@/components/site-shell";
import { redirect } from "next/navigation";

export default function AdminInterviewNewPage() {
    async function saveCollection(formData: FormData) {
        "use server";

        const id = (formData.get("id") as string).trim().toLowerCase().replace(/[^a-z0-9]/g, "-");
        const title = formData.get("title") as string;
        const description = (formData.get("description") as string) || "";
        const itemsString = formData.get("items") as string;
        const items = itemsString.split("\n").map(p => p.trim()).filter(p => p.length > 0);

        if (!id || !title) return;

        const currentConfig = getInterviewConfig();
        if (currentConfig.some(c => c.id === id)) {
            // Can't create duplicate ID
            return;
        }

        const newCollection: InterviewCategory = {
            id,
            title,
            description,
            items,
        };

        currentConfig.push(newCollection);
        saveInterviewConfig(currentConfig);

        revalidatePath("/interview");
        revalidatePath("/admin/interview");
        redirect("/admin/interview");
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-8 max-w-2xl">
                <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Add Question Collection</h1>
                </section>

                <form action={saveCollection} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Collection ID</label>
                        <input name="id" className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" placeholder="e.g. c-questions" required />
                        <p className="text-xs text-slate-500">A unique identifier used internally (lowercase letters and dashes). E.g. "c-questions"</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Title</label>
                        <input name="title" className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" placeholder="e.g. C Programming Questions" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Description (Optional)</label>
                        <input name="description" className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" placeholder="A brief hint or note under the title." />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Questions (One per line)</label>
                        <textarea name="items" rows={10} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" placeholder="Enter questions here, one on each line..." required />
                        <p className="text-xs text-slate-500">Each separate line will automatically become a newly numbered question.</p>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <a href="/admin/interview" className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</a>
                        <button type="submit" className="rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">Save Collection</button>
                    </div>
                </form>
            </ShellContainer>
        </div>
    );
}
