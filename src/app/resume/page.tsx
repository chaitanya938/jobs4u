import { AdSlotBottom, AdSlotTop } from "@/components/ad-slot";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import { getResumeConfig } from "@/lib/resume-config";

export const metadata = createPageMetadata({
    title: "ATS Resume Service",
    description: "Get your resume optimized for ATS starting at just ₹29. Contact us for custom JD-tailored resumes.",
    path: "/resume",
});

export default async function ResumePage() {
    const config = await getResumeConfig();

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-10">
                <section className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">Premium Service</p>
                    <h1 className="jobs4u-heading max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{config.heading}</h1>
                </section>

                <AdSlotTop />

                <section className="mx-auto max-w-5xl space-y-8 text-base leading-8 text-slate-700">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm space-y-6">
                        <p>
                            <strong className="text-black text-lg">Your resume and skills are incredibly important.</strong> For every job, thousands of candidates apply. Companies simply cannot read that many resumes manually. Instead, they filter resumes using an <strong>ATS (Applicant Tracking System)</strong>. They match the Job Description (JD) against your resume to generate an ATS score, and only the candidates with the highest ATS scores get selected for interviews.
                        </p>
                        <p>
                            That means <strong>for every job you apply to, you must adjust your resume according to the JD.</strong> If you are applying endlessly but not getting any calls, your resume is likely being rejected by the ATS—even if you are a highly qualified candidate! In this heavy competition, a generic resume is a guaranteed rejection.
                        </p>

                        <div className="rounded-2xl bg-orange-50 p-6 border border-orange-100">
                            <h3 className="text-xl font-bold text-orange-800 mb-3">{config.serviceName}</h3>
                            <p className="text-orange-900 mb-4">
                                Send us the exact Job Description (JD) of the role you are applying, along with your old resume. <strong>We will completely modify and tailor your resume specifically for that JD.</strong>
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-green-700 font-medium mb-6">
                                {(config.points || [
                                    "Your resume will be better than 95% of applicants.",
                                    "Heavily boosts your chances of passing the ATS screening.",
                                    "Stop getting automated rejection emails and get more chances to be shortlisted.",
                                    "We will charge 29 rupees. If you need resume optimisation, click WhatsApp to message me."
                                ]).map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-orange-200 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Service Charge</p>
                                    <p className="text-3xl font-bold text-slate-900">₹{config.price} <span className="text-sm font-normal text-slate-500">per resume</span></p>
                                </div>
                                <a
                                    href={`https://wa.me/918247660084?text=${encodeURIComponent(config.whatsappText)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="jobs4u-focus inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition hover:opacity-90 whitespace-nowrap"
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

                <AdSlotBottom />
            </ShellContainer>
        </div>
    );
}

