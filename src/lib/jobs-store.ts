import { unstable_noStore as noStore } from "next/cache";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "./supabase-admin";
import { type Job } from "./site-data";

type QueryError = { message: string };
type QueryResult<T> = { data: T | null; error: QueryError | null };

type CompanyInsert = {
    slug: string;
    name: string;
    logo_url?: string | null;
    website_url?: string | null;
    sector?: string | null;
    description?: string | null;
};

type JobInsert = {
    slug: string;
    title: string;
    company_id?: string | null;
    location: string;
    experience: string;
    salary?: string | null;
    job_type: string;
    work_mode: string;
    description?: string | null;
    responsibilities?: string[];
    requirements?: string[];
    skills?: string[];
    eligibility?: string[];
    application_url: string;
    source_url?: string | null;
    posted_at: string;
    expires_at?: string | null;
    status: "ACTIVE" | "EXPIRED";
    categories?: string[];
};

type JobSelectBuilder = {
    order(column: string, options?: { ascending?: boolean }): Promise<QueryResult<JobRow[]>>;
    eq(column: string, value: string): { single(): Promise<QueryResult<JobRow>> };
};

type JobTable = {
    select(columns: string): JobSelectBuilder;
    insert(values: JobInsert): Promise<QueryResult<unknown>>;
    update(values: Partial<JobInsert>): { eq(column: string, value: string): Promise<QueryResult<unknown>> };
    delete(): { eq(column: string, value: string): Promise<QueryResult<unknown>> };
};

type CompanyTable = {
    upsert(values: CompanyInsert, options?: { onConflict?: string }): {
        select(columns: string): { single(): Promise<QueryResult<{ id: string }>> };
    };
};

type AdminSupabaseClient = {
    from(table: "jobs"): JobTable;
    from(table: "companies"): CompanyTable;
};

type JobRow = {
    slug: string;
    title: string;
    location: string;
    experience: string;
    salary: string | null;
    job_type: string;
    work_mode: string;
    description: string | null;
    responsibilities: string[] | null;
    requirements: string[] | null;
    skills: string[] | null;
    eligibility: string[] | null;
    application_url: string;
    source_url: string | null;
    posted_at: string;
    expires_at: string | null;
    status: "ACTIVE" | "EXPIRED";
    categories: string[] | null;
    company:
    | {
        slug: string;
        name: string;
        logo_url: string | null;
        website_url: string | null;
        sector: string | null;
        description: string | null;
    }
    | null;
};

export type JobCategoryTab = "Fresher" | "Experienced" | "Remote";

export type JobCreateInput = {
    title: string;
    company: string;
    companyLogo?: string;
    location: string;
    experience: string;
    salary?: string;
    jobType: string;
    workMode: string;
    categories: JobCategoryTab[];
    skills: string[];
    eligibility: string[];
    responsibilities: string[];
    requirements: string[];
    description: string;
    applicationUrl: string;
    sourceUrl?: string;
    postedAt?: string;
};

const companyLogoBucket = "job-logos";

