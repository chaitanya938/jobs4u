import type { MetadataRoute } from "next";
import { companies, hiringProcesses, interviewExperiences, jobs, preparationGuides, programmingQuestions, referralOpportunities, resumeResources } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        "",
        "/fresher-jobs",
        "/remote-jobs",
        "/experienced-jobs",
        "/resume",
        "/referrals",
        "/interview",
        "/preparation",
        "/hiring-process",
        "/about",
        "/contact",
        "/privacy-policy",
        "/terms",
        "/disclaimer",
        "/editorial-policy",
        "/report",
    ];

    const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({ url: `https://jobs4u.in${path}`, lastModified: new Date(), changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 }));

    const dynamic = [
        ...jobs.map((item) => `/jobs/${item.slug}`),
        ...resumeResources.map((item) => `/resume/${item.slug}`),
        ...referralOpportunities.map((item) => `/referrals/${item.slug}`),
        ...interviewExperiences.map((item) => `/interview/${item.slug}`),
        ...programmingQuestions.map((item) => `/questions/${item.slug}`),
        ...preparationGuides.map((item) => `/preparation/${item.slug}`),
        ...hiringProcesses.map((item) => `/hiring-process/${item.slug}`),
        ...companies.map((item) => `/hiring-process/${item.slug}`),
    ].map((path) => ({ url: `https://jobs4u.in${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 }));

    return [...entries, ...dynamic];
}
