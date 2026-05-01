import Navbar from "@/components/common/Navbar";
import Hero from "@/components/home/Hero";
import ExploreMenu from "@/components/home/ExploreMenu";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-dark relative overflow-x-hidden">
      <Navbar />
      <Hero />
      
      {/* Reorder Button Section */}
      <section className="w-full bg-brand-light flex justify-center py-12 relative z-30 rounded-t-[3rem] -mt-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <button className="w-full max-w-[800px] mx-6 bg-brand-primary hover:bg-[#b0222e] text-brand-white py-4 lg:py-5 rounded-2xl font-black text-sm lg:text-base tracking-[0.2em] uppercase transition-all shadow-[0_15px_30px_rgba(230,57,70,0.3)] hover:-translate-y-1">
          REORDER YOUR FAVORITES
        </button>
      </section>

      <ExploreMenu />
      
    </main>
  );
}
