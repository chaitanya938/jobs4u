import Link from "next/link";
import { AdSlotBetweenJobs, AdSlotBottom, AdSlotInContent, AdSlotTop } from "@/components/ad-slot";
import { CompanyCard, ContentCard, EmptyState, JobCard, QuestionCard, SectionHeading, StatCard } from "@/components/cards";
import { ShellContainer, HeroSection } from "@/components/site-shell";
import { companies, getLatestItems, interviewExperiences, preparationGuides, programmingQuestions, referralOpportunities, resumeResources } from "@/lib/site-data";
import { fetchActiveJobs } from "@/lib/jobs-store";

export default async function Home() {
  const activeJobs = await fetchActiveJobs();
  const latestJobs = activeJobs.slice(0, 6);
  const fresherJobs = activeJobs.filter((job) => job.categories.includes("Fresher") || /fresher/i.test(job.experience)).slice(0, 4);
  const remoteJobs = activeJobs.filter((job) => job.categories.includes("Remote") || job.workMode.toLowerCase().includes("remote")).slice(0, 4);
  const experiencedJobs = activeJobs.filter((job) => job.categories.includes("Experienced") || /\d/.test(job.experience)).slice(0, 4);

  return (
    <div className="pb-16 pt-8 lg:pt-10">
      <ShellContainer className="space-y-10 lg:space-y-14">
        <HeroSection />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Latest Jobs" value={String(latestJobs.length)} note="Active opportunities in the last few days" />
          <StatCard label="Resources" value={String(resumeResources.length + preparationGuides.length)} note="Resume and preparation content" />
          <StatCard label="Interview Posts" value={String(interviewExperiences.length)} note="Original interview experiences" />
          <StatCard label="Companies" value={String(companies.length)} note="Company pages and hiring processes" />
        </section>

        <AdSlotTop />

        <section className="space-y-6">
          <SectionHeading
            eyebrow="Latest Jobs"
            title="Newest opportunities first"
            description="Sorts active jobs by recency and keeps expired opportunities out of the live listings."
            action={
              <Link href="/fresher-jobs" className="jobs4u-focus rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                View Fresher Jobs
              </Link>
            }
          />
          {latestJobs.length ? (
            <div className="grid gap-3 grid-cols-1">
              {latestJobs.map((job) => (
                <JobCard key={job.slug} job={job} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No active jobs yet"
              description="Connect the admin panel or Supabase data source to publish verified opportunities. The site shell, filters and detail pages are already in place."
            />
          )}
        </section>

        <AdSlotInContent />

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionHeading eyebrow="Fresher Jobs" title="Recent fresher opportunities" description="Jobs for students and recent graduates." />
            <div className="grid gap-3 grid-cols-1">
              {fresherJobs.length ? fresherJobs.map((job) => <JobCard key={job.slug} job={job} />) : <EmptyState title="No fresher jobs" description="Add verified fresher jobs from the admin dashboard." />}
            </div>
          </div>
          <div className="space-y-6">
            <SectionHeading eyebrow="Remote Jobs" title="Remote and work-from-home roles" description="Focused on distributed and flexible opportunities." />
            <div className="grid gap-3 grid-cols-1">
              {remoteJobs.length ? remoteJobs.map((job) => <JobCard key={job.slug} job={job} />) : <EmptyState title="No remote jobs" description="Connect live job records to populate this section." />}
            </div>
          </div>
        </section>

        <AdSlotBetweenJobs />

        <section className="space-y-6">
          <SectionHeading eyebrow="Experienced Jobs" title="Roles for experienced professionals" description="Senior, product and specialist opportunities." />
          <div className="grid gap-3 grid-cols-1">
            {experiencedJobs.length ? experiencedJobs.map((job) => <JobCard key={job.slug} job={job} />) : <EmptyState title="No experienced jobs" description="Add live opportunities from the admin side to populate this area." />}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Referrals" title="Latest referral opportunities" description="Referral posts should clearly identify what is known and what still needs verification." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {referralOpportunities.map((item) => (
              <ContentCard key={item.slug} href={`/referrals/${item.slug}`} title={item.role} summary={item.referralInfo} eyebrow={item.companySlug} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Interview Experiences" title="Recent interview experiences" description="Original, practical notes from real hiring conversations." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {interviewExperiences.map((item) => (
              <ContentCard key={item.slug} href={`/interview/${item.slug}`} title={item.role} summary={item.summary} eyebrow={item.companySlug} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Programming Questions" title="Popular interview questions" description="A concise mix of coding, SQL and CS fundamentals." />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {programmingQuestions.map((question) => (
              <QuestionCard key={question.slug} question={question} href={`/questions/${question.slug}`} />
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionHeading eyebrow="Resume Resources" title="Original resume guidance" description="Practical, ATS-friendly advice for students and professionals." />
            <div className="grid gap-5 md:grid-cols-2">
              {getLatestItems(resumeResources, 4).map((item) => (
                <ContentCard key={item.slug} href={`/resume/${item.slug}`} title={item.title} summary={item.summary} />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <SectionHeading eyebrow="Preparation Guides" title="Focused preparation plans" description="Build a strong routine for aptitude, coding and interviews." />
            <div className="grid gap-5 md:grid-cols-2">
              {preparationGuides.map((item) => (
                <ContentCard key={item.slug} href={`/preparation#${item.slug}`} title={item.title} summary={item.summary} />
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <SectionHeading eyebrow="Popular Companies" title="Company pages and hiring process links" description="Each company page can host hiring processes, related jobs and interview content." />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>
        </section>

        <AdSlotBottom />
      </ShellContainer>
    </div>
  );
}

