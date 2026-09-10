import { revalidatePath } from "next/cache";
import { getResumeConfig, updateResumeConfig } from "@/lib/resume-config";
import { ShellContainer } from "@/components/site-shell";
import { redirect } from "next/navigation";

export default async function AdminResumeEditPage() {
    const config = await getResumeConfig();

    async function saveConfig(formData: FormData) {
        "use server";

        const heading = formData.get("heading") as string;
        const serviceName = formData.get("serviceName") as string;
        const price = formData.get("price") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const whatsappText = formData.get("whatsappText") as string;
        const pointsString = formData.get("points") as string;
        const points = pointsString.split("\n").map(p => p.trim()).filter(p => p.length > 0);

        await updateResumeConfig({
            heading,
            serviceName,
            price,
            phoneNumber,
            whatsappText,
            points,
        });

        revalidatePath("/resume");
        revalidatePath("/admin/resume");
        redirect("/admin/resume");
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-8 max-w-2xl">
                <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Edit Resume Page Content</h1>
                </section>

                <form action={saveConfig} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Main Heading</label>
                        <input name="heading" defaultValue={config.heading} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Service Name</label>
                        <input name="serviceName" defaultValue={config.serviceName} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Price (₹)</label>
                        <input name="price" defaultValue={config.price} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">WhatsApp Phone Number</label>
                        <input name="phoneNumber" defaultValue={config.phoneNumber} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                        <p className="text-xs text-slate-500">Include country code without '+', e.g. 918247660084</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Default WhatsApp Text</label>
                        <textarea name="whatsappText" defaultValue={config.whatsappText} rows={3} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Service Highlights (One point per line)</label>
                        <textarea name="points" defaultValue={config.points?.join("\n")} rows={5} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <a href="/admin/resume" className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</a>
                        <button type="submit" className="rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">Save Changes</button>
                    </div>
                </form>
            </ShellContainer>
        </div>
    );
}
