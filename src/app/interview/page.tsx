import { ShellContainer } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/seo";
import React from "react";

export const metadata = createPageMetadata({
    title: "Interview & Questions",
    description: "Browse interview experiences and programming questions on Jobs4U.",
    path: "/interview",
});

import { getInterviewConfig } from "@/lib/interview-store";

function BigListSection({ items }: { items: string[] }) {
    return (
        <div className="bg-slate-50/50 rounded-[2rem] p-5 sm:p-8 md:p-12 border border-slate-200">
            <ol className="list-decimal list-outside ml-5 space-y-4">
                {items.map((item, idx) => (
                    <li key={idx} className="text-slate-700 font-medium pl-2 leading-relaxed">
                        {item}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default function InterviewPage() {
    const interviewData = getInterviewConfig();
    return (
        <div className="pb-24 pt-10">
            <ShellContainer className="space-y-24">

                {/* Header */}
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block rounded-full bg-teal-50 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-teal-700 mb-6 border border-teal-100">
                        Top Questions
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
                        Crack Any Technical Interview
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        The ultimate verified collections of top interview questions covering Java, Python, general coding algorithms, and critical DSA (Data Structures & Algorithms) for high-paying roles.
                    </p>
                </div>

                <div className="space-y-20 max-w-5xl mx-auto">
                    {interviewData.map((category) => (
                        <section key={category.id}>
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{category.title}</h2>
                                {category.description && (
                                    <p className={`mt-3 text-lg ${category.id === "coding" ? "text-teal-600 font-medium" : "text-slate-500"}`}>
                                        {category.description}
                                    </p>
                                )}
                            </div>
                            <BigListSection items={category.items} />
                        </section>
                    ))}
                </div>

            </ShellContainer>
        </div>
    );
}
