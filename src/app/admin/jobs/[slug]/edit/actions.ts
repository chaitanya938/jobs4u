"use server";

import { updateJob, type JobCategoryTab } from "@/lib/jobs-store";
import { revalidatePath } from "next/cache";

function splitLines(value: string) {
    return value
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
}

export async function updateJobAction(slug: string, formData: FormData, categories: string[]) {
    let logoUrl = undefined;
    const file = formData.get("companyLogo") as File | null;

    if (file && file.size > 0 && file.name) {
        const fs = require("fs");
        const path = require("path");
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = file.name.split('.').pop() || 'png';
        const filename = `logo-${Date.now()}.${ext}`;
        const dir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(path.join(dir, filename), buffer);
        logoUrl = `/uploads/${filename}`;
    } else {
        const urlStr = formData.get("companyLogoUrl")?.toString().trim();
        if (urlStr) logoUrl = urlStr;
    }

    const payload = {
        title: String(formData.get("title") ?? "").trim(),
        company: String(formData.get("company") ?? "").trim(),
        companyLogo: logoUrl,
        location: String(formData.get("location") ?? "").trim(),
        experience: String(formData.get("experience") ?? "").trim(),
        salary: String(formData.get("salary") ?? "").trim(),
        jobType: String(formData.get("jobType") ?? "Full-time"),
        workMode: String(formData.get("workMode") ?? "").trim(),
        categories: categories as JobCategoryTab[],
        skills: splitLines(String(formData.get("skills") ?? "")),
        eligibility: splitLines(String(formData.get("eligibility") ?? "")),
        responsibilities: splitLines(String(formData.get("responsibilities") ?? "")),
        requirements: splitLines(String(formData.get("requirements") ?? "")),
        description: String(formData.get("description") ?? "").trim(),
        applicationUrl: String(formData.get("careerUrl") ?? "").trim(),
        sourceUrl: String(formData.get("careerUrl") ?? "").trim(),
        postedAt: String(formData.get("postedAt") ?? "").trim(),
    };

    await updateJob(slug, payload);
    revalidatePath(`/admin/jobs/${slug}/edit`);
    revalidatePath("/admin/fresher-jobs");
    revalidatePath("/fresher-jobs");
}
