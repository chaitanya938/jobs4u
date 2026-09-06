import type { MetadataRoute } from "next";
import { fetchActiveJobs } from "@/lib/jobs-store";
import { interviewExperiences, programmingQuestions, referralOpportunities, resumeResources } from "@/lib/site-data";

const siteUrl = "https://jobs4uu.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes = [
        "/fresher-jobs",
        "/remote-jobs",
        "/experienced-jobs",
        "/resume",
        "/referrals",
        "/interview",
        "/about",
        "/contact",
        "/privacy-policy",
        "/terms",
        "/disclaimer",
        "/editorial-policy",
        "/report",
    ];

    const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
        url: `${siteUrl}${path}`,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    const jobs = await fetchActiveJobs();

    const dynamic = [
        ...jobs.map((item) => ({ path: `/jobs/${item.slug}`, lastModified: item.postedAt })),
        ...resumeResources.map((item) => ({ path: `/resume/${item.slug}`, lastModified: item.updatedAt })),
        ...referralOpportunities.map((item) => ({ path: `/referrals/${item.slug}`, lastModified: item.postedAt })),
        ...interviewExperiences.map((item) => ({ path: `/interview/${item.slug}`, lastModified: item.updatedAt })),
        ...programmingQuestions.map((item) => ({ path: `/questions/${item.slug}`, lastModified: undefined })),
    ].map(({ path, lastModified }) => ({
        url: `${siteUrl}${path}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...entries, ...dynamic];
}
