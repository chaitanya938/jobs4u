export type JobStatus = "ACTIVE" | "EXPIRED";

export type Company = {
    slug: string;
    name: string;
    logo: string;
    logoUrl?: string;
    website: string;
    sector: string;
    description: string;
};

export type Job = {
    slug: string;
    title: string;
    companySlug: string;
    companyLogoUrl?: string;
    location: string;
    experience: string;
    salary: string;
    jobType: string;
    workMode: string;
    skills: string[];
    eligibility: string[];
    responsibilities: string[];
    requirements: string[];
    description: string;
    applicationUrl: string;
    sourceUrl: string;
    postedAt: string;
    expiresAt: string | null;
    status: JobStatus;
    categories: string[];
    tags: string[];
};

export type ContentItem = {
    slug: string;
    title: string;
    summary: string;
    body: string[];
    updatedAt: string;
    tags: string[];
};

export type Referral = {
    slug: string;
    companySlug: string;
    role: string;
    location: string;
    experience: string;
    eligibility: string;
    skills: string[];
    referralInfo: string;
    applicationUrl: string;
    postedAt: string;
    status: string;
};

export type InterviewExperience = {
    slug: string;
    companySlug: string;
    role: string;
    stage: string;
    summary: string;
    body: string[];
    postedAt: string;
    updatedAt: string;
    tags: string[];
};

export type ProgrammingQuestion = {
    slug: string;
    title: string;
    category: string;
    difficulty: string;
    question: string;
    explanation: string;
    answer: string;
    example: string;
    code: string;
    complexity: string;
    tags: string[];
};

export type Guide = {
    slug: string;
    title: string;
    category: string;
    summary: string;
    body: string[];
    tags: string[];
};

export type HiringProcess = {
    slug: string;
    companySlug: string;
    title: string;
    lastUpdated: string;
    overview: string;
    sections: { title: string; body: string[] }[];
    faq: { question: string; answer: string }[];
};

const daysAgo = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString();
};

export const navLinks = [
    { href: "/fresher-jobs", label: "Fresher Jobs" },
    { href: "/remote-jobs", label: "Remote Jobs" },
    { href: "/experienced-jobs", label: "Experienced Jobs" },
    { href: "/resume", label: "Resume Preparation Guide" },
    { href: "/referrals", label: "Referrals" },
    { href: "/interview", label: "Interview & Questions" },
] as const;

