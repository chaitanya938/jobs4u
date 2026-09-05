import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Terms", description: "Jobs4U terms of use.", path: "/terms" });

export default function TermsPage() {
    return (
        <div className="pb-16 pt-8 lg:pt-16">
            <div className="jobs4u-shell">
                <div className="mb-10">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="inline-block rounded-full bg-slate-100/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600 mb-6 ring-1 ring-slate-200">
                        Legal
                    </div>
                    <h1 className="jobs4u-heading text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl mb-8">Terms of Use</h1>

                    <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
                        <p>
                            Jobs4U provides content and links to external application websites. Please review our terms before using our platform to ensure a safe and responsible environment.
                        </p>

                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl mt-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Usage Guidelines</h2>
                            <ul className="list-disc pl-5 space-y-3">
                                <li><strong>Fair Use:</strong> Do not misuse the site, scrape content at harmful rates, or attempt to interfere with the public experience or our servers.</li>
                                <li><strong>Verification:</strong> Always verify information on the source website before proceeding with any application.</li>
                                <li><strong>Updates:</strong> Jobs4U may update these terms as the platform evolves and expands. By continuing to use the site, you agree to the latest terms.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
