"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-brand-primary" />
            <span className="text-brand-primary text-xs font-black tracking-[0.4em] uppercase">
              {t("aboutTitle")}
            </span>
            <div className="w-12 h-[2px] bg-brand-primary" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-black text-brand-dark mb-6 tracking-tighter uppercase italic">
            {t("aboutSubtitle")}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Card 1: Fresh Food */}
          <div className="group relative bg-gray-50 p-8 lg:p-12 rounded-[3rem] transition-all duration-500 hover:bg-brand-primary hover:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
               <span className="text-4xl">🥗</span>
            </div>
            <h3 className="text-2xl font-black text-brand-dark mb-6 uppercase transition-colors group-hover:text-white">
              {t("freshFoodTitle")}
            </h3>
            <p className="text-brand-dark/50 font-medium leading-relaxed transition-colors group-hover:text-white/80">
              {t("freshFoodDesc")}
            </p>
            
            {/* Decorative element */}
            <div className="absolute top-12 right-12 text-8xl font-black text-black/[0.03] pointer-events-none group-hover:text-white/15 transition-colors">01</div>
          </div>

          {/* Card 2: Local Staff */}
          <div className="group relative bg-gray-50 p-8 lg:p-12 rounded-[3rem] transition-all duration-500 hover:bg-brand-secondary hover:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.02)] lg:mt-12">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
               <span className="text-4xl">👨‍🍳</span>
            </div>
            <h3 className="text-2xl font-black text-brand-dark mb-6 uppercase transition-colors group-hover:text-white">
              {t("localStaffTitle")}
            </h3>
            <p className="text-brand-dark/50 font-medium leading-relaxed transition-colors group-hover:text-white/80">
              {t("localStaffDesc")}
            </p>

            <div className="absolute top-12 right-12 text-8xl font-black text-black/[0.03] pointer-events-none group-hover:text-white/15 transition-colors">02</div>
          </div>

          {/* Card 3: Authentic Desi */}
          <div className="group relative bg-gray-50 p-8 lg:p-12 rounded-[3rem] transition-all duration-500 hover:bg-brand-dark hover:-translate-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
               <span className="text-4xl">🥘</span>
            </div>
            <h3 className="text-2xl font-black text-brand-dark mb-6 uppercase transition-colors group-hover:text-white">
              {t("desiDiningTitle")}
            </h3>
            <p className="text-brand-dark/50 font-medium leading-relaxed transition-colors group-hover:text-white/80">
              {t("desiDiningDesc")}
            </p>

            <div className="absolute top-12 right-12 text-8xl font-black text-black/[0.03] pointer-events-none group-hover:text-white/15 transition-colors">03</div>
          </div>

        </div>

        {/* Bottom Banner Image Section */}
        <div className="mt-24 lg:mt-32 relative h-[500px] lg:h-[600px] rounded-[4rem] overflow-hidden group shadow-2xl">
          <Image 
            src="/images/home/promo/promo_karahi.jpg" 
            alt="Authentic Dining" 
            fill 
            className="object-cover transition-transform duration-[10000ms] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-12 left-6 lg:left-12 lg:bottom-20 max-w-2xl">
             <h4 className="text-3xl lg:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
               {t("brandName")}
             </h4>
             <p className="text-white/60 font-medium text-lg lg:text-xl leading-relaxed">
                Where every meal tells a story of tradition, passion, and the finest local flavors.
             </p>
          </div>
        </div>

      </div>
    </section>
  );
}
