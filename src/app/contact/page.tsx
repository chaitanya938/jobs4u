import { createPageMetadata } from "@/lib/seo";
import { SiteFooter } from "@/components/site-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata = createPageMetadata({ title: "Contact", description: "Contact Jobs4U.", path: "/contact" });

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="pb-16 pt-8 lg:pt-16 flex-1 bg-white">
                <div className="jobs4u-shell">
                    <div className="mb-10">
                        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]} />
                    </div>

                    <div className="max-w-3xl mx-auto text-center mb-16 px-4">
                        <div className="inline-block rounded-full bg-slate-100/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-600 mb-6 ring-1 ring-slate-200">
                            Get In Touch
                        </div>
                        <h1 className="jobs4u-heading text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl mb-6">Let's Connect</h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            Reach out for editorial corrections, partnership discussions, or general queries. We are always here to help you navigate your career journey.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6 lg:gap-8 px-4">
                        {/* Email Card */}
                        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-teal-100 group-hover:text-teal-700 transition-all duration-300 text-teal-600">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">Email Us</h2>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                For support, corrections, or any general inquiries, drop us an email anytime.
                            </p>
                            <a href="mailto:jobs4uwebsite@gmail.com" className="text-lg font-bold text-teal-700 hover:text-teal-800 transition-colors">
                                jobs4uwebsite@gmail.com
                            </a>
                        </div>

                        {/* WhatsApp Card */}
                        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-green-100 group-hover:text-green-700 transition-all duration-300 text-green-600">
                                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">WhatsApp</h2>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Need a faster response? Reach out to us via WhatsApp for quick queries.
                            </p>
                            <a href="https://wa.me/918247660084" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-green-700 hover:text-green-800 transition-colors">
                                +91 8247660084
                            </a>
                        </div>
                    </div>

                    <div className="max-w-4xl mx-auto mt-12 bg-slate-50/50 rounded-2xl p-6 text-center border border-slate-100 text-slate-500 text-sm">
                        <p>For errors, use the report page so the content team can review the issue quickly.</p>
                    </div>
                </div>
            </div>
            <SiteFooter />
        </div>
    );
}