export const adminNavLinks = [
    { href: "/admin/fresher-jobs", label: "Fresher Jobs" },
    { href: "/admin/remote-jobs", label: "Remote Jobs" },
    { href: "/admin/experienced-jobs", label: "Experienced Jobs" },
    { href: "/admin/referrals", label: "Referrals" },
    { href: "/admin/resume", label: "Resume Preparation Guide" },
    { href: "/admin/interview", label: "Interview & Questions" },
] as const;
export const mobileLinks = [
    ...navLinks,
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

export const footerSections = [
    {
        title: "Jobs",
        links: [
            { href: "/fresher-jobs", label: "Fresher Jobs" },
            { href: "/remote-jobs", label: "Remote Jobs" },
            { href: "/experienced-jobs", label: "Experienced Jobs" },
            { href: "/referrals", label: "Referrals" },
            { href: "/interview", label: "Interview & Questions" },
            { href: "/preparation", label: "Preparation" },
            { href: "/hiring-process", label: "Hiring Process" },
        ],
    },
    {
        title: "Company",
        links: [
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/report", label: "Report" },
            { href: "/editorial-policy", label: "Editorial Policy" },
        ],
    },
    {
        title: "Legal",
        links: [
            { href: "/privacy-policy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms" },
            { href: "/disclaimer", label: "Disclaimer" },
        ],
    },
] as const;

export const popularSearches = [
    "Java Developer",
    "Python Developer",
    "Software Engineer",
    "Data Analyst",
    "Full Stack Developer",
    "Internship",
    "Freshers",
    "Remote Jobs",
];

export const categories = [
    "Java",
    "Python",
    "JavaScript",
    "SQL",
    "DSA",
    "OOP",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "System Design",
];

export const resumeTopics = [
    "Resume Templates",
    "Fresher Resume",
    "ATS Resume",
    "Developer Resume",
    "Data Analyst Resume",
    "Cover Letter",
    "Resume Tips",
];

export const preparationTopics = [
    "Aptitude Preparation",
    "Coding Preparation",
    "DSA Preparation",
    "Java Preparation",
    "Python Preparation",
    "SQL Preparation",
    "Technical Interview Preparation",
    "HR Interview Preparation",
];

export const companyNames = ["TCS", "Infosys", "Wipro", "Accenture", "Cognizant", "Capgemini", "Amazon", "Microsoft", "Google"] as const;

export const companies: Company[] = [
    { slug: "infosys", name: "Infosys", logo: "IN", website: "https://www.infosys.com", sector: "IT Services", description: "Digital services, consulting and next-generation technology delivery." },
    { slug: "tcs", name: "TCS", logo: "TC", website: "https://www.tcs.com", sector: "IT Services", description: "Enterprise technology, engineering and cloud transformation." },
    { slug: "accenture", name: "Accenture", logo: "AC", website: "https://www.accenture.com", sector: "Consulting", description: "Consulting, strategy, technology and operations services." },
    { slug: "amazon", name: "Amazon", logo: "AM", website: "https://www.amazon.jobs", sector: "Product & Cloud", description: "Large-scale product engineering, cloud, retail and logistics systems." },
    { slug: "google", name: "Google", logo: "GO", website: "https://careers.google.com", sector: "Product & AI", description: "Search, cloud, AI and developer platforms with a strong engineering focus." },
];

export const jobs: Job[] = [];

export const referralOpportunities: Referral[] = [
    { slug: "amazon-referral-software-engineer-bengaluru", companySlug: "amazon", role: "Software Engineer", location: "Bengaluru", experience: "1-4 years", eligibility: "Strong coding and system fundamentals", skills: ["Java", "AWS", "System Design"], referralInfo: "Share a concise resume and role summary with a clear application link.", applicationUrl: "https://www.amazon.jobs", postedAt: daysAgo(0), status: "ACTIVE" },
    { slug: "infosys-referral-java-developer-chennai", companySlug: "infosys", role: "Java Developer", location: "Chennai", experience: "0-2 years", eligibility: "Freshers with Java and SQL basics", skills: ["Java", "Spring", "SQL"], referralInfo: "Focus on concise experience bullets and project links.", applicationUrl: "https://www.infosys.com/careers", postedAt: daysAgo(1), status: "ACTIVE" },
];

export const interviewExperiences: InterviewExperience[] = [
    { slug: "tcs-fresher-interview-experience-java", companySlug: "tcs", role: "Java Fresher", stage: "Interview Experience", summary: "A straightforward fresher experience covering coding basics, projects and HR discussion.", body: ["The first round focused on Java syntax, OOP concepts and simple SQL questions.", "The technical interviewer asked one coding problem and a project walkthrough.", "The HR round centered on communication, relocation and learning attitude."], postedAt: daysAgo(2), updatedAt: daysAgo(1), tags: ["tcs", "java", "fresher"] },
    { slug: "accenture-data-analyst-interview-experience", companySlug: "accenture", role: "Data Analyst", stage: "Interview Experience", summary: "An interview flow that mixed analytics basics, SQL and communication around dashboards.", body: ["Candidates were asked about SQL joins, reporting structure and data interpretation.", "A short case discussion explored how to explain insights to a business stakeholder.", "The final round reviewed teamwork and presentation skills."], postedAt: daysAgo(1), updatedAt: daysAgo(0), tags: ["accenture", "sql", "analytics"] },
];

export const programmingQuestions: ProgrammingQuestion[] = [
    { slug: "reverse-a-linked-list", title: "Reverse a Linked List", category: "DSA", difficulty: "Easy", question: "Reverse a singly linked list and return the new head.", explanation: "Iteratively move through the list while flipping each pointer.", answer: "Use three pointers: previous, current and next.", example: "1 -> 2 -> 3 becomes 3 -> 2 -> 1", code: `function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}`, complexity: "Time: O(n), Space: O(1)", tags: ["linked-list", "dsa", "interview"] },
    { slug: "sql-inner-join-explained", title: "What is an INNER JOIN?", category: "SQL", difficulty: "Easy", question: "Explain how INNER JOIN works in SQL.", explanation: "It returns only rows with matching values in both joined tables.", answer: "Use it when you want intersecting records from two tables.", example: "SELECT * FROM employees e INNER JOIN departments d ON e.department_id = d.id;", code: "", complexity: "Depends on table size and indexes", tags: ["sql", "joins", "database"] },
];

export const resumeResources: ContentItem[] = [
    { slug: "resume-templates", title: "Resume Templates", summary: "A clean structure for creating ATS-friendly resumes.", body: ["Use a simple header, clear section order and concise bullet points.", "Keep the layout readable on mobile and avoid decorative clutter.", "Prioritize measurable outcomes over long paragraph descriptions."], updatedAt: daysAgo(0), tags: ["resume", "template", "ats"] },
    { slug: "ats-resume", title: "ATS Resume", summary: "Write resumes that can be parsed by applicant tracking systems.", body: ["Mirror the job description language without stuffing keywords.", "Use standard headings and avoid columns that break parsing."], updatedAt: daysAgo(1), tags: ["resume", "ats"] },
    { slug: "developer-resume", title: "Developer Resume", summary: "Highlight systems, projects, impact and stack depth.", body: ["Show the problem, your role and the outcome.", "List the technologies only when they were actually used."], updatedAt: daysAgo(2), tags: ["resume", "developer"] },
];

export const preparationGuides: Guide[] = [
    { slug: "coding-preparation", title: "Coding Preparation", category: "Coding", summary: "Build coding fluency with a practical interview routine.", body: ["Practice a small set of patterns deeply instead of jumping across topics.", "Review your mistakes and keep a log of recurring weak areas.", "Pair problem solving with mock explanations."], tags: ["coding", "interview"] },
    { slug: "placement-preparation", title: "Placement Preparation", category: "Placement", summary: "A simple weekly plan for students and freshers preparing for hiring cycles.", body: ["Combine coding, aptitude, communication and resume refinement.", "Track companies, deadlines and role requirements in one place."], tags: ["placement", "freshers"] },
];

export const hiringProcesses: HiringProcess[] = [
    { slug: "infosys", companySlug: "infosys", title: "Infosys Hiring Process", lastUpdated: daysAgo(1), overview: "Typical fresher hiring flow with aptitude, coding and HR discussion.", sections: [{ title: "Eligibility", body: ["Graduation and academic criteria vary by role and campus cycle."] }, { title: "Assessment", body: ["Expect aptitude, communication and role-specific evaluation."] }, { title: "Technical Round", body: ["Be ready for projects, OOP, SQL and programming basics."] }, { title: "HR Round", body: ["Discuss relocation, shift flexibility and motivation clearly."] }], faq: [{ question: "Is the process fixed?", answer: "No. Hiring steps may change by role, location and batch." }, { question: "Should candidates verify before applying?", answer: "Yes. Always confirm details on the official careers page." }] },
    { slug: "accenture", companySlug: "accenture", title: "Accenture Hiring Process", lastUpdated: daysAgo(0), overview: "A common flow covering aptitude, communication and role-fit questions.", sections: [{ title: "Application", body: ["Apply through official channels and track the role carefully."] }, { title: "Assessment", body: ["The test often checks reasoning, communication and role basics."] }, { title: "Interview", body: ["Expect SQL, project discussion and scenario-based questions."] }], faq: [{ question: "How often does it change?", answer: "Processes change often, so last updated dates matter." }] },
];

export const legalPages = [
    { slug: "about", title: "About Jobs4U" },
    { slug: "contact", title: "Contact Jobs4U" },
    { slug: "privacy-policy", title: "Privacy Policy" },
    { slug: "terms", title: "Terms of Use" },
    { slug: "disclaimer", title: "Disclaimer" },
    { slug: "editorial-policy", title: "Editorial Policy" },
    { slug: "report", title: "Report an Error" },
] as const;

export const analyticsEventTypes = ["page_view", "job_view", "apply_click", "referral_view", "referral_click", "resume_view", "interview_view", "question_view", "search", "share_click"] as const;

export function getCompany(slug: string) {
    return companies.find((company) => company.slug === slug);
}

export function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

export function isJobActive(job: Job, now = new Date()) {
    void now;
    return job.status === "ACTIVE";
}

export function getJobStatus(job: Job, now = new Date()): JobStatus {
    return isJobActive(job, now) ? "ACTIVE" : "EXPIRED";
}

export function getActiveJobs() {
    return jobs.filter((job) => isJobActive(job)).sort((left, right) => new Date(right.postedAt).getTime() - new Date(left.postedAt).getTime());
}

export function getJobsByType(type: "fresher" | "remote" | "experienced") {
    const matcher: Record<typeof type, (job: Job) => boolean> = {
        fresher: (job) => job.categories.includes("Fresher") || /fresher/i.test(job.experience),
        remote: (job) => job.workMode.toLowerCase().includes("remote"),
        experienced: (job) => job.categories.includes("Experienced") || /\d/.test(job.experience),
    };

    return getActiveJobs().filter(matcher[type]);
}

export function getJobBySlug(slug: string) {
    return jobs.find((job) => job.slug === slug);
}

export function getRelatedJobs(job: Job) {
    return getActiveJobs().filter((candidate) => candidate.slug !== job.slug).filter((candidate) => candidate.companySlug === job.companySlug || candidate.categories.some((category) => job.categories.includes(category))).slice(0, 4);
}

export function getLatestItems<T extends { updatedAt?: string; postedAt?: string }>(items: T[], limit = 3) {
    return [...items].sort((left, right) => new Date(right.updatedAt ?? right.postedAt ?? 0).getTime() - new Date(left.updatedAt ?? left.postedAt ?? 0).getTime()).slice(0, limit);
}
