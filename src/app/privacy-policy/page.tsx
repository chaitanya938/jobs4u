import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Privacy Policy", description: "Jobs4U privacy policy.", path: "/privacy-policy" });

export default function PrivacyPolicyPage() {
    return (
        <div className="pb-16 pt-8 lg:pt-16">
            <div className="jobs4u-shell">
                <div className="mb-10">
                    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="inline-block rounded-full bg-slate-100/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600 mb-6 ring-1 ring-slate-200">
                        Legal
                    </div>
                    <h1 className="jobs4u-heading text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl mb-8">Privacy Policy</h1>

                    <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
                        <p>
                            At Jobs4U, we value your privacy. We want to be transparent about what data we collect, how our analytics work, and how you can browse the site safely without an account.
                        </p>

                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl mt-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Summary of Policy</h2>
                            <ul className="list-disc pl-5 space-y-3">
                                <li><strong>No Account Required:</strong> Jobs4U does not require user accounts for browsing job content. You can access our resources freely and anonymously.</li>
                                <li><strong>Analytics and Usage Data:</strong> We may collect standard analytics, UTM source data, and event data to improve the site and better understand which content is useful to our visitors. All collected data is anonymized and strictly used for optimizing user experience.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
