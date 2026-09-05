"use client";

import { useMemo, useState } from "react";
import { type Job } from "@/lib/site-data";
import { updateJobAction } from "./actions";

const jobTabs = ["Fresher", "Experienced", "Remote"] as const;
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const;

export function EditJobForm({ job }: { job: Job }) {
    // Determine initial tabs based on categories
    const initialTabs = jobTabs.filter(tab => job.categories.includes(tab as any));
    const [selectedTabs, setSelectedTabs] = useState<(typeof jobTabs)[number][]>(initialTabs.length ? initialTabs : ["Fresher"]);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const defaultJobType = useMemo(() => "Full-time", []);

    async function handleSubmit(formData: FormData) {
        setSubmitting(true);
        setMessage(null);

        try {
            await updateJobAction(job.slug, formData, selectedTabs);
            setMessage("Job updated successfully.");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unable to update job.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form action={handleSubmit} className="jobs4u-card space-y-8 rounded-[2rem] p-6 sm:p-8 border border-slate-200">
            <section className="space-y-4">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">1. Update tabs</h2>
                <div className="flex flex-wrap gap-3">
                    {jobTabs.map((type) => (
                        <button
                            key={type}
                            type="button"
                            onClick={() =>
                                setSelectedTabs((current) =>
                                    current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
                                )
                            }
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedTabs.includes(type) ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
                <p className="text-sm text-slate-500">
                    Selected tabs: <span className="font-semibold text-slate-950">{selectedTabs.length ? selectedTabs.join(", ") : "None"}</span>
                </p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
                <Field name="title" label="Job title" defaultValue={job.title} placeholder="Software Engineer - Fresher" />
                <Field name="company" label="Company Slug" defaultValue={job.companySlug} placeholder="infosys" />
                <div>
                    <FileField name="companyLogo" label="Company Logo (Upload from laptop)" />
                    <input type="hidden" name="companyLogoUrl" value={job.companyLogoUrl || ""} />
                </div>
                <Field name="location" label="Location" defaultValue={job.location} placeholder="Chennai" />
                <Field name="experience" label="Experience" defaultValue={job.experience} placeholder="0-2 years" />
                <Field name="salary" label="Salary" defaultValue={job.salary} placeholder="As per company standards" />
                <Field name="workMode" label="Work mode" defaultValue={job.workMode} placeholder="Remote / On-site / Hybrid" />
                <SelectField name="jobType" label="Job type" defaultValue={job.jobType || defaultJobType} />
                <Field name="careerUrl" label="Career / job link" defaultValue={job.applicationUrl} placeholder="https://careers.company.com/job/..." />
                <Field name="postedAt" label="Posted date" defaultValue={job.postedAt} placeholder="2026-09-01" />
            </section>

            <section className="grid gap-4">
                <TextArea name="skills" label="Skills" defaultValue={job.skills.join("\n")} placeholder="Java, SQL, Git" />
                <TextArea name="eligibility" label="Eligibility" defaultValue={job.eligibility.join("\n")} placeholder="B.E/B.Tech, MCA..." />
                <TextArea name="responsibilities" label="Responsibilities" defaultValue={job.responsibilities.join("\n")} placeholder="Write one line per responsibility" />
                <TextArea name="requirements" label="Requirements" defaultValue={job.requirements.join("\n")} placeholder="Write one line per requirement" />
                <TextArea name="description" label="Job description" defaultValue={job.description} placeholder="Add the full job description here" />
            </section>

            {message ? <div className={`rounded-2xl border px-4 py-3 text-sm ${message.includes("success") ? "border-teal-200 bg-teal-50 text-teal-900" : "border-red-200 bg-red-50 text-red-900"}`}>{message}</div> : null}

            <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={submitting} className="rounded-2xl bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:opacity-60">
                    {submitting ? "Saving..." : "Update Job"}
                </button>
            </div>
        </form>
    );
}

function Field({ name, label, placeholder, defaultValue }: { name: string; label: string; placeholder: string; defaultValue?: string }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>{label}</span>
            <input
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-400"
            />
        </label>
    );
}

function FileField({ name, label }: { name: string; label: string }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>{label}</span>
            <input
                type="file"
                name={name}
                accept="image/*"
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 outline-none file:mr-4 file:rounded-full file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
            />
        </label>
    );
}

function SelectField({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>{label}</span>
            <select
                name={name}
                defaultValue={defaultValue}
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-400"
            >
                {jobTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </label>
    );
}

function TextArea({ name, label, placeholder, defaultValue }: { name: string; label: string; placeholder: string; defaultValue?: string }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>{label}</span>
            <textarea
                name={name}
                defaultValue={defaultValue}
                rows={4}
                placeholder={placeholder}
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-400"
            />
        </label>
    );
}
