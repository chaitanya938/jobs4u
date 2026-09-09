"use client";

import { useMemo, useState } from "react";

const jobTabs = ["Fresher", "Experienced", "Remote"] as const;
const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const;

export function JobEntryForm() {
    const [selectedTabs, setSelectedTabs] = useState<(typeof jobTabs)[number][]>(["Fresher"]);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const defaultJobType = useMemo(() => "Full-time", []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const formData = new FormData(e.currentTarget);
            selectedTabs.forEach(t => formData.append("categories", t));

            if (!formData.get("jobType")) {
                formData.set("jobType", defaultJobType);
            }

            const response = await fetch("/api/admin/jobs", {
                method: "POST",
                body: formData,
            });

            const result = (await response.json()) as { ok?: boolean; error?: string };

            if (!response.ok || !result.ok) {
                throw new Error(result.error ?? "Unable to save job.");
            }

            setMessage("Job saved successfully. You can add the next job now.");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unable to save job.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="jobs4u-card space-y-8 rounded-[2rem] p-6 sm:p-8">
            <section className="space-y-4">
                <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">1. Choose one or more tabs</h2>
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
                <Field name="title" label="Job title" placeholder="Software Engineer - Fresher" />
                <Field name="company" label="Company" placeholder="Infosys" />
                <FileField name="companyLogo" label="Company Logo (Upload from laptop)" />
                <Field name="location" label="Location" placeholder="Chennai" />
                <Field name="experience" label="Experience" placeholder="0-2 years" />
                <Field name="salary" label="Salary" placeholder="As per company standards" />
                <Field name="workMode" label="Work mode" placeholder="Remote / On-site / Hybrid" />
                <SelectField name="jobType" label="Job type" defaultValue={defaultJobType} />
                <Field name="careerUrl" label="Career / job link" placeholder="https://careers.company.com/job/..." />
                <DateField name="postedAt" label="Posted date" />
            </section>

            <section className="grid gap-4">
                <TextArea name="skills" label="Skills" placeholder="Java, SQL, Git" />
                <TextArea name="eligibility" label="Eligibility" placeholder="B.E/B.Tech, MCA..." />
                <TextArea name="responsibilities" label="Responsibilities" placeholder="Write one line per responsibility" />
                <TextArea name="requirements" label="Requirements" placeholder="Write one line per requirement" />
                <TextArea name="description" label="Job description" placeholder="Add the full job description here" />
            </section>

            <div className="rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
                Paste only the job career page or role link once. Jobs4U will save it as both the application link and the source link.
            </div>

            {message ? <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">{message}</div> : null}

            <div className="flex flex-wrap gap-3">
                <button type="submit" disabled={submitting} className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60">
                    {submitting ? "Saving..." : "Save Job"}
                </button>
            </div>
        </form>
    );
}

function splitLines(value: string) {
    return value
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function Field({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>{label}</span>
            <input
                name={name}
                placeholder={placeholder}
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-400"
            />
        </label>
    );
}

function DateField({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>{label}</span>
            <input
                type="date"
                name={name}
                defaultValue={defaultValue}
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-400"
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

function TextArea({ name, label, placeholder }: { name: string; label: string; placeholder: string }) {
    return (
        <label className="grid gap-2 text-sm font-medium text-slate-700">
            <span>{label}</span>
            <textarea
                name={name}
                rows={4}
                placeholder={placeholder}
                className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-400"
            />
        </label>
    );
}
