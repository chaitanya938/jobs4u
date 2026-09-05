import {
    companies,
    hiringProcesses,
    interviewExperiences,
    jobs,
    preparationGuides,
    programmingQuestions,
    referralOpportunities,
    resumeResources,
} from "./site-data";

function normalize(value: string) {
    return value.toLowerCase().trim();
}

function containsNeedle(haystack: string, needle: string) {
    return normalize(haystack).includes(normalize(needle));
}

export function searchAll(query: string) {
    const term = normalize(query);

    if (!term) {
        return {
            jobs: jobs.filter((job) => job.status === "ACTIVE"),
            companies,
            referrals: referralOpportunities,
            interviewExperiences,
            programmingQuestions,
            resumeResources,
            preparationGuides,
            hiringProcesses,
        };
    }

    return {
        jobs: jobs.filter((job) =>
            [job.title, job.location, job.experience, job.jobType, job.workMode, job.description, job.skills.join(" "), job.tags.join(" ")].some((value) =>
                containsNeedle(value, term),
            ),
        ),
        companies: companies.filter((company) => [company.name, company.sector, company.description].some((value) => containsNeedle(value, term))),
        referrals: referralOpportunities.filter((item) => [item.role, item.location, item.experience, item.eligibility, item.referralInfo, item.skills.join(" ")].some((value) => containsNeedle(value, term))),
        interviewExperiences: interviewExperiences.filter((item) => [item.role, item.summary, item.body.join(" "), item.tags.join(" ")].some((value) => containsNeedle(value, term))),
        programmingQuestions: programmingQuestions.filter((item) => [item.title, item.category, item.question, item.explanation, item.answer, item.tags.join(" ")].some((value) => containsNeedle(value, term))),
        resumeResources: resumeResources.filter((item) => [item.title, item.summary, item.body.join(" "), item.tags.join(" ")].some((value) => containsNeedle(value, term))),
        preparationGuides: preparationGuides.filter((item) => [item.title, item.summary, item.body.join(" "), item.tags.join(" ")].some((value) => containsNeedle(value, term))),
        hiringProcesses: hiringProcesses.filter((item) => [item.title, item.overview, item.sections.map((section) => section.body.join(" ")).join(" ")].some((value) => containsNeedle(value, term))),
    };
}
