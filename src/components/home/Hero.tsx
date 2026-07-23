"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroItems = [
  {
    name: "Chicken Pulao",
    image: "/chickenpulao.webp",
    title: "Premium Pulao,",
    highlight: "Served Fresh",
    description: "Fragrant rice cooked with rich desi spices, tender flavor, and the comforting taste of home.",
  },
  {
    name: "Chicken Nuggets",
    image: "/chickennuggets.webp",
    title: "Crispy Nuggets,",
    highlight: "Made Golden",
    description: "Crunchy bites with a soft, juicy center, made for quick cravings and family snack moments.",
  },
  {
    name: "Dahi Bhallay",
    image: "/dahibhallay.webp",
    title: "Dahi Bhallay,",
    highlight: "Cool & Tangy",
    description: "Soft bhallay topped with creamy yogurt, chutney, and masala for a refreshing street-style treat.",
  },
  {
    name: "Dal Rice",
    image: "/dalrice.webp",
    title: "Dal Rice,",
    highlight: "Comfort Classic",
    description: "Slow-cooked lentils served with fluffy rice for a warm, homestyle plate full of familiar flavor.",
  },
  {
    name: "Seekh Kabab",
    image: "/seekhkabab.webp",
    title: "Juicy Kabab,",
    highlight: "Grilled Perfect",
    description: "Smoky, tender kababs seasoned with classic spices and cooked for a rich, memorable bite.",
  },
  {
    name: "Spring Rolls",
    image: "/springrolls.webp",
    title: "Spring Rolls,",
    highlight: "Crisp & Fresh",
    description: "Golden rolls with a savory filling, served crisp for snack cravings and shared family plates.",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % heroItems.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const item = heroItems[currentIndex];

  return (
    <section className="relative flex min-h-[calc(100svh-80px)] items-center overflow-x-hidden bg-[#fbf7f2] pb-5 pt-[5.7rem] sm:min-h-[520px] sm:pb-7 sm:pt-[6.55rem] lg:min-h-[500px] lg:pb-4 lg:pt-[6.2rem] 2xl:min-h-[620px] 2xl:pt-[6.9rem] [@media(min-width:2200px)]:min-h-[720px]">
      <div className="site-container flex flex-col items-center gap-3 sm:gap-4">
        {/* Thumbnail previews removed per user request */}

        <div className="flex w-full flex-col items-center gap-3 lg:flex-row lg:gap-7 2xl:gap-12 [@media(min-width:2200px)]:gap-16">
          <div className="relative z-10 max-w-3xl space-y-2 text-center sm:space-y-3 lg:w-1/2 lg:text-left 2xl:max-w-4xl">
            <div className="inline-flex flex-col items-center lg:items-start">
              <p lang="ur" dir="rtl" className="font-ama-dhaba text-[clamp(34px,9vw,52px)] font-black leading-none text-brand-primary lg:text-[clamp(54px,3.8vw,68px)] [@media(min-width:2200px)]:text-[76px]">
                اماں جی کا ڈھابہ
              </p>
            </div>

            <div key={item.name} className="animate-hero-copy-fade space-y-2 sm:space-y-3">
              <h1 className="text-[clamp(2.1rem,8.5vw,3.25rem)] font-extrabold leading-[1.06] text-brand-dark lg:text-[clamp(3rem,4vw,4.15rem)] [@media(min-width:2200px)]:text-[5rem]">
                {item.title} <span className="text-brand-primary">{item.highlight}</span>
              </h1>

              <p className="mx-auto max-w-2xl text-sm font-semibold leading-relaxed text-brand-dark sm:text-lg lg:mx-0 2xl:max-w-3xl 2xl:text-xl [@media(min-width:2200px)]:text-2xl">
                {item.description}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
              <Link
                href="/menu"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-brand-primary px-7 text-sm font-bold text-white no-underline shadow-[0_10px_22px_rgba(248,114,5,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:shadow-[0_14px_28px_rgba(248,114,5,0.28)]"
              >
                Order Now
              </Link>
            </div>
          </div>

          <div className="relative z-10 flex w-full justify-center lg:w-1/2 lg:justify-end">
            <div className="relative grid aspect-square w-[min(74vw,290px)] place-items-center sm:w-[min(46vw,360px)] lg:w-[min(30vw,420px)] 2xl:w-[min(27vw,560px)] [@media(min-width:2200px)]:w-[min(24vw,680px)]">
              <div key={item.image} className="animate-hero-copy-fade relative aspect-square w-full max-w-full">
                <HeroProductImage src={item.image} alt={item.name} priority={currentIndex === 0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroProductImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 grid place-items-center p-[4%]">
      <div className="relative aspect-square h-full w-full max-h-full max-w-full shrink-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div className="absolute inset-[8%] rounded-full bg-white shadow-[0_28px_60px_rgba(17,24,39,0.14)]" />
        <div className="absolute inset-[13%] rounded-full border border-brand-primary/10 bg-[#fff8ef]" />
        <div className="absolute inset-[20%] rounded-full border border-brand-primary/10 bg-white" />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 74vw, (max-width: 1024px) 46vw, (max-width: 1536px) 30vw, 480px"
          className="h-full w-full object-contain object-center !m-0 !border-0 !bg-transparent !p-[13%] !outline-none !ring-0"
          priority={priority}
          unoptimized
        />
      </div>
    </div>
  );
}
