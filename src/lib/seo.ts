import type { Metadata } from "next";

export function createPageMetadata({
    title,
    description,
    path,
    image = "/og/jobs4u.png",
}: {
    title: string;
    description: string;
    path: string;
    image?: string;
}): Metadata {
    return {
        title,
        description,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title,
            description,
            url: `https://jobs4u.in${path}`,
            siteName: "Jobs4U",
            type: "website",
            images: [image],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    };
}
