import { revalidatePath } from "next/cache";
import { getReferralConfig, updateReferralConfig } from "@/lib/referral-config";
import { ShellContainer } from "@/components/site-shell";
import { redirect } from "next/navigation";

export default function AdminReferralEditPage() {
    const config = getReferralConfig();

    async function saveConfig(formData: FormData) {
        "use server";

        const paragraph1 = formData.get("paragraph1") as string;
        const paragraph2 = formData.get("paragraph2") as string;
        const price = formData.get("price") as string;
        const phoneNumber = formData.get("phoneNumber") as string;
        const whatsappText = formData.get("whatsappText") as string;
        const noteText = formData.get("noteText") as string;

        updateReferralConfig({
            paragraph1,
            paragraph2,
            price,
            phoneNumber,
            whatsappText,
            noteText,
        });

        revalidatePath("/referrals");
        revalidatePath("/admin/referrals");
        redirect("/admin/referrals");
    }

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-8 max-w-2xl">
                <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Admin</p>
                    <h1 className="jobs4u-heading text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Edit Referrals Page Content</h1>
                </section>

                <form action={saveConfig} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Explanation Paragraph 1</label>
                        <p className="text-xs text-slate-500">Wrap text in **asterisks** to make it bold.</p>
                        <textarea name="paragraph1" defaultValue={config.paragraph1} rows={4} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Explanation Paragraph 2</label>
                        <p className="text-xs text-slate-500">Wrap text in **asterisks** to make it bold.</p>
                        <textarea name="paragraph2" defaultValue={config.paragraph2} rows={4} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Price per referral (₹)</label>
                        <input name="price" defaultValue={config.price} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Note under Price</label>
                        <textarea name="noteText" defaultValue={config.noteText} rows={3} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">WhatsApp Phone Number</label>
                        <input name="phoneNumber" defaultValue={config.phoneNumber} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                        <p className="text-xs text-slate-500">Include country code without '+', e.g. 918247660084</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Default WhatsApp Text</label>
                        <textarea name="whatsappText" defaultValue={config.whatsappText} rows={2} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm focus:border-teal-500 focus:outline-none" required />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                        <a href="/admin/referrals" className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</a>
                        <button type="submit" className="rounded-full bg-teal-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800">Save Changes</button>
                    </div>
                </form>
            </ShellContainer>
        </div>
    );
}
