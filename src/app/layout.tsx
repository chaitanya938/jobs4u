import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Jobs4U | Latest Jobs, Referrals, Interview Prep and Resume Resources",
    template: "%s | Jobs4U",
  },
  description:
    "Jobs4U is a fast Indian career platform for latest jobs, fresher opportunities, referrals, interview experiences, preparation guides and resume resources.",
  metadataBase: new URL("https://jobs4u.in"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jobs4U",
    description:
      "Find genuine jobs, referrals, interview content and preparation guides on Jobs4U.",
    url: "https://jobs4u.in",
    siteName: "Jobs4U",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jobs4U",
    description:
      "Find genuine jobs, referrals, interview content and preparation guides on Jobs4U.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-370G928EW8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-370G928EW8', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="min-h-full bg-white text-black">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
