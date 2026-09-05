import Link from "next/link";

export function Breadcrumbs({
    items,
}: {
    items: { label: string; href?: string }[];
}) {
    return (
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            {items.map((item, index) => (
                <span key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="jobs4u-focus hover:text-teal-800">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-slate-700">{item.label}</span>
                    )}
                    {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
                </span>
            ))}
        </nav>
    );
}