export async function uploadCompanyLogo(file: File) {
    const supabase = getSupabaseAdmin();
    const extension = file.name.split(".").pop()?.toLowerCase() || "png";
    const filePath = `${randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: bucketError } = await supabase.storage.createBucket(companyLogoBucket, { public: true });
    if (bucketError && !bucketError.message.toLowerCase().includes("already exists")) {
        throw new Error(bucketError.message);
    }

    const { error: uploadError } = await supabase.storage
        .from(companyLogoBucket)
        .upload(filePath, buffer, { contentType: file.type || "image/png", upsert: false });

    if (uploadError) {
        throw new Error(uploadError.message);
    }

    return supabase.storage.from(companyLogoBucket).getPublicUrl(filePath).data.publicUrl;
}

function normalizeLines(value: unknown) {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(/\n|,/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [] as string[];
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-");
}

function mapJobRow(row: JobRow): Job {
    return {
        slug: row.slug,
        title: row.title,
        companySlug: row.company?.slug ?? "company",
        companyLogoUrl: row.company?.logo_url ?? undefined,
        location: row.location,
        experience: row.experience,
        salary: row.salary ?? "",
        jobType: row.job_type,
        workMode: row.work_mode,
        skills: row.skills ?? [],
        eligibility: row.eligibility ?? [],
        responsibilities: row.responsibilities ?? [],
        requirements: row.requirements ?? [],
        description: row.description ?? "",
        applicationUrl: row.application_url,
        sourceUrl: row.source_url ?? row.application_url,
        postedAt: row.posted_at,
        expiresAt: row.expires_at,
        status: row.status,
        categories: row.categories ?? [],
        tags: (row.categories ?? []).map((item) => item.toLowerCase()),
    };
}

export async function fetchJobs() {
    noStore();
    const supabase = getSupabaseAdmin() as unknown as AdminSupabaseClient;
    const { data, error } = await supabase
        .from("jobs")
        .select("slug,title,location,experience,salary,job_type,work_mode,description,responsibilities,requirements,skills,eligibility,application_url,source_url,posted_at,expires_at,status,categories,company:companies(slug,name,logo_url,website_url,sector,description)")
        .order("posted_at", { ascending: false });

    if (error) {
        return [] as Job[];
    }

    return (data as JobRow[] | null ?? []).map(mapJobRow);
}

export async function fetchActiveJobs() {
    const jobs = await fetchJobs();

    return jobs.filter((job) => job.status === "ACTIVE");
}

export async function fetchJobBySlug(slug: string) {
    noStore();
    const supabase = getSupabaseAdmin() as unknown as AdminSupabaseClient;
    const { data, error } = await supabase
        .from("jobs")
        .select("slug,title,location,experience,salary,job_type,work_mode,description,responsibilities,requirements,skills,eligibility,application_url,source_url,posted_at,expires_at,status,categories,company:companies(slug,name,logo_url,website_url,sector,description)")
        .eq("slug", slug)
        .single();

    if (error || !data) {
        return null;
    }

    return mapJobRow(data as JobRow);
}

function splitCompanyName(company: string) {
    const normalized = company.trim();
    const name = normalized || "Unknown Company";
    return {
        name,
        slug: slugify(name),
    };
}

export async function saveJob(input: JobCreateInput) {
    const supabase = getSupabaseAdmin() as unknown as AdminSupabaseClient;
    const company = splitCompanyName(input.company);
    const postedAt = input.postedAt ? new Date(input.postedAt) : new Date();

    const companyPayload = {
        slug: company.slug,
        name: company.name,
        sector: "Career",
        description: `${company.name} hiring opportunities on Jobs4U`,
        ...(input.companyLogo ? { logo_url: input.companyLogo } : {}),
    };

    const { data: companyRow, error: companyError } = await supabase
        .from("companies")
        .upsert(companyPayload, { onConflict: "slug" })
        .select("id")
        .single();

    if (companyError) {
        throw new Error(companyError.message);
    }

    if (!companyRow) {
        throw new Error("Unable to create or load company record.");
    }

    const slug = `${slugify(input.title)}-${slugify(company.name)}-${slugify(input.location)}-${randomUUID().slice(0, 8)}`;
    const { error: jobError } = await supabase.from("jobs").insert({
        slug,
        title: input.title.trim(),
        company_id: companyRow.id,
        location: input.location.trim(),
        experience: input.experience.trim(),
        salary: input.salary?.trim() || null,
        job_type: input.jobType.trim(),
        work_mode: input.workMode.trim(),
        description: input.description.trim(),
        responsibilities: input.responsibilities,
        requirements: input.requirements,
        skills: input.skills,
        eligibility: input.eligibility,
        application_url: input.applicationUrl.trim(),
        source_url: input.sourceUrl?.trim() || input.applicationUrl.trim(),
        posted_at: postedAt.toISOString(),
        expires_at: null,
        status: "ACTIVE",
        categories: input.categories,
    });

    if (jobError) {
        throw new Error(jobError.message);
    }

    return { slug };
}

export function parseJobLines(value: FormDataEntryValue | null) {
    return normalizeLines(typeof value === "string" ? value : "");
}

export async function deleteJob(slug: string) {
    const supabase = getSupabaseAdmin() as unknown as AdminSupabaseClient;
    const { error } = await supabase.from("jobs").delete().eq("slug", slug);
    if (error) {
        throw new Error(error.message);
    }
}

export async function updateJob(slug: string, input: JobCreateInput) {
    const supabase = getSupabaseAdmin() as unknown as AdminSupabaseClient;
    const company = splitCompanyName(input.company);
    let companyId: string | undefined;

    if (input.companyLogo) {
        const companyPayload = {
            slug: company.slug,
            name: company.name,
            sector: "Career",
            description: `${company.name} hiring opportunities on Jobs4U`,
            logo_url: input.companyLogo,
        };
        const { data: companyRow, error: companyError } = await supabase
            .from("companies")
            .upsert(companyPayload, { onConflict: "slug" })
            .select("id")
            .single();

        if (companyError) {
            throw new Error(companyError.message);
        }

        companyId = companyRow?.id;
    }

    // For simplicity just update the jobs table.
    const { error } = await supabase.from("jobs").update({
        ...(companyId ? { company_id: companyId } : {}),
        title: input.title.trim(),
        location: input.location.trim(),
        experience: input.experience.trim(),
        salary: input.salary?.trim() || null,
        job_type: input.jobType.trim(),
        work_mode: input.workMode.trim(),
        description: input.description.trim(),
        responsibilities: input.responsibilities,
        requirements: input.requirements,
        skills: input.skills,
        eligibility: input.eligibility,
        application_url: input.applicationUrl.trim(),
        source_url: input.sourceUrl?.trim() || input.applicationUrl.trim(),
        categories: input.categories,
    }).eq("slug", slug);

    if (error) {
        throw new Error(error.message);
    }
}

export async function removeJobCategory(slug: string, category: string) {
    const job = await fetchJobBySlug(slug);
    if (!job) return;

    const newCategories = job.categories.filter((c) => c !== category);
    const supabase = getSupabaseAdmin() as unknown as AdminSupabaseClient;

    // Update categories
    await supabase.from("jobs").update({ categories: newCategories }).eq("slug", slug);
}

export async function addJobCategory(slug: string, category: string) {
    const job = await fetchJobBySlug(slug);
    if (!job) return;

    if (!job.categories.includes(category)) {
        const newCategories = [...job.categories, category];
        const supabase = getSupabaseAdmin() as unknown as AdminSupabaseClient;
        await supabase.from("jobs").update({ categories: newCategories }).eq("slug", slug);
    }
}

