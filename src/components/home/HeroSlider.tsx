// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
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
    },
    {
      id: 2,
      badge: t("familySize"),
      title: t("heroTitle2"),
      desc: t("heroDesc2"),
      cta: t("viewMenu"),
      link: "/menu",
      image: "/images/home/promo/promo_biryani.jpg",
    },
    // {
    //   id: 3,
    //   badge: t("chefSpecial"),
    //   title: t("heroTitle3"),
    //   desc: t("heroDesc3"),
    //   cta: t("explore"),
    //   link: "/menu",
    //   image: "/images/home/promo/promo_karahi.jpg",
    // },
  ];

  const slide = slides[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080808]">

      {/* Animated Gradient */}
      <div className="absolute ">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-brand-primary/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-20 max-w-[1600px] mx-auto min-h-screen px-6 lg:px-14 flex items-center">

        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* LEFT */}
          <div>

            <span className="text-xs uppercase tracking-[0.4em] text-brand-primary font-black">
              {slide.badge}
            </span>

            <h1 className="mt-6 text-4xl xl:text-6xl font-black text-white leading-[0.9] tracking-[-0.05em]">
              {slide.title}
            </h1>

            <p className="mt-8 text-lg xl:text-xl text-white/60 leading-relaxed max-w-xl">
              {slide.desc}
            </p>

            <div className="flex items-center gap-5 mt-12">

              <Link
                href={slide.link}
                className="group px-9 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all duration-500"
              >
                {slide.cta}
              </Link>

              <button className="w-16 h-16 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/10 transition-all duration-500">
                ▶
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center">

            {/* Main Glass Card */}
            <div className="relative w-auto h-auto max-w-auto aspect-square  rounded-[50px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-3xl">

              <Image
                src={slide.image}
                alt={slide.title}
                width={700}
                height={700}
                className="object-cover scale-105 w-full   h-full"
              />

              <div className="absolute  bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Stats */}
              <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Rating
                </p>

                <h3 className="text-3xl font-black text-white mt-2">
                  4.9 ★
                </h3>
              </div>

              <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl px-6 py-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Delivery
                </p>

                <h3 className="text-3xl font-black text-white mt-2">
                  30 Min
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}