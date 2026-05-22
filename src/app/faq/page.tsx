import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQs — ZeeFood Premium" };

export default function FAQPage() {
  return (
    <PremiumContentPage 
      label="Support" 
      title1="Common Questions" 
      title2="" 
      description="Find quick answers to the most frequently asked questions about our food, delivery, and services."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { q: "How fast is the delivery?", a: "We guarantee a 30-45 minute delivery window for all central city locations. Your food arrives hot in our custom thermal packaging." },
          { q: "Are your meats Halal?", a: "Yes, 100% of our meat is strictly certified Halal and sourced from top-tier, export-grade suppliers." },
          { q: "Can I modify my order?", a: "Orders can be modified within the first 3 minutes of placement. After that, preparation begins to ensure fast delivery." },
          { q: "Do you cater for events?", a: "Absolutely! We offer premium catering for weddings, corporate events, and large gatherings. Contact us for a quote." }
        ].map((item, i) => (
          <div key={i} className="p-10 bg-white border border-black/5 rounded-[40px] shadow-sm hover:shadow-lg transition-all group">
            <h3 className="text-2xl font-black text-brand-dark mb-4 group-hover:text-brand-primary transition-colors flex items-start gap-4 leading-tight">
              <span className="text-brand-primary/20 text-5xl font-serif italic -mt-2 shrink-0">Q.</span>
              {item.q}
            </h3>
            <p className="text-brand-dark/70 leading-relaxed pl-12 font-medium text-lg">
              {item.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 p-12 bg-brand-dark rounded-[48px] text-center text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(230,57,70,0.2),transparent)] pointer-events-none" />
        <h3 className="text-3xl font-black mb-4 relative z-10">Still need help?</h3>
        <p className="text-white/70 mb-10 relative z-10 max-w-lg mx-auto text-lg font-medium">
          Our VIP support team is available 24/7. Reach out to us anytime.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-4 px-10 py-4 bg-white text-brand-dark font-black uppercase tracking-widest text-sm rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 relative z-10 shadow-xl">
          Contact Support
        </Link>
      </div>
    </PremiumContentPage>
  );
}
