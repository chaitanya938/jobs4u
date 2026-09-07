import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlotBeforeRelated, AdSlotBottom, AdSlotInContent, AdSlotTop } from "@/components/ad-slot";
import { ApplyButton } from "@/components/apply-button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentCard, JobCard, SectionHeading } from "@/components/cards";
import { ShareButtons } from "@/components/share-buttons";
import { ShellContainer } from "@/components/site-shell";
import { ViewTracker } from "@/components/view-tracker";
import { createPageMetadata } from "@/lib/seo";
import { formatDate, getCompany, programmingQuestions, resumeResources } from "@/lib/site-data";
import { fetchJobBySlug, fetchActiveJobs } from "@/lib/jobs-store";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const job = await fetchJobBySlug(slug);

    if (!job) {
        return createPageMetadata({
            title: "Job Not Found",
            description: "The requested job is not available on Jobs4U.",
            path: "/jobs",
        });
    }

    return createPageMetadata({
        title: `${job.title} at ${getCompany(job.companySlug)?.name ?? job.companySlug}`,
        description: job.description,
        path: `/jobs/${job.slug}`,
    });
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await fetchJobBySlug(slug);

    if (!job) {
        notFound();
    }

    const company = getCompany(job.companySlug);
    const status = job.status;
    const latestJobs = await fetchActiveJobs();
    const latestQuestions = programmingQuestions.slice(0, 3);
    const latestResumeResources = resumeResources.slice(0, 3);
    const isExpired = status === "EXPIRED";
    const canonicalUrl = `https://jobs4uu.in/jobs/${job.slug}`;

    const schema = isExpired
        ? null
        : {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: job.title,
            description: job.description,
            datePosted: job.postedAt,
            employmentType: job.jobType,
            hiringOrganization: {
                "@type": "Organization",
                name: company?.name ?? job.companySlug,
                sameAs: company?.website,
            },
            jobLocation: {
                "@type": "Place",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: job.location,
                    addressCountry: "IN",
                },
            },
            applicantLocationRequirements: {
                "@type": "Country",
                name: "IN",
            },
        };

    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <ShellContainer className="space-y-8">
                <ViewTracker type="job_view" title={job.title} url={canonicalUrl} company={company?.name} jobId={job.slug} />
                {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> : null}

                <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Fresher Jobs", href: "/fresher-jobs" }, { label: job.title }]} />

                <AdSlotTop />

                <section className="py-6 border-b border-black">
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="shrink-0 flex items-start justify-start self-start">
                            {(job.companyLogoUrl || company?.logoUrl) ? (
                                <img
                                    src={job.companyLogoUrl || company?.logoUrl}
                                    alt={`${company?.name ?? job.companySlug} logo`}
                                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
                                />
                            ) : (
                                <div className="flex w-24 h-24 sm:w-32 sm:h-32 items-center justify-center rounded-2xl border-2 border-black bg-white text-3xl font-bold text-black shadow-sm">
                                    {company?.logo ?? job.companySlug.slice(0, 2).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">{company?.name ?? job.companySlug}</p>
                            <h1 className="jobs4u-heading mt-2 text-4xl font-bold text-black sm:text-5xl break-words">{job.title}</h1>
                            <p className="mt-4 text-base leading-8 text-black break-words">{job.description}</p>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-black">
                        <InfoChip label="Location" value={job.location} />
                        <InfoChip label="Experience" value={job.experience} />
                        <InfoChip label="Salary" value={job.salary} />
                        <InfoChip label="Job Type" value={job.jobType} />
                        <InfoChip label="Work Mode" value={job.workMode} />
                        <InfoChip label="Posted" value={formatDate(job.postedAt)} />
                    </div>
                </section>

                {isExpired ? (
                    <section className="jobs4u-card rounded-[2rem] p-6 sm:p-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-700">Expired Job</p>
                        <h2 className="jobs4u-heading mt-2 text-2xl font-semibold text-slate-950">This job opportunity has expired.</h2>
                        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                            The URL stays available so traffic from Instagram, Google and bookmarks does not break. Use the links below to continue browsing current content.
                        </p>
                    </section>
                ) : null}

                <AdSlotInContent />

                {!isExpired ? (
                    <section className="grid gap-8 lg:grid-cols-[1.35fr,0.65fr]">
                        <div className="space-y-6 min-w-0">
                            <ContentBlock title="Responsibilities" items={job.responsibilities} />
                            <AdSlotInContent />
                            <ContentBlock title="Requirements" items={job.requirements} />
                            <AdSlotInContent />
                            <ContentBlock title="Skills" items={job.skills} pills />
                            <AdSlotInContent />
                            <ContentBlock title="Eligibility" items={job.eligibility} />
                            <section className="py-6 border-b border-black">
                                <h2 className="text-2xl font-bold text-black mb-4">How to Apply</h2>
                                <div className="mt-6 flex flex-col gap-6">
                                    <div>
                                        <ApplyButton href={job.applicationUrl} title={job.title} company={company?.name ?? job.companySlug} jobId={job.slug} />
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                            <span className="text-slate-800 font-semibold">Need referral for this job click 👉</span>
                                            <Link href="/referrals" className="jobs4u-focus inline-flex w-fit items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition hover:opacity-90 shadow-sm hover:scale-105" style={{ background: "linear-gradient(135deg, #fdba74 0%, #f9a8d4 100%)", color: "#0f172a" }}>
                                                Referrals
                                            </Link>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                            <span className="text-slate-800 font-semibold">Need resume for this job click 👉</span>
                                            <Link href="/resume" className="jobs4u-focus inline-flex w-fit items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition hover:opacity-90 shadow-sm hover:scale-105" style={{ background: "linear-gradient(135deg, #fdba74 0%, #f9a8d4 100%)", color: "#0f172a" }}>
                                                Resume Prep
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start min-w-0">
                            <AdSlotInContent />
                        </aside>
                    </section>
                ) : (
                    <section className="space-y-6 min-w-0">
                        <SectionHeading eyebrow="Continue browsing" title="Latest Jobs and related content" />
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {latestJobs.filter((item) => item.slug !== job.slug).slice(0, 3).map((item) => (
                                <JobCard key={item.slug} job={item} />
                            ))}
                        </div>
                    </section>
                )}

                <AdSlotBeforeRelated />

                <AdSlotInContent />

                <AdSlotBottom />
            </ShellContainer>
        </div>
    );
}

function InfoChip({ label, value }: { label: string; value: string }) {
    return (
        <div className="border border-black bg-white px-4 py-2 min-w-0 max-w-full">
            <span className="text-xs uppercase tracking-[0.25em] text-black">{label}</span>
            <p className="mt-1 text-sm font-medium text-black truncate">{value}</p>
        </div>
    );
}

function ContentBlock({ title, items, pills = false }: { title: string; items: string[]; pills?: boolean }) {
    return (
        <section className="py-6 border-b border-black min-w-0">
            <h2 className="text-2xl font-bold text-black mb-4">{title}</h2>
            {pills ? (
                <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                        <span key={item} className="border border-black px-3 py-1 text-sm break-all max-w-full">
                            {item}
                        </span>
                    ))}
                </div>
            ) : (
                <ul className="grid gap-2 text-base leading-7 min-w-0">
                    {items.map((item) => (
                        <li key={item} className="break-all max-w-full">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

function EmptyFallback() {
    return (
        <div className="jobs4u-card rounded-3xl px-6 py-12 text-center text-sm text-slate-600">
            No related jobs are available right now.
        </div>
    );
}
