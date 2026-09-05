import { ArticlePage, ArticleSection } from "@/components/article-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "Report an Error", description: "Report a Jobs4U content issue.", path: "/report" });

export default function ReportPage() {
    return (
        <ArticlePage crumbs={[{ label: "Home", href: "/" }, { label: "Report" }]} eyebrow="Support" title="Report an Error" summary="Use this page to report broken links, outdated content or a factual issue.">
            <ArticleSection title="What to include">
                <p>Share the page URL, what is outdated and the correct source link if you have one.</p>
                <p>That lets the editorial team review the issue quickly and update the page responsibly.</p>
            </ArticleSection>
        </ArticlePage>
    );
}
