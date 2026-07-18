import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Careers — ZeeFood Premium" };

export default function CareersPage() {
  return (
    <PremiumContentPage 
      label="Join Us" 
      title1="Build Your Career" 
      title2="" 
      description="Join the ZeeFood family! We are looking for passionate chefs, dedicated kitchen staff, and swift delivery riders."
    >
      <div className="space-y-16">
        <section>
          <h2 className="text-3xl lg:text-4xl font-black mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Why Work At ZeeFood?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Growth", desc: "Fast-track your career in a rapidly expanding brand." },
              { title: "Innovation", desc: "Work with cutting-edge kitchen and delivery tech." },
              { title: "Culture", desc: "A family-first environment built on mutual respect." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[24px] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                <h4 className="text-brand-primary font-black text-xl mb-3">{feature.title}</h4>
                <p className="text-brand-dark/70 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xl leading-relaxed text-brand-dark/80 mt-12">
            ZeeFood is Pakistan&apos;s premier destination for authentic, high-quality desi cuisine. Our kitchen is the beating heart of our brand, where tradition meets culinary excellence. Whether you are an expert chef, a line cook, or a delivery rider, you play a vital role in the ZeeFood experience.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-black mb-8 text-brand-dark uppercase tracking-[0.2em] text-sm opacity-60">Open Positions</h2>
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Executive Head Chef", loc: "Lahore, PK • Full Time" },
              { title: "Kitchen Line Cook", loc: "Lahore, PK • Full Time / Shift" },
              { title: "Delivery Fleet Rider", loc: "Lahore, PK • Flexible" },
              { title: "Restaurant Outlet Manager", loc: "Lahore, PK • Full Time" }
            ].map((job, i) => (
              <Link 
                key={i}
                href="/contact" 
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-8 bg-white border border-black/5 rounded-[32px] hover:border-brand-primary/30 hover:shadow-xl transition-all group"
              >
                <div>
                  <h4 className="font-black text-brand-dark text-2xl group-hover:text-brand-primary transition-colors">{job.title}</h4>
                  <p className="text-brand-dark/60 text-lg mt-1 font-bold italic">{job.loc}</p>
                </div>
                <div className="flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest text-xs mt-6 sm:mt-0">
                  Apply Now
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-20 p-10 bg-[#F8FAFC] rounded-[40px] border border-brand-primary/10 text-center">
          <h3 className="text-2xl font-black text-brand-primary mb-3">Don&apos;t see a fit?</h3>
          <p className="text-brand-dark/80 font-bold text-lg m-0">
            We are always hiring great talent! Drop your resume at <strong className="text-brand-dark underline decoration-brand-primary underline-offset-4">jobs@zeefood.pk</strong>
          </p>
        </div>
      </div>
    </PremiumContentPage>
  );
}
