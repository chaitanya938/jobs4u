import { ArrowRight, CalendarDays, Gift, MessageCircle, UsersRound } from "lucide-react";
import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";

const premiumUrl = "https://topmate.io/jobs4uu";
const whatsappChannelUrl = "https://whatsapp.com/channel/0029VbDoIia2f3EOFpo1Zm3t";
const referralTracks = [
    "Software Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Java Development",
    "Python Development",
    "Android Development",
    "Data Analytics",
    "Data Science",
    "DevOps & Cloud",
    "QA / Testing",
    "Business Development",
    "AI Developer",
    "AI Engineer",
    "AI Researcher",
    "Cybersecurity",
    "Non-IT Jobs",
    "Internships",
];

export const metadata = createPageMetadata({
    title: "Daily Job Referrals",
    description: "Get 40+ daily job referrals and internships for freshers and candidates with 0-2 years of experience.",
    path: "/referrals",
});

export default function ReferralsPage() {
    return (
        <div className="bg-[#f8f9fc] py-8 sm:py-12">
            <ShellContainer>
                <section className="mx-auto max-w-4xl rounded-xl border border-violet-100 bg-white p-5 shadow-sm sm:p-9">
                    <p className="text-xs font-bold uppercase text-violet-700">Jobs4U Referral Membership</p>
                    <h1 className="jobs4u-heading mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                        Get daily job referrals
                    </h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                        Get 40+ daily job referrals focused on freshers and candidates with 0-2 years of experience. Find software, testing, AI, data, cybersecurity, business development, non-IT roles, and internships.
                    </p>

                    <div className="mt-7 grid gap-6 border-y border-slate-100 py-6 sm:grid-cols-3 sm:gap-5">
                        <div className="flex items-start gap-3">
                            <UsersRound className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" aria-hidden="true" />
                            <p className="text-sm leading-6 text-slate-700"><strong className="text-slate-900">40+ referrals daily</strong><br />Posted in the premium referrals group every day.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" aria-hidden="true" />
                            <p className="text-sm leading-6 text-slate-700"><strong className="text-slate-900">2 months access</strong><br />Access for ₹999.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <Gift className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" aria-hidden="true" />
                            <p className="text-sm leading-6 text-slate-700"><strong className="text-slate-900">2 extra months free</strong><br />If you don’t get a job during your first two months.</p>
                        </div>
                    </div>

                    <div className="mt-7">
                        <h2 className="jobs4u-heading text-lg font-bold text-slate-900">Roles covered</h2>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {referralTracks.map((track) => (
                                <span key={track} className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-800">
                                    {track}
                                </span>
                            ))}
                        </div>
                        <p className="mt-3 text-sm leading-6 text-slate-600">
                            Our primary focus is helping freshers secure jobs by providing relevant referral opportunities. We also support candidates with up to 2 years of experience by connecting them with suitable job referrals.
                        </p>
                    </div>

                    <div className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">Membership price</p>
                            <p className="jobs4u-heading mt-1 text-3xl font-bold text-slate-900">₹999 <span className="text-base font-medium text-slate-500">/ 2 months</span></p>
                        </div>
                        <a
                            href={premiumUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="jobs4u-focus inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-violet-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-800 hover:shadow-lg"
                            style={{ color: "#fff" }}
                        >
                            <Gift className="h-4 w-4" aria-hidden="true" />
                            Check Premium
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>

                    <div className="mt-6 flex flex-col gap-3 rounded-lg border border-emerald-100 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Want free updates?</p>
                            <p className="mt-1 text-sm leading-6 text-slate-600">Join our WhatsApp channel for job alerts and career updates.</p>
                        </div>
                        <a
                            href={whatsappChannelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="jobs4u-focus inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-200 transition hover:bg-[#1ebe57] hover:shadow-md"
                            style={{ color: "#fff" }}
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            Join WhatsApp Channel
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                    </div>

                    <p className="mt-5 text-xs leading-5 text-slate-500">
                        Referrals do not guarantee a job; hiring decisions are made by employers. Always verify role details before applying.
                    </p>
                </section>
            </ShellContainer>
        </div>
    );
}
