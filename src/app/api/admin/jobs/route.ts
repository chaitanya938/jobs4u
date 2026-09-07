import { NextResponse } from "next/server";
import { saveJob, type JobCategoryTab, uploadCompanyLogo } from "@/lib/jobs-store";

const allowedTabs: JobCategoryTab[] = ["Fresher", "Experienced", "Remote"];

function splitLines(value: string) {
    return value
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
}

export async function POST(request: Request) {
    try {
        const payload = await request.formData();
        const rawCategories = payload.getAll("categories");
        const categories = rawCategories.filter((item): item is JobCategoryTab => typeof item === "string" && allowedTabs.includes(item as JobCategoryTab));

        const title = payload.get("title")?.toString().trim();
        const company = payload.get("company")?.toString().trim();
        const location = payload.get("location")?.toString().trim();
        const experience = payload.get("experience")?.toString().trim();
        const jobType = payload.get("jobType")?.toString().trim();
        const workMode = payload.get("workMode")?.toString().trim();
        const applicationUrl = payload.get("careerUrl")?.toString().trim();

        if (!title || !company || !location || !experience || !jobType || !workMode || !applicationUrl) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

        if (categories.length === 0) {
            return NextResponse.json({ error: "Select at least one job tab." }, { status: 400 });
        }

        let logoUrl = undefined;
        const file = payload.get("companyLogo") as File | null;
        if (file && file.size > 0 && file.name) {
            logoUrl = await uploadCompanyLogo(file);
        } else {
            const textLogo = payload.get("companyLogoUrl")?.toString().trim();
            if (textLogo) logoUrl = textLogo;
        }

        const result = await saveJob({
            title,
            company,
            companyLogo: logoUrl,
            location,
            experience,
            salary: payload.get("salary")?.toString().trim() || "",
            jobType,
            workMode,
            categories,
            skills: splitLines(payload.get("skills")?.toString() || ""),
            eligibility: splitLines(payload.get("eligibility")?.toString() || ""),
            responsibilities: splitLines(payload.get("responsibilities")?.toString() || ""),
            requirements: splitLines(payload.get("requirements")?.toString() || ""),
            description: payload.get("description")?.toString().trim() || "",
            applicationUrl,
            sourceUrl: payload.get("careerUrl")?.toString().trim() || undefined,
            postedAt: payload.get("postedAt")?.toString().trim() || undefined,
        });

        return NextResponse.json({ ok: true, slug: result.slug });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to save job.";


        if (message.includes("Could not find the table")) {
            return NextResponse.json(
                {
                    error: "Database is not initialized yet. Run database/schema.sql in Supabase SQL Editor, then try again.",
                },
                { status: 503 },
            );
        }

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
