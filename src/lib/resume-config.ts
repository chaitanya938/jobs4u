import fs from "fs";
import path from "path";

export type ResumeConfig = {
    heading: string;
    serviceName: string;
    price: string;
    phoneNumber: string;
    whatsappText: string;
    points?: string[];
};

const configPath = path.join(process.cwd(), "src/lib/resume-config.json");

export function getResumeConfig(): ResumeConfig {
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

export function updateResumeConfig(newConfig: ResumeConfig) {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 4), "utf-8");
}
