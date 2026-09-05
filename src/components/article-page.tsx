import { Breadcrumbs } from "./breadcrumbs";

export function ArticlePage({
    crumbs,
    eyebrow,
    title,
    summary,
    children,
    meta,
}: {
    crumbs: { label: string; href?: string }[];
    eyebrow: string;
    title: string;
    summary: string;
    children: React.ReactNode;
    meta?: React.ReactNode;
}) {
    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <div className="jobs4u-shell space-y-8">
                <Breadcrumbs items={crumbs} />
                <section className="jobs4u-card rounded-[2rem] p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">{eyebrow}</p>
                    <h1 className="jobs4u-heading mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{summary}</p>
                    {meta ? <div className="mt-6">{meta}</div> : null}
                </section>
                {children}
            </div>
        </div>
    );
}

export function ArticleSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="jobs4u-card rounded-[2rem] p-6 sm:p-8">
            <h2 className="jobs4u-heading text-2xl font-semibold text-slate-950">{title}</h2>
            <div className="jobs4u-prose mt-5 space-y-4">{children}</div>
        </section>
    );
}

export function PillCloud({ items }: { items: string[] }) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {item}
                </span>
            ))}
        </div>
    );
}
