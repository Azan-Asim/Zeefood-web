"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const heroItems = [
  {
    name: "Pulao",
    image: "/plao.png",
    title: "Premium Pulao,",
    highlight: "Served Fresh",
    description: "Fragrant rice cooked with rich desi spices, tender flavor, and the comforting taste of home.",
  },
  {
    name: "Nuggets",
    image: "/nugits.png",
    title: "Crispy Nuggets,",
    highlight: "Made Golden",
    description: "Crunchy bites with a soft, juicy center, made for quick cravings and family snack moments.",
  },
  {
    name: "Roll",
    image: "/roll.png",
    title: "Loaded Rolls,",
    highlight: "Wrapped Right",
    description: "Fresh paratha rolls packed with bold flavor, creamy chutney, and satisfying desi street taste.",
  },
  {
    name: "Kabab",
    image: "/kabab.png",
    title: "Juicy Kabab,",
    highlight: "Grilled Perfect",
    description: "Smoky, tender kababs seasoned with classic spices and cooked for a rich, memorable bite.",
  },
  {
    name: "Dal Haleem",
    image: "/dalhallem.png",
    title: "Dal Haleem,",
    highlight: "Slow Cooked",
    description: "A hearty bowl of lentils, grains, and spices blended into a warm, comforting desi favorite.",
  },
  {
    name: "Dahi Bhala",
    image: "/dahibhala.png",
    title: "Dahi Bhala,",
    highlight: "Cool & Tangy",
    description: "Soft bhallas topped with creamy yogurt, chutney, and masala for a refreshing street-style treat.",
  },
];

const HERO_TRANSITION_MS = 980;

