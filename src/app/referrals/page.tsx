import { AdSlotBottom, AdSlotTop } from "@/components/ad-slot";
import { JobCard } from "@/components/cards";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import { fetchActiveJobs } from "@/lib/jobs-store";
import { getReferralConfig } from "@/lib/referral-config";

export const metadata = createPageMetadata({
    title: "Referrals",
    description: "Browse referral opportunities on Jobs4U and boost your chances.",
    path: "/referrals",
});

function parseBold(text: string) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

export default async function ReferralsPage() {
    const allJobs = await fetchActiveJobs();
    const activeJobs = allJobs.filter((job) => !job.categories.includes("NoReferral"));
    const config = getReferralConfig();

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Premium Service</p>
                    <h1 className="jobs4u-heading max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Guaranteed Job Referrals</h1>
                </section>

                <AdSlotTop />

                <section className="mx-auto max-w-5xl space-y-8 text-base leading-8 text-slate-700">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
                        <p dangerouslySetInnerHTML={{ __html: parseBold(config.paragraph1) }} />
                        <p dangerouslySetInnerHTML={{ __html: parseBold(config.paragraph2) }} />

                        <div className="rounded-2xl border-2 border-green-400 bg-green-50 p-6 shadow-sm">
                            <h3 className="text-2xl font-black text-green-900 mb-3">Service Charge: ₹{config.price} per each referral</h3>
                            <p className="text-green-900 font-medium">
                                {config.noteText}
                            </p>

                            <div className="flex sm:justify-start justify-center pt-6">
                                <a
                                    href={`https://wa.me/${config.phoneNumber}?text=${encodeURIComponent(config.whatsappText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="jobs4u-focus inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90 whitespace-nowrap shadow-sm hover:shadow"
                                    style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.57-.187-.981-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                                    </svg>
                                    Message on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="mb-4 border-b-2 border-slate-100 pb-4">
                        <h2 className="jobs4u-heading text-2xl font-bold text-slate-950 sm:text-3xl">All Jobs with Available Referrals</h2>
                        <p className="mt-2 text-slate-600 font-medium">Referrals are available for all the jobs listed below across all categories (Fresher, Remote, Experienced).</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {activeJobs.map((job) => (
                            <JobCard key={job.slug} job={job} showReferralBanner={true} />
                        ))}
                    </div>
                </section>

                <AdSlotBottom />
            </ShellContainer>
        </div>
    );
}

