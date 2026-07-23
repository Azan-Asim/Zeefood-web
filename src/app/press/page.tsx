import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Press & Media — ZeeFood Premium" };

export default function PressPage() {
  return (
    <PremiumContentPage 
      label="News" 
      title1="Press & Media" 
      title2="" 
      description="Latest news, announcements, and media resources from the ZeeFood PR team."
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-3xl lg:text-4xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Latest Announcements</span>
          </h2>
          <div className="space-y-8">
            {[
              { date: "May 2026", title: "ZeeFood launches premium nationwide delivery", desc: "Expanding our fleet to ensure ultra-fast, premium food delivery across all major cities in Pakistan." },
              { date: "March 2026", title: "New 'Elite Deals' break sales records", desc: "Our newly introduced premium combos have set a new industry benchmark for quality and value." }
            ].map((news, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-4 py-1.5 bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-[0.2em] rounded-full">{news.date}</span>
                  <div className="flex-1 h-px bg-black/5" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-black text-brand-dark group-hover:text-brand-primary transition-colors leading-tight">
                  {news.title}
                </h3>
                <p className="text-brand-dark/70 mt-4 leading-relaxed text-lg font-medium">
                  {news.desc}
                </p>
                <div className="mt-6 flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2">
                  Read Full Story
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 p-6 sm:p-8 bg-white border-2 border-dashed border-brand-primary/20 rounded-[32px] flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-brand-primary/5 rounded-[24px] flex items-center justify-center text-4xl shrink-0">
            📰
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-brand-dark mb-3">Media Inquiries</h3>
            <p className="text-brand-dark/70 m-0 font-bold text-lg leading-relaxed">
              For all press and media related inquiries, please reach out to our dedicated PR team at <strong className="text-brand-primary underline decoration-brand-primary/30 underline-offset-8">press@zeefood.pk</strong>.
            </p>
          </div>
        </div>
      </div>
    </PremiumContentPage>
  );
}
