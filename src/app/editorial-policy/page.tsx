import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Editorial Policy", description: "Jobs4U editorial policy.", path: "/editorial-policy" });

export default function EditorialPolicyPage() {
    return (
        <div className="pb-16 pt-8 lg:pt-16">
            <div className="jobs4u-shell">
                <div className="mb-10">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Editorial Policy" }]} />
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="inline-block rounded-full bg-slate-100/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600 mb-6 ring-1 ring-slate-200">
                        Legal
                    </div>
                    <h1 className="jobs4u-heading text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl mb-8">Editorial Policy</h1>

                    <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
                        <p>
                            Jobs4U strictly prioritizes verified information, highly original writing, and transparent sourcing to ensure we deliver the highest quality content.
                        </p>

                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl mt-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">How we publish</h2>
                            <ul className="list-disc pl-5 space-y-3">
                                <li><strong>Content Standards:</strong> We only publish content that is genuinely useful, clearly labeled (such as opinions versus facts), and strictly original.</li>
                                <li><strong>Sourcing:</strong> Where external information is utilized to write an article or job posting, we link back to the source and avoid claiming facts that are not thoroughly verified.</li>
                                <li><strong>Integrity:</strong> We maintain complete editorial independence to guarantee the authenticity of our platform.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
