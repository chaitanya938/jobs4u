import { getSupabaseAdmin } from "./supabase-admin";

export async function fetchAnalyticsData() {
    const supabase = getSupabaseAdmin() as any;

    try {
        const { data: allEvents, error } = await supabase
            .from("analytics_events")
            .select("event_type, job_id, created_at, title, company");

        if (error || !allEvents) {
            return {
                visitorsToday: 0,
                pageViews: 0,
                jobViews: 0,
                applyClicks: 0,
                topJobs: [],
            };
        }

        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

        let visitorsToday = 0; // Estimation
        let pageViews = 0;
        let jobViews = 0;
        let applyClicks = 0;

        const jobStats: Record<string, { title: string; company: string; views: number; applies: number }> = {};

        for (const event of allEvents) {
            const rowTime = new Date(event.created_at).getTime();

            if (event.event_type === "page_view" || event.event_type === "job_view") {
                pageViews++;
                if (rowTime >= startOfDay) {
                    // Simple estimation for visitors today (approx 1 page view per visitor out of total daily views if we assume multiple views, but we don't have session IDs easily available here)
                    // We'll just count total events today and divide by 1.5 for a rough estimate if we don't track unique IPs.
                    visitorsToday++;
                }
            }

            if (event.event_type === "job_view") {
                jobViews++;
                const slug = event.job_id || "unknown";
                if (!jobStats[slug] && slug !== "unknown") {
                    jobStats[slug] = { title: event.title || slug, company: event.company || "", views: 0, applies: 0 };
                }
                if (slug !== "unknown") {
                    jobStats[slug].views++;
                }
            }

            if (event.event_type === "apply_click") {
                applyClicks++;
                const slug = event.job_id || "unknown";
                if (!jobStats[slug] && slug !== "unknown") {
                    jobStats[slug] = { title: event.title || slug, company: event.company || "", views: 0, applies: 0 };
                }
                if (slug !== "unknown") {
                    jobStats[slug].applies++;
                }
            }
        }

        const topJobs = Object.entries(jobStats)
            .map(([slug, data]) => ({
                slug,
                title: data.title,
                company: data.company,
                views: data.views,
                applyClicks: data.applies,
            }))
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);

        return {
            visitorsToday: Math.floor(visitorsToday / 1.5), // naive estimation
            pageViews,
            jobViews,
            applyClicks,
            topJobs,
        };
    } catch {
        return {
            visitorsToday: 0,
            pageViews: 0,
            jobViews: 0,
            applyClicks: 0,
            topJobs: [],
        };
    }
}
