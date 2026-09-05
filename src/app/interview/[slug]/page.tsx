import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlotBottom, AdSlotInContent, AdSlotTop } from "@/components/ad-slot";
import { ArticlePage, ArticleSection } from "@/components/article-page";
import { ContentCard } from "@/components/cards";
import { ViewTracker } from "@/components/view-tracker";
import { createPageMetadata } from "@/lib/seo";
import { interviewExperiences, preparationGuides, programmingQuestions, getCompany } from "@/lib/site-data";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const item = interviewExperiences.find((experience) => experience.slug === params.slug);

    if (!item) {
        return createPageMetadata({ title: "Interview Experience Not Found", description: "The requested interview experience is not available.", path: "/interview" });
    }

    const company = getCompany(item.companySlug);

    return createPageMetadata({ title: `${item.role} interview experience at ${company?.name ?? item.companySlug}`, description: item.summary, path: `/interview/${item.slug}` });
}

export default function InterviewExperiencePage({ params }: { params: { slug: string } }) {
    const item = interviewExperiences.find((experience) => experience.slug === params.slug);
    if (!item) notFound();

    const company = getCompany(item.companySlug);

    return (
        <ArticlePage crumbs={[{ label: "Home", href: "/" }, { label: "Interview", href: "/interview" }, { label: item.role }]} eyebrow="Interview Experience" title={`${item.role} at ${company?.name ?? item.companySlug}`} summary={item.summary} meta={<ViewTracker type="interview_view" title={item.role} url={`https://jobs4u.in/interview/${item.slug}`} company={company?.name} />}>
            <AdSlotTop />
            <ArticleSection title="Interview notes">
                <p><strong>Stage:</strong> {item.stage}</p>
                <p><strong>Updated:</strong> {item.updatedAt}</p>
                {item.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </ArticleSection>

            <AdSlotInContent />

            <section className="space-y-6">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">Related Programming Questions</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {programmingQuestions.slice(0, 3).map((question) => (
                        <ContentCard key={question.slug} href={`/questions/${question.slug}`} title={question.title} summary={question.question} eyebrow={question.category} />
                    ))}
                </div>
            </section>

            <AdSlotInContent />

            <section className="space-y-6">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">Preparation guides</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {preparationGuides.slice(0, 3).map((guide) => (
                        <ContentCard key={guide.slug} href={`/preparation/${guide.slug}`} title={guide.title} summary={guide.summary} eyebrow={guide.category} />
                    ))}
                </div>
            </section>

            <AdSlotBottom />
        </ArticlePage>
    );
}