function previewTransform(offset: number) {
  const angleMap: Record<number, number> = {
    [-2]: -62,
    [-1]: -30,
    1: 30,
    2: 62,
  };
  const scaleMap: Record<number, number> = {
    [-2]: 0.78,
    [-1]: 0.94,
    1: 0.94,
    2: 0.78,
  };
  const angle = angleMap[offset] ?? 0;
  const scale = scaleMap[offset] ?? 0.86;

  return `translate(-50%, -50%) rotate(${angle}deg) translateY(-92px) rotate(${-angle}deg) scale(${scale})`;
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  const startTransition = useCallback((nextIndex: number, direction: "left" | "right") => {
    if (isSliding) return;
    if (nextIndex === currentIndex) return;

    setSlideDirection(direction);
    setPreviousIndex(currentIndex);
    setCurrentIndex(nextIndex);
    setIsSliding(true);

    window.setTimeout(() => {
      setIsSliding(false);
      setPreviousIndex(null);
    }, HERO_TRANSITION_MS);
  }, [currentIndex, isSliding]);

  const rotateProduct = useCallback((direction: "left" | "right") => {
    const nextIndex =
      direction === "right"
        ? (currentIndex + 1) % heroItems.length
        : (currentIndex - 1 + heroItems.length) % heroItems.length;

    startTransition(nextIndex, direction);
  }, [currentIndex, startTransition]);

  const rotateToProduct = useCallback((targetIndex: number) => {
    const forwardSteps = (targetIndex - currentIndex + heroItems.length) % heroItems.length;
    const backwardSteps = (currentIndex - targetIndex + heroItems.length) % heroItems.length;
    const direction = forwardSteps <= backwardSteps ? "right" : "left";

    startTransition(targetIndex, direction);
  }, [currentIndex, startTransition]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      rotateProduct("right");
    }, 4800);

    return () => window.clearInterval(interval);
  }, [rotateProduct]);

  const item = heroItems[currentIndex];
  const previousItem = previousIndex !== null ? heroItems[previousIndex] : null;
  const previewItems = [-2, -1, 1, 2].map((offset) => {
    const index = (currentIndex + offset + heroItems.length) % heroItems.length;
    return { ...heroItems[index], index, offset };
  });

  return (
    <section className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden bg-[#fbf7f2] pb-3 pt-[6.25rem] sm:min-h-[520px] sm:pt-[7.5rem] lg:min-h-[520px] lg:pb-0 lg:pt-[7rem] 2xl:min-h-[580px] 2xl:pt-[8rem]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 sm:px-6 lg:flex-row lg:gap-5 lg:px-8 2xl:max-w-[1600px] 2xl:gap-8 2xl:px-10">
        <div className="relative z-10 max-w-3xl space-y-1.5 text-center sm:space-y-2 lg:w-1/2 lg:text-left 2xl:max-w-4xl">
          <div className="inline-flex flex-col items-center lg:items-start">
            <p lang="ur" dir="rtl" className="font-ama-dhaba text-[clamp(38px,10vw,56px)] font-black leading-none text-brand-primary lg:text-[clamp(58px,4vw,74px)]">
              اماں جی کا ڈھابہ
            </p>
          </div>

          <div key={item.name} className="animate-hero-copy-fade space-y-1.5 sm:space-y-2">
            <h1 className="text-[clamp(2.35rem,10vw,3.55rem)] font-extrabold leading-[1.03] text-brand-dark lg:text-[clamp(3.4rem,4.7vw,4.6rem)]">
              {item.title}{" "}
              <span className="text-brand-primary">
                {item.highlight}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-sm font-semibold leading-relaxed text-brand-dark sm:text-lg lg:mx-0 2xl:max-w-3xl 2xl:text-xl">
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
          <div className="relative aspect-[1.08/1] w-[min(88vw,360px)] sm:w-[min(58vw,470px)] lg:w-[min(38vw,540px)] 2xl:w-[min(34vw,620px)]">
            <div className={`absolute left-1/2 top-0 z-20 hidden aspect-[2.6/1] w-[82%] -translate-x-1/2 sm:block ${slideDirection === "right" ? "animate-hero-preview-wheel-right" : "animate-hero-preview-wheel-left"}`}>
              {previewItems.map((preview) => (
                <button
                  type="button"
                  key={`${preview.name}-${preview.offset}`}
                  onClick={() => rotateToProduct(preview.index)}
                  disabled={isSliding}
                  aria-label={`Show ${preview.name}`}
                  className="absolute left-1/2 top-[78%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-primary/15 bg-[#fffdf8]/90 p-1.5 shadow-[0_12px_28px_rgba(17,24,39,0.09)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[54%] hover:border-brand-primary/35 hover:shadow-[0_16px_34px_rgba(248,114,5,0.16)] focus:outline-none focus:ring-2 focus:ring-brand-primary/25 active:scale-95 disabled:cursor-default"
                  style={{
                    transform: previewTransform(preview.offset),
                    opacity: Math.abs(preview.offset) === 1 ? 0.86 : 0.58,
                    zIndex: Math.abs(preview.offset) === 1 ? 2 : 1,
                  }}
                >
                  <Image
                    src={preview.image}
                    alt={preview.name}
                    fill
                    sizes="56px"
                    className="object-contain object-center p-1"
                    unoptimized
                  />
                </button>
              ))}
            </div>

            {previousItem && isSliding && (
              <div className={`absolute inset-0 ${slideDirection === "right" ? "animate-hero-orbit-out-right" : "animate-hero-orbit-out-left"}`}>
                <HeroProductImage src={previousItem.image} alt={previousItem.name} />
              </div>
            )}

            <div key={item.image} className={`absolute inset-0 ${slideDirection === "right" ? "animate-hero-orbit-in-right" : "animate-hero-orbit-in-left"}`}>
              <HeroProductImage src={item.image} alt={item.name} priority={currentIndex === 0} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroProductImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-[1.08/1] h-full w-full max-h-full max-w-full shrink-0 overflow-visible">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 64vw, (max-width: 1536px) 43vw, 640px"
          className="h-full w-full object-contain object-center !m-0 !border-0 !bg-transparent !p-0 !outline-none !ring-0"
          priority={priority}
          unoptimized
        />
      </div>
    </div>
  );
}
