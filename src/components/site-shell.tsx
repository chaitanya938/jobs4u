"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerSections, navLinks, adminNavLinks } from "@/lib/site-data";

export function ShellContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`jobs4u-shell ${className}`}>{children}</div>;
}

export function SiteHeader() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 border-b border-black bg-white">
            <ShellContainer>
                <div className="flex flex-col sm:flex-row flex-wrap items-center sm:justify-between py-3 gap-y-4 sm:gap-4 lg:h-20 lg:py-0">
                    <Link href="/fresher-jobs" className="jobs4u-focus jobs4u-heading flex items-center gap-3 text-lg font-bold text-black shrink-0">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)", border: "none" }}>J4</span>
                        <span>Jobs4U</span>
                    </Link>

                    <nav className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end lg:ml-8 lg:justify-start lg:gap-1">
                        {(pathname.startsWith("/admin") ? adminNavLinks : navLinks).map((link) => (
                            <Link key={link.href} href={link.href} className={`jobs4u-focus rounded-3xl sm:rounded-full px-3 py-2 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-semibold transition shadow-sm text-center leading-tight whitespace-normal inline-flex items-center justify-center max-w-[110px] sm:max-w-none ${pathname === link.href ? "border border-transparent bg-green-600 text-white" : "border border-transparent text-slate-900 hover:opacity-90 hover:scale-105"}`} style={pathname === link.href ? {} : { background: "linear-gradient(135deg, #fdba74 0%, #f9a8d4 100%)" }}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </ShellContainer>
        </header>
    );
}

export function SiteFooter() {
    const socialLinks = {
        linkedin: "https://linkedin.com",
        telegram: "https://t.me",
        whatsapp: "https://wa.me/918247660084",
        instagram: "https://instagram.com",
        youtube: "https://youtube.com"
    };

    return (
        <footer className="relative mt-20 bg-[#1f1f1f] text-white">
            {/* Wave top edge */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 lg:h-12">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#1f1f1f" />
                </svg>
            </div>

            <ShellContainer className="py-12 lg:py-16">
                {/* 2-column footer grid */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
                    {/* LEFT column: Brand + Social */}
                    <div className="space-y-8">
                        {/* Brand */}
                        <div>
                            <Link href="/fresher-jobs" className="jobs4u-heading text-2xl font-bold text-white">Jobs4U</Link>
                            <p className="mt-4 text-sm leading-6 text-gray-300">
                                Jobs4U provides the latest genuine job opportunities, referrals, resume resources, interview experiences, and career preparation guides for students, freshers and professionals.
                            </p>
                        </div>

                        {/* Follow Us */}
                        <div>
                            <h3 className="text-base font-bold text-white mb-4">Follow Us</h3>
                            <div className="mt-2 text-gray-300">
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="text-2xl">📢</div>
                                    <div>
                                        <p className="font-semibold text-white text-sm">Follow Jobs4U</p>
                                        <p className="text-xs text-gray-400 mt-1">Get the latest job updates and career opportunities.</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    {socialLinks.whatsapp && (
                                        <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded bg-[#25d366] hover:bg-[#1da851] transition-colors">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </a>
                                    )}
                                    {socialLinks.instagram && (
                                        <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:opacity-90 transition-opacity">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT column: Categories + Quick Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Categories */}
                        <div>
                            <h3 className="text-base font-bold text-white mb-4">Categories</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li><Link href="/fresher-jobs" className="hover:text-white transition-colors">Fresher Jobs</Link></li>
                                <li><Link href="/remote-jobs" className="hover:text-white transition-colors">Remote Jobs</Link></li>
                                <li><Link href="/experienced-jobs" className="hover:text-white transition-colors">Experienced Jobs</Link></li>
                                <li><Link href="/referrals" className="hover:text-white transition-colors">Referrals</Link></li>
                                <li><Link href="/resume" className="hover:text-white transition-colors">Resume Preparation Guide</Link></li>
                                <li><Link href="/interview" className="hover:text-white transition-colors">Interview & Questions</Link></li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-base font-bold text-white mb-4">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-gray-300">
                                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                                <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
                                <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                                <li><Link href="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 lg:mt-16 border-t border-gray-700 pt-8">
                    <div className="text-center text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} Jobs4U. All rights reserved.</p>
                    </div>
                </div>
            </ShellContainer>
        </footer>
    );
}

export function HeroSection() {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-black bg-white p-6 sm:p-8 lg:p-10">
            <div className="relative grid gap-8 lg:grid-cols-[1.25fr,0.75fr] lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black">Jobs4U</p>
                    <h1 className="jobs4u-heading mt-3 max-w-3xl text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">Find Your Next Opportunity</h1>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-black sm:text-lg">Latest jobs, referrals, interview experiences and career resources for students, freshers and professionals.</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/fresher-jobs" className="jobs4u-focus rounded-full px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 shadow-md" style={{ background: "linear-gradient(135deg, #f97316 0%, #ec4899 100%)" }}>
                            Browse Fresher Jobs
                        </Link>
                        <Link href="/interview" className="jobs4u-focus rounded-full border border-black bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-slate-50">
                            Interview Questions
                        </Link>
                    </div>
                </div>

                <div className="border border-black bg-white p-5 sm:p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black">Popular categories</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {[["Fresher Jobs", "/fresher-jobs"], ["Remote Jobs", "/remote-jobs"], ["Experienced Jobs", "/experienced-jobs"], ["Resume Resources", "/resume"], ["Interview Questions", "/interview"], ["Hiring Processes", "/hiring-process"]].map(([label, href]) => (
                            <Link key={href} href={href} className="jobs4u-focus rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-medium text-slate-700 transition hover:text-white hover:border-transparent" onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #f97316 0%, #ec4899 100%)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = ""}>
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
