import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Login – Jobs4U",
    description: "Sign in to access the Jobs4U admin panel.",
    robots: { index: false, follow: false },
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
