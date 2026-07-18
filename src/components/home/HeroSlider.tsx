"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSlider() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const slides = useMemo(
    () => [
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
    ],
    [t]
  );

  const slide = slides[current];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-dark">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,114,5,0.18),transparent_35%,rgba(255,255,255,0.04)_70%)]" />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-[1600px] items-center px-4 py-24 sm:px-6 lg:px-14 lg:py-0">
        <div className="grid w-full grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary sm:text-xs">
              {slide.badge}
            </span>

            <h1 className="mt-4 text-3xl font-black leading-[0.95] text-white sm:mt-6 sm:text-4xl xl:text-6xl">
              {slide.title}
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:mt-8 sm:text-lg lg:mx-0 xl:text-xl">
              {slide.desc}
            </p>

            <div className="mt-8 flex items-center justify-center gap-4 sm:mt-12 sm:gap-5 lg:justify-start">
              <Link
                href={slide.link}
                className="rounded-2xl bg-brand-primary px-6 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white no-underline transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(248,114,5,0.35)] sm:px-9 sm:py-5 sm:text-xs"
              >
                {slide.cta}
              </Link>
            </div>
          </div>

          <div className="order-1 flex items-center justify-center lg:order-2">
            <div className="no-cut-image relative aspect-square w-[min(80vw,340px)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:w-[min(70vw,420px)] lg:w-[min(44vw,560px)]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 70vw, 44vw"
                className="object-contain object-center"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              <div className="absolute left-3 top-3 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl sm:left-6 sm:top-6 sm:px-6 sm:py-5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 sm:text-xs">Rating</p>
                <h3 className="mt-1 text-xl font-black text-white sm:mt-2 sm:text-3xl">4.9</h3>
              </div>

              <div className="absolute bottom-3 right-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl sm:bottom-6 sm:right-6 sm:px-6 sm:py-5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 sm:text-xs">Delivery</p>
                <h3 className="mt-1 text-xl font-black text-white sm:mt-2 sm:text-3xl">30 Min</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
