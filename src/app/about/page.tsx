import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ title: "About", description: "Learn about Jobs4U.", path: "/about" });

export default function AboutPage() {
    return (
        <div className="pb-16 pt-8 lg:pt-10">
            <div className="jobs4u-shell space-y-8">
                <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="max-w-2xl py-4">
                        <div className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-700 mb-6">
                            Our Purpose
                        </div>
                        <h1 className="jobs4u-heading text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl mb-8 leading-[1.15]">
                            Empowering your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">career journey</span>
                        </h1>
                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                Jobs4U is a professional Indian career platform dedicated to providing verified job information,
                                interview guidance, and practical preparation resources. Our mission is to help job seekers navigate
                                their career paths with confidence and clarity.
                            </p>
                            <p>
                                We publish genuine job listings, referral notes, detailed interview experiences, essential programming questions,
                                and comprehensive career guides. By offering these resources, we aim to equip candidates with the knowledge and
                                tools necessary to succeed in today's competitive job market.
                            </p>
                            <p>
                                As a platform, our priority is transparency and authenticity. We direct users straight to official or external
                                application websites and never pretend to be the employer unless we are directly hiring. Our goal is solely
                                to connect you with legitimate opportunities and provide the support you need to secure them.
                            </p>
                        </div>
                    </div>

                    <div className="relative h-[400px] sm:h-[500px] lg:h-[650px] w-full rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5 group">
                        <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                            alt="Diverse team of professionals working together"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-900/20 to-transparent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-75"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
