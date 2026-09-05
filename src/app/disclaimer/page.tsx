import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Disclaimer", description: "Jobs4U disclaimer.", path: "/disclaimer" });

export default function DisclaimerPage() {
    return (
        <div className="pb-16 pt-8 lg:pt-16">
            <div className="jobs4u-shell">
                <div className="mb-10">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="inline-block rounded-full bg-slate-100/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600 mb-6 ring-1 ring-slate-200">
                        Legal
                    </div>
                    <h1 className="jobs4u-heading text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl mb-8">Disclaimer</h1>

                    <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
                        <p>
                            Jobs4U publishes information for career guidance and links users to third-party websites for official applications.
                        </p>

                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl mt-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Important Note</h2>
                            <p className="mb-4">
                                Jobs4U does not guarantee hiring outcomes, interview results, or application approvals.
                            </p>
                            <p>
                                Always verify eligibility, deadlines, and source details directly on the official employer's website.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
