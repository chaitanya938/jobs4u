import { AdSlotBetweenJobs, AdSlotBottom, AdSlotInContent, AdSlotTop } from "@/components/ad-slot";
import { CompanyCard, ContentCard, EmptyState, JobCard, QuestionCard, SectionHeading } from "@/components/cards";
import { ShellContainer } from "@/components/site-shell";
import { companies, formatDate, getLatestItems, interviewExperiences, preparationGuides, programmingQuestions, referralOpportunities, resumeResources } from "@/lib/site-data";
import { fetchActiveJobs } from "@/lib/jobs-store";

export default async function Home() {
  const activeJobs = await fetchActiveJobs();
  const latestJobs = activeJobs.slice(0, 6);
  const latestJobDate = activeJobs[0]?.postedAt;
  const fresherJobs = activeJobs.filter((job) => job.categories.includes("Fresher") || /fresher/i.test(job.experience)).slice(0, 4);
  const remoteJobs = activeJobs.filter((job) => job.categories.includes("Remote") || job.workMode.toLowerCase().includes("remote")).slice(0, 4);
  const experiencedJobs = activeJobs.filter((job) => job.categories.includes("Experienced") || /\d/.test(job.experience)).slice(0, 4);

  return (
    <div className="pb-16 pt-2 sm:pt-3">
      <ShellContainer className="home-shell space-y-4 lg:space-y-8">
        <AdSlotTop />

        <section className="space-y-4">
          <SectionHeading
            level={1}
            title={<>Latest Job <span className="section-title-accent">Opportunities</span></>}
            description="Handpicked jobs for freshers and professionals"
            action={
              <div className="home-update-pill" aria-label="Current job listing information">
                <span className="home-update-dot" />
                <span>{activeJobs.length} active {activeJobs.length === 1 ? "job" : "jobs"}</span>
                {latestJobDate ? <><span className="home-update-divider" /> <time dateTime={latestJobDate}>Updated {formatDate(latestJobDate)}</time></> : null}
              </div>
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

