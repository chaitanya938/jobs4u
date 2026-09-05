import fs from "fs";
import path from "path";

export type InterviewCategory = {
    id: string;
    title: string;
    description: string;
    items: string[];
};

const configPath = path.join(process.cwd(), "src/lib/interview-config.json");

export function getInterviewConfig(): InterviewCategory[] {
    try {
        const file = fs.readFileSync(configPath, "utf-8");
        return JSON.parse(file) as InterviewCategory[];
    } catch {
        return [];
    }
}

export function saveInterviewConfig(config: InterviewCategory[]) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 4), "utf-8");
}
