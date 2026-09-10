import fs from "fs";
import path from "path";
import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "./supabase-admin";

export type ResumeConfig = {
    heading: string;
    serviceName: string;
    price: string;
    phoneNumber: string;
    whatsappText: string;
    points?: string[];
};

type SiteConfigRow = {
    key: string;
    value: ResumeConfig;
    updated_at: string;
};

type SiteConfigClient = {
    from(table: "site_config"): {
        select(columns: string): {
            eq(column: string, value: string): {
                maybeSingle(): Promise<{ data: SiteConfigRow | null; error: { message: string } | null }>;
            };
        };
        upsert(values: SiteConfigRow): Promise<{ error: { message: string } | null }>;
    };
};

const configPath = path.join(process.cwd(), "src/lib/resume-config.json");

function getFileResumeConfig(): ResumeConfig {
    try {
        const file = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(file) as ResumeConfig;
    } catch {
        // Fallbacks
        return {
            heading: "Is your resume getting rejected? Let us fix it.",
            serviceName: "Our 100% Guarantee ATS Resume Service",
            price: "29",
            phoneNumber: "918247660084",
            whatsappText: "Hi! I want to get my resume customized for an ATS score.",
            points: [
                "Your resume will be better than 95% of applicants.",
                "Heavily boosts your chances of passing the ATS screening.",
                "Stop getting automated rejection emails and get more chances to be shortlisted.",
                "We will charge 29 rupees. If you need resume optimisation, click WhatsApp to message me."
            ],
        };
    }
}

export async function getResumeConfig(): Promise<ResumeConfig> {
    noStore();

    try {
        const supabase = getSupabaseAdmin() as unknown as SiteConfigClient;
        const { data, error } = await supabase
            .from("site_config")
            .select("value")
            .eq("key", "resume")
            .maybeSingle();

        if (error) {
            throw new Error(error.message);
        }

        if (data?.value) {
            return data.value;
        }
    } catch {
        // Local development can use the checked-in default until Supabase is configured.
    }

    return getFileResumeConfig();
}

export async function updateResumeConfig(newConfig: ResumeConfig) {
    try {
        const supabase = getSupabaseAdmin() as unknown as SiteConfigClient;
        const { error } = await supabase
            .from("site_config")
            .upsert({ key: "resume", value: newConfig, updated_at: new Date().toISOString() });

        if (error) {
            throw new Error(error.message);
        }
        return;
    } catch (error) {
        if (error instanceof Error && error.message !== "Supabase environment variables are missing.") {
            throw error;
        }
    }

    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 4), "utf-8");
}
