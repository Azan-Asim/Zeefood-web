import PremiumContentPage from "@/components/common/PremiumContentPage";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Track Order — ZeeFood Premium" };

export default function TrackOrderPage() {
  return (
    <PremiumContentPage 
      label="Delivery" 
      title1="Track Your" 
      title2="Order" 
      description="Enter your order ID to see real-time updates on your premium meal's preparation and delivery status."
    >
      <div className="max-w-2xl mx-auto py-10">
        <section className="bg-white p-12 rounded-[48px] border border-black/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-primary/10 to-transparent rounded-full -mr-24 -mt-24" />
          
          <div className="flex flex-col gap-8 relative z-10">
            <label className="font-black text-brand-dark uppercase tracking-[0.3em] text-xs opacity-40">Order tracking ID</label>
            <div className="flex flex-col sm:flex-row gap-5">
              <input 
                type="text" 
                placeholder="e.g. ZF-9824" 
                className="flex-1 bg-[#fdf8f5] border-2 border-transparent rounded-[24px] px-8 py-5 text-2xl font-black text-brand-dark focus:outline-none focus:border-brand-primary focus:bg-white transition-all placeholder:text-brand-dark/20 shadow-inner"
              />
              <button className="px-12 py-5 bg-brand-dark text-white font-black uppercase tracking-[0.2em] text-sm rounded-[24px] hover:bg-brand-primary transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(230,57,70,0.3)] hover:-translate-y-1">
                Track
              </button>
            </div>
            <p className="text-sm text-brand-dark/40 font-bold italic">
              * Found in your confirmation email or SMS.
            </p>
          </div>
        </section>

        <div className="mt-24 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 mb-10">
            <div className="absolute inset-0 bg-brand-primary/10 rounded-full animate-ping opacity-30" />
            <div className="absolute inset-6 bg-brand-primary/20 rounded-full" />
            <div className="relative w-full h-full bg-white rounded-full border border-black/5 shadow-2xl flex items-center justify-center text-6xl">
              📍
            </div>
          </div>
          <h4 className="font-black text-brand-dark text-4xl mb-4">Live Tracking</h4>
          <p className="text-brand-dark/60 text-xl max-w-md mx-auto leading-relaxed font-bold italic">
            Enter your Order ID above to see the live map and real-time courier location.
          </p>
        </div>
      </div>
    </PremiumContentPage>
  );
}
