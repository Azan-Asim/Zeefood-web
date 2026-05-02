"use client";
import Image from "next/image";

const eliteDeals = [
  {
    id: 1,
    title: "The Royal Biryani Deal",
    description: "Nawabi Chicken Biryani paired with fresh raita, salad, and a 1.5L drink.",
    price: "Rs 1,499",
    originalPrice: "Rs 1,800",
    badge: "SAVE 15%",
    image: "/images/home/desi/biryani_transparent.png",
    bgAccent: "bg-orange-50/50",
  },
  {
    id: 2,
    title: "Karahi Family Feast",
    description: "Full Mutton Karahi, 4 fresh roghni naans, and mint chutney for the family.",
    price: "Rs 3,199",
    originalPrice: "Rs 3,800",
    badge: "SAVE 20%",
    image: "/images/home/desi/karahi_transparent.png",
    bgAccent: "bg-red-50/50",
  },
  {
    id: 3,
    title: "Sizzling Kebab Platter",
    description: "12 pieces of export-grade beef seekh kebabs ready to grill or serve.",
    price: "Rs 1,299",
    originalPrice: "Rs 1,600",
    badge: "HOT DEAL",
    image: "/images/home/desi/kebab_transparent.png",
    bgAccent: "bg-amber-50/50",
  },
  {
    id: 4,
    title: "Weekend Nihari Special",
    description: "Rich bone marrow Beef Nihari, served with crispy tandoori naans.",
    price: "Rs 1,899",
    originalPrice: "Rs 2,200",
    badge: "WEEKEND ONLY",
    image: "/images/home/desi/nihari_transparent.png",
    bgAccent: "bg-yellow-50/50",
  }
];

export default function TopDeals() {
  return (
    <section className="bg-[#fcfdfd] pt-12 pb-24 w-full relative z-10 overflow-hidden">
      
      {/* Premium Light Background Elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-brand-light to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Ultra-Premium Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-full bg-white border border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.05)] mb-8 transition-transform hover:scale-105">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
            </span>
            <span className="text-brand-dark/80 text-xs font-black tracking-[0.2em] uppercase">Limited Time</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase font-sans leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm pr-4 pb-2">
            Top Deals
          </h2>
          <p className="text-brand-dark/60 font-medium max-w-xl text-lg mt-8">
            Curated combos and family feasts at unbeatable prices. Elevate your dining experience today.
          </p>
        </div>

        {/* 4-Card Premium Grid (Horizontal layout on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {eliteDeals.map((deal, index) => (
            <div 
              key={deal.id}
              className="group relative flex flex-col sm:flex-row items-center bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-gray-100 transition-all duration-700 hover:-translate-y-2 overflow-hidden"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Soft Ambient Background for the card */}
              <div className={`absolute inset-0 ${deal.bgAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              {/* Image Area (Left on desktop, Top on mobile) */}
              <div className="relative w-full sm:w-[45%] h-[260px] flex items-center justify-center mb-8 sm:mb-0 shrink-0">
                
                {/* The Food Image (Circular & Auto-Fitting) */}
                <div className="relative w-52 h-52 z-10 group-hover:-translate-y-4 group-hover:scale-[1.1] transition-all duration-700 ease-out flex justify-center items-center rounded-full overflow-hidden bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-[6px] border-white/80 group-hover:shadow-[0_20px_60px_rgba(230,57,70,0.25)]">
                  <Image 
                    src={deal.image} 
                    alt={deal.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                </div>
              </div>

              {/* Content Area (Right on desktop, Bottom on mobile) */}
              <div className="relative w-full sm:w-[55%] flex flex-col justify-center pl-0 sm:pl-8 z-20">
                
                {/* Discount Badge */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-brand-light text-brand-primary text-[10px] font-black tracking-widest uppercase border border-brand-primary/10 shadow-sm">
                    {deal.badge}
                  </span>
                </div>

                <h3 className="text-[1.35rem] font-black text-brand-dark mb-3 leading-tight group-hover:text-brand-primary transition-colors duration-300">
                  {deal.title}
                </h3>
                
                <p className="text-[0.9rem] font-medium text-brand-dark/60 leading-relaxed mb-6">
                  {deal.description}
                </p>
                
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-black" style={{ color: '#F87205' }}>{deal.price}</span>
                  <span className="text-sm font-bold text-brand-dark/40 line-through">{deal.originalPrice}</span>
                </div>
                
                {/* Premium Button */}
                <button className="w-full relative py-4 bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden group/btn hover:border-transparent transition-all duration-500 shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-[#b0222e] translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10 text-brand-dark font-black uppercase tracking-widest text-[11px] group-hover/btn:text-white transition-colors duration-300">
                    Add To Cart
                  </span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
