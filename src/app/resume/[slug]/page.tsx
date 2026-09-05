import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlotBottom, AdSlotInContent, AdSlotTop } from "@/components/ad-slot";
import { ArticlePage, ArticleSection, PillCloud } from "@/components/article-page";
import { ContentCard } from "@/components/cards";
import { ViewTracker } from "@/components/view-tracker";
import { createPageMetadata } from "@/lib/seo";
import { jobs, resumeResources } from "@/lib/site-data";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const item = resumeResources.find((resource) => resource.slug === params.slug);

    if (!item) {
        return createPageMetadata({ title: "Resume Resource Not Found", description: "The requested resume resource is not available.", path: "/resume" });
    }

    return createPageMetadata({ title: item.title, description: item.summary, path: `/resume/${item.slug}` });
}

export default function ResumeDetailPage({ params }: { params: { slug: string } }) {
    const item = resumeResources.find((resource) => resource.slug === params.slug);
    if (!item) notFound();

    return (
        <ArticlePage crumbs={[{ label: "Home", href: "/" }, { label: "Resume", href: "/resume" }, { label: item.title }]} eyebrow="Resume Resource" title={item.title} summary={item.summary} meta={<ViewTracker type="resume_view" title={item.title} url={`https://jobs4u.in/resume/${item.slug}`} />}>
            <AdSlotTop />
            <ArticleSection title="What this resource covers">
                <PillCloud items={item.tags} />
                {item.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </ArticleSection>

            <AdSlotInContent />

            <ArticleSection title="Improve your resume">
                <p>Keep the language direct, include role-specific keywords naturally and show measurable impact when possible.</p>
                <p>For a fresher resume, focus on projects, internships, academics and practical skills instead of overlong summaries.</p>
            </ArticleSection>

            <AdSlotInContent />

            <section className="space-y-6">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">Related Jobs</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {jobs.slice(0, 3).map((job) => (
                        <ContentCard key={job.slug} href={`/jobs/${job.slug}`} title={job.title} summary={job.description} eyebrow={job.companySlug} />
                    ))}
                </div>
            </section>

            <AdSlotBottom />
        </ArticlePage>
    );
}
