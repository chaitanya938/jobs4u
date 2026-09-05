import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlotBottom, AdSlotInContent, AdSlotTop } from "@/components/ad-slot";
import { ArticlePage, ArticleSection, PillCloud } from "@/components/article-page";
import { ContentCard } from "@/components/cards";
import { TrackedExternalLink } from "@/components/tracked-link";
import { ViewTracker } from "@/components/view-tracker";
import { createPageMetadata } from "@/lib/seo";
import { getCompany, interviewExperiences, referralOpportunities, resumeResources } from "@/lib/site-data";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const item = referralOpportunities.find((referral) => referral.slug === params.slug);

    if (!item) {
        return createPageMetadata({ title: "Referral Not Found", description: "The requested referral is not available.", path: "/referrals" });
    }

    const company = getCompany(item.companySlug);

    return createPageMetadata({ title: `${item.role} referral at ${company?.name ?? item.companySlug}`, description: item.referralInfo, path: `/referrals/${item.slug}` });
}

export default function ReferralDetailPage({ params }: { params: { slug: string } }) {
    const item = referralOpportunities.find((referral) => referral.slug === params.slug);
    if (!item) notFound();

    const company = getCompany(item.companySlug);
    const canonicalUrl = `https://jobs4u.in/referrals/${item.slug}`;

    return (
        <ArticlePage crumbs={[{ label: "Home", href: "/" }, { label: "Referrals", href: "/referrals" }, { label: item.role }]} eyebrow="Referral" title={`${item.role} at ${company?.name ?? item.companySlug}`} summary={item.referralInfo} meta={<ViewTracker type="referral_view" title={item.role} url={canonicalUrl} company={company?.name} />}>
            <AdSlotTop />
            <ArticleSection title="Referral details">
                <PillCloud items={item.skills} />
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Experience:</strong> {item.experience}</p>
                <p><strong>Eligibility:</strong> {item.eligibility}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p>Jobs4U only publishes the referral details that are known. It does not claim a successful referral or application outcome.</p>
            </ArticleSection>

            <AdSlotInContent />

            <ArticleSection title="Referral action">
                <TrackedExternalLink href={item.applicationUrl} label="Open company careers page" eventType="referral_click" eventMeta={{ slug: item.slug }} className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-teal-800" />
            </ArticleSection>

            <AdSlotInContent />

            <section className="space-y-6">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">Related Interview Experiences</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {interviewExperiences.slice(0, 3).map((entry) => (
                        <ContentCard key={entry.slug} href={`/interview/${entry.slug}`} title={entry.role} summary={entry.summary} eyebrow={entry.companySlug} />
                    ))}
                </div>
            </section>

            <AdSlotInContent />

            <section className="space-y-6">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">Related Resume Resources</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {resumeResources.slice(0, 3).map((entry) => (
                        <ContentCard key={entry.slug} href={`/resume/${entry.slug}`} title={entry.title} summary={entry.summary} />
                    ))}
                </div>
            </section>

            <AdSlotBottom />
        </ArticlePage>
    );
}
