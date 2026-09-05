import fs from "fs";
import path from "path";

export type ReferralConfig = {
    paragraph1: string;
    paragraph2: string;
    price: string;
    phoneNumber: string;
    whatsappText: string;
    noteText: string;
};

const configPath = path.join(process.cwd(), "src/lib/referral-config.json");

export function getReferralConfig(): ReferralConfig {
    try {
        const file = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(file) as ReferralConfig;
    } catch {
        // Fallbacks
        return {
            paragraph1: "Nowadays, **75% of jobs are filled through referrals.** Getting a referral drastically increases your chances of getting your resume viewed by HR and being selected for an interview.",
            paragraph2: "While we cannot give a 100% guarantee of a job offer, **when a referral is done, your candidate profile is prioritized.** If 1,000 applications come in for a single role, HR will give more priority to the referral profiles. If your skills match their Job Description (JD), they will proceed with their interview and hiring process!",
            price: "250",
            phoneNumber: "918247660084",
            whatsappText: "Hi! I want to get a referral for a job.",
            noteText: "You will get an official email from the company stating that you have been referred for this role by an employee working in that particular company.",
        };
    }
}

export function updateReferralConfig(newConfig: ReferralConfig) {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 4), "utf-8");
}
