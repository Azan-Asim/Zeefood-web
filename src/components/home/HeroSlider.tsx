"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSlider() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      badge: t("orderOnline"),
      title: t("heroTitle1"),
      desc: t("heroDesc1"),
      cta: t("orderNow"),
      link: "/order",
      image: "/images/home/promo/promo_delivery.jpg",
      type: "image",
    },
    {
      id: 2,
      badge: t("familySize"),
      title: t("heroTitle2"),
      desc: t("heroDesc2"),
      cta: t("viewMenu"),
      link: "/product/nawabi-chicken-biryani",
      image: "/images/home/promo/promo_biryani.jpg",
      type: "image",
    },
    {
      id: 3,
      badge: t("chefSpecial"),
      title: t("heroTitle3"),
      desc: t("heroDesc3"),
      cta: t("explore"),
      link: "/product/special-mutton-karahi",
      image: "/images/home/promo/promo_karahi.jpg",
      type: "image",
    },
    {
      id: 4,
      badge: t("frozenRange"),
      title: t("heroTitle4"),
      desc: t("heroDesc4"),
      cta: t("shopFrozen"),
      link: "/menu",
      image: "/images/home/promo/promo_frozen.jpg",
      type: "image",
    },
    {
      id: 5,
      badge: t("cravingSomething"),
      title: t("heroTitle5"),
      desc: t("heroDesc5"),
      cta: t("bookNow"),
      link: "/order",
      image: "", // CSS based
      type: "brand",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-brand-dark">
      {/* Slide Transition Wrapper */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          // Logic to split English and Urdu titles
          const parts = slide.title.split('\n');
          const urduPart = parts.find(p => p.includes('('));
          const englishParts = parts.filter(p => !p.includes('('));

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Background Image/Style */}
              <div className="absolute inset-0">
                {slide.type === "image" ? (
                  <>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className={`object-cover transition-transform duration-[8000ms] ease-linear ${
                        index === current ? "scale-110 translate-x-4" : "scale-100 translate-x-0"
                      }`}
                      priority={index === 0}
                      unoptimized
                    />
                    {/* Dynamic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/50 to-transparent" />
                    <div className="absolute inset-0 bg-black/20" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-[#b0222e]">
                     {/* Decorative diagonal bars matching PromoBanners */}
                    <div className="absolute right-0 top-0 bottom-0 flex gap-4 opacity-10 pointer-events-none pr-24">
                      {[0,1,2,3,4,5].map(i => (
                        <div key={i} className="w-16 bg-white skew-x-[-15deg]" />
                      ))}
                    </div>
                    <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="relative h-full flex flex-col justify-center items-start px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full pt-28">
                <div className={`transition-all duration-1000 delay-300 transform ${
                  index === current ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}>
                  {/* Badge */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-[2px] bg-brand-primary" />
                    <span className="text-white text-[10px] md:text-xs font-black tracking-[0.3em] uppercase bg-brand-primary/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                      {slide.badge}
                    </span>
                  </div>

                  {/* Headline */}
                  <div className="mb-8 max-w-4xl">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter uppercase italic whitespace-pre-line mb-4">
                      {englishParts.join('\n').split(' ').map((word, i) => (
                        <span key={i} className={i % 2 !== 0 && slide.type === 'image' ? "text-stroke-secondary" : ""}>
                          {word}{" "}
                        </span>
                      ))}
                    </h1>
                    {urduPart && (
                      <div className="text-xl md:text-3xl lg:text-4xl font-bold text-brand-secondary opacity-90 tracking-tight font-urdu">
                        {urduPart}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-xl text-white/70 font-medium max-w-lg mb-10 leading-relaxed border-l-4 border-brand-primary/50 pl-6">
                    {slide.desc}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="flex items-center gap-8">
                    <Link 
                      href={slide.link}
                      className="group relative inline-flex items-center gap-4 bg-brand-primary px-10 py-5 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(230,57,70,0.4)] transition-all duration-500 hover:scale-105 active:scale-95"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative z-10 text-white font-black uppercase tracking-[0.2em] text-xs">
                        {slide.cta}
                      </span>
                      <svg className="w-5 h-5 text-white relative z-10 transition-transform duration-500 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>

                    <div className="hidden md:flex flex-col">
                      <span className="text-[10px] font-black text-brand-primary tracking-widest uppercase">Available Now</span>
                      <span className="text-sm font-bold text-white/50">30 Min Delivery Guaranteed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-3 animate-bounce-slow">
        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Background Ambient Effects */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-secondary/5 blur-[150px] pointer-events-none" />
    </section>
  );
}
