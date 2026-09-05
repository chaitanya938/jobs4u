import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlotBottom, AdSlotInContent, AdSlotTop } from "@/components/ad-slot";
import { ArticlePage, ArticleSection, PillCloud } from "@/components/article-page";
import { ContentCard } from "@/components/cards";
import { ViewTracker } from "@/components/view-tracker";
import { createPageMetadata } from "@/lib/seo";
import { programmingQuestions } from "@/lib/site-data";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const item = programmingQuestions.find((question) => question.slug === params.slug);

    if (!item) {
        return createPageMetadata({ title: "Question Not Found", description: "The requested question is not available.", path: "/interview" });
    }

    return createPageMetadata({ title: item.title, description: item.question, path: `/questions/${item.slug}` });
}

export default function QuestionPage({ params }: { params: { slug: string } }) {
    const item = programmingQuestions.find((question) => question.slug === params.slug);
    if (!item) notFound();

    return (
        <ArticlePage crumbs={[{ label: "Home", href: "/" }, { label: "Interview", href: "/interview" }, { label: item.category, href: "/interview" }, { label: item.title }]} eyebrow="Programming Question" title={item.title} summary={item.question} meta={<ViewTracker type="question_view" title={item.title} url={`https://jobs4u.in/questions/${item.slug}`} />}>
            <AdSlotTop />
            <ArticleSection title="Explanation">
                <PillCloud items={item.tags} />
                <p>{item.explanation}</p>
                <p><strong>Answer:</strong> {item.answer}</p>
                <p><strong>Example:</strong> {item.example}</p>
                {item.code ? (
                    <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm text-slate-100"><code>{item.code}</code></pre>
                ) : null}
                <p><strong>Complexity:</strong> {item.complexity}</p>
            </ArticleSection>

            <AdSlotInContent />

            <section className="space-y-6">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">Related Questions</h2>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {programmingQuestions.filter((question) => question.slug !== item.slug).slice(0, 3).map((question) => (
                        <ContentCard key={question.slug} href={`/questions/${question.slug}`} title={question.title} summary={question.question} eyebrow={question.category} />
                    ))}
                </div>
            </section>

            <AdSlotBottom />
        </ArticlePage>
    );
}
