"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, ShieldCheck, Users } from "lucide-react";
import { formatDate, getCompany, type Company, type Job, type ProgrammingQuestion } from "@/lib/site-data";

export function SectionHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
                {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black">{eyebrow}</p> : null}
                <h2 className="jobs4u-heading mt-2 text-2xl font-bold text-black sm:text-3xl">{title}</h2>
                {description ? <p className="mt-2 text-sm leading-7 text-black sm:text-base">{description}</p> : null}
            </div>
            {action ? <div>{action}</div> : null}
        </div>
    );
}

export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
    return (
        <div className="border border-black bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black">{label}</p>
            <p className="jobs4u-heading mt-3 text-2xl font-bold text-black">{value}</p>
            {note ? <p className="mt-2 text-sm text-black">{note}</p> : null}
        </div>
    );
}

export function CompanyCard({ company }: { company: Company }) {
    return (
        <Link href={`/hiring-process/${company.slug}`} className="border border-black bg-white jobs4u-focus group flex h-full flex-col rounded-3xl p-5 transition hover:-translate-y-1 hover:border-black">
            <div className="flex items-center gap-4 lg:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-white text-sm font-bold text-black">{company.logo}</div>
                <div className="flex-1 min-w-0">
                    <p className="jobs4u-heading text-lg font-bold text-black truncate">{company.name}</p>
                    <p className="text-sm text-black truncate">{company.sector}</p>
                </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-black break-words line-clamp-3">{company.description}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black">
                Explore hiring process <ArrowUpRight className="h-4 w-4" />
            </div>
        </Link>
    );
}

export function JobCard({ job, showReferralBanner }: { job: Job; showReferralBanner?: boolean }) {
    const company = getCompany(job.companySlug);
    return (
        <article className="border border-slate-200 bg-white group flex flex-col sm:flex-row rounded-2xl p-4 sm:p-5 transition hover:-translate-y-0.5 hover:shadow-md gap-4 sm:gap-6">
            {/* Left: Company logo */}
            <div className="shrink-0 flex items-start justify-center self-start">
                {(job.companyLogoUrl || company?.logoUrl) ? (
                    <img
                        src={job.companyLogoUrl || company?.logoUrl}
                        alt={`${company?.name ?? job.companySlug} logo`}
                        className="w-24 sm:w-32 h-auto max-h-24 object-contain rounded-lg bg-white"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                ) : (
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-xl font-bold text-slate-700 mt-1">
                        {company?.logo ?? job.companySlug.slice(0, 2).toUpperCase()}
                    </div>
                )}
            </div>

            {/* Right: All content */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Title row */}
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="jobs4u-heading text-base font-bold text-black leading-tight break-words flex-1 min-w-0">{job.title}</h3>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white" style={{ background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)" }}>{job.status}</span>

                    {showReferralBanner && (
                        <span className="w-full mt-1 xl:mt-0 xl:w-auto xl:ml-auto text-xs font-black text-green-900 bg-green-200 px-3 py-1.5 rounded-lg uppercase tracking-wider border border-green-400 shadow-sm text-center">
                            ✨ Referral Available ✨
                        </span>
                    )}
                </div>

                {/* Company name */}
                <p className="mt-0.5 text-sm font-medium text-slate-500 break-words">{company?.name ?? job.companySlug}</p>

                {/* Detail pills - horizontal */}
                <div className="mt-2 flex flex-wrap gap-1.5 text-xs text-slate-600">
                    <DetailRow icon={<MapPin className="h-3.5 w-3.5 shrink-0" />} label={job.location} />
                    <DetailRow icon={<Users className="h-3.5 w-3.5 shrink-0" />} label={job.experience} />
                    <DetailRow icon={<ShieldCheck className="h-3.5 w-3.5 shrink-0" />} label={job.jobType} />
                </div>

                {/* Skills */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.skills.slice(0, 5).map((skill) => (
                        <span key={skill} className="rounded-full bg-orange-50 border border-orange-200 px-2.5 py-0.5 text-xs font-medium text-orange-700 break-words max-w-full truncate">{skill}</span>
                    ))}
                </div>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600 break-words">{job.description}</p>

                {/* Bottom row */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-xs">
                    <Link href={`/jobs/${job.slug}`} className="jobs4u-focus shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-bold text-white transition hover:opacity-90" style={{ background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)" }}>View Job</Link>
                    <span className="text-slate-400">Posted <span className="text-red-500 font-semibold">{formatDate(job.postedAt)}</span></span>
                </div>
            </div>
        </article>
    );
}

function DetailRow({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 rounded-2xl border border-black bg-white px-3 py-2 max-w-full">
            <span className="text-black shrink-0">{icon}</span>
            <span className="truncate">{label}</span>
        </div>
    );
}

export function ContentCard({ title, summary, href, eyebrow }: { title: string; summary: string; href: string; eyebrow?: string }) {
    return (
        <Link href={href} className="border border-black bg-white jobs4u-focus group flex h-full flex-col rounded-3xl p-5 transition hover:-translate-y-1 hover:border-black">
            {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black">{eyebrow}</p> : null}
            <h3 className="jobs4u-heading mt-2 text-xl font-bold text-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-black">{summary}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-black">
                Open <ArrowUpRight className="h-4 w-4" />
            </div>
        </Link>
    );
}

export function QuestionCard({ question, href }: { question: ProgrammingQuestion; href: string }) {
    return (
        <Link href={href} className="border border-black bg-white jobs4u-focus group flex h-full flex-col rounded-3xl p-5 transition hover:-translate-y-1 hover:border-black">
            <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black">{question.category}</p>
                <span className="rounded-full border border-black bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">{question.difficulty}</span>
            </div>
            <h3 className="jobs4u-heading mt-3 text-xl font-bold text-black">{question.title}</h3>
            <p className="mt-3 text-sm leading-7 text-black">{question.question}</p>
        </Link>
    );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
    return (
        <div className="bg-white rounded-3xl px-6 py-12 text-center">
            <h3 className="jobs4u-heading text-2xl font-bold text-black">{title}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-black">{description}</p>
            {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
        </div>
    );
}
