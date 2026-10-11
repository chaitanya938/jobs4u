"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, Clock3, MapPin } from "lucide-react";
import { formatDate, getCompany, type Company, type Job, type ProgrammingQuestion } from "@/lib/site-data";

export function SectionHeading({ eyebrow, title, description, action, level = 2 }: { eyebrow?: string; title: React.ReactNode; description?: string; action?: React.ReactNode; level?: 1 | 2 }) {
    const HeadingTag = level === 1 ? "h1" : "h2";

    return (
        <div className="section-heading-layout">
            <div className="section-heading-copy">
                {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
                <HeadingTag className="jobs4u-heading section-heading-title">{title}</HeadingTag>
                {description ? <p className="section-heading-description">{description}</p> : null}
            </div>
            {action ? <div className="section-heading-action">{action}</div> : null}
        </div>
    );
}

export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
    return (
        <div className="content-card p-5">
            <p className="section-eyebrow">{label}</p>
            <p className="jobs4u-heading mt-3 text-2xl font-bold text-slate-900">{value}</p>
            {note ? <p className="mt-2 text-sm text-slate-600">{note}</p> : null}
        </div>
    );
}

export function CompanyCard({ company }: { company: Company }) {
    return (
        <Link href={`/hiring-process/${company.slug}`} className="content-card jobs4u-focus group flex h-full flex-col p-5 transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center gap-4 lg:gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-violet-700">{company.logo}</div>
                <div className="flex-1 min-w-0">
                    <p className="jobs4u-heading text-lg font-bold text-slate-900 truncate">{company.name}</p>
                    <p className="text-sm text-slate-500 truncate">{company.sector}</p>
                </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600 break-words line-clamp-3">{company.description}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
                Explore hiring process <ArrowUpRight className="h-4 w-4" />
            </div>
        </Link>
    );
}

export function JobCard({ job, showReferralBanner }: { job: Job; showReferralBanner?: boolean }) {
    const company = getCompany(job.companySlug);
    const companyName = job.companyName ?? company?.name ?? job.companySlug;
    const companyInitials = company?.logo ?? companyName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

    return (
        <article className="job-card group">
            <div className="job-card-company">
                <div className="job-company-logo">
                    <span>{companyInitials}</span>
                    {(job.companyLogoUrl || company?.logoUrl) ? (
                        <Image
                            src={job.companyLogoUrl || company?.logoUrl || ""}
                            alt={`${companyName} logo`}
                            fill
                            sizes="54px"
                            unoptimized
                            onError={(event) => { event.currentTarget.style.display = "none"; }}
                        />
                    ) : null}
                </div>
                <div className="job-company-copy">
                    <span className="job-company-name">{companyName}</span>
                    <h3 className="jobs4u-heading job-card-title">{job.title}</h3>
                </div>
                <span className={`job-status${job.status === "ACTIVE" ? " is-active" : " is-expired"}`}>
                    {job.status === "ACTIVE" ? "Active Hiring" : "Expired"}
                </span>
            </div>

            <div className="job-card-content">
                {showReferralBanner ? <span className="job-referral-label">Referral available</span> : null}
                <div className="job-details">
                    <DetailRow icon={<MapPin aria-hidden="true" />} label={job.location} />
                    <DetailRow icon={<Clock3 aria-hidden="true" />} label={job.experience} />
                    <DetailRow icon={<BriefcaseBusiness aria-hidden="true" />} label={job.jobType} />
                </div>
                <div className="job-skills">
                    {job.skills.flatMap((skill) => skill.split(",").map((item) => item.trim()).filter(Boolean)).slice(0, 5).map((skill, index) => (
                        <span key={`${skill}-${index}`} className="job-skill">{skill}</span>
                    ))}
                </div>
                {job.description ? <p className="job-description">{job.description}</p> : null}
                <div className="job-card-footer">
                    <p className="job-posted">Posted <time dateTime={job.postedAt}>{formatDate(job.postedAt)}</time></p>
                    <Link href={`/jobs/${job.slug}`} className="jobs4u-focus job-view-link">
                        View Job <ArrowRight aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

function DetailRow({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="job-detail">
            <span className="job-detail-icon">{icon}</span>
            <span className="job-detail-label" title={label}>{label}</span>
        </div>
    );
}

export function ContentCard({ title, summary, href, eyebrow }: { title: string; summary: string; href: string; eyebrow?: string }) {
    return (
        <Link href={href} className="content-card jobs4u-focus group flex h-full flex-col p-5 transition hover:-translate-y-1 hover:shadow-md">
            {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
            <h3 className="jobs4u-heading mt-2 text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{summary}</p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700">
                Open <ArrowUpRight className="h-4 w-4" />
            </div>
        </Link>
    );
}

export function QuestionCard({ question, href }: { question: ProgrammingQuestion; href: string }) {
    return (
        <Link href={href} className="content-card jobs4u-focus group flex h-full flex-col p-5 transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between gap-3">
                <p className="section-eyebrow">{question.category}</p>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600">{question.difficulty}</span>
            </div>
            <h3 className="jobs4u-heading mt-3 text-xl font-bold text-slate-900">{question.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{question.question}</p>
        </Link>
    );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
    return (
        <div className="content-card px-6 py-12 text-center">
            <h3 className="jobs4u-heading text-2xl font-bold text-slate-900">{title}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
            {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
        </div>
    );
}
