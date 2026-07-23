"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroItems = [
  {
    name: "Chicken Pulao",
    urduName: "کباب",
    image: "/chickenpulao.webp",
    title: "Premium Pulao,",
    highlight: "Served Fresh",
    description: "Fragrant rice cooked with rich desi spices, tender flavor, and the comforting taste of home.",
  },
  {
    name: "Chicken Nuggets",
    urduName: "نِگٹس",
    image: "/chickennuggets.webp",
    title: "Crispy Nuggets,",
    highlight: "Made Golden",
    description: "Crunchy bites with a soft, juicy center, made for quick cravings and family snack moments.",
  },
  {
    name: "Dahi Bhallay",
    urduName: "دہی بھلے",
    image: "/dahibhallay.webp",
    title: "Dahi Bhallay,",
    highlight: "Cool & Tangy",
    description: "Soft bhallay topped with creamy yogurt, chutney, and masala for a refreshing street-style treat.",
  },
  {
    name: "Dal Rice",
    urduName: "دال چاول",
    image: "/dalrice.webp",
    title: "Dal Rice,",
    highlight: "Comfort Classic",
    description: "Slow-cooked lentils served with fluffy rice for a warm, homestyle plate full of familiar flavor.",
  },
  {
    name: "Seekh Kabab",
    urduName: "کباب",
    image: "/seekhkabab.webp",
    title: "Juicy Kabab,",
    highlight: "Grilled Perfect",
    description: "Smoky, tender kababs seasoned with classic spices and cooked for a rich, memorable bite.",
  },
  {
    name: "Spring Rolls",
    urduName: "رول",
    image: "/springrolls.webp",
    title: "Spring Rolls,",
    highlight: "Crisp & Fresh",
    description: "Golden rolls with a savory filling, served crisp for snack cravings and shared family plates.",
  },
  {
    name: "Chutni",
    urduName: "چٹنی",
    image: "/chutni.png",
    title: "Fresh Chutni,",
    highlight: "Zesty & Bright",
    description: "A smooth, tangy chutni with fresh herbs and spices that lifts every bite with clean desi flavor.",
  },
  {
    name: "Biryani",
    urduName: "بریانی",
    image: "/biryani.png",
    title: "Classic Biryani,",
    highlight: "Richly Spiced",
    description: "Layered rice and masala aroma with bold spices, tender flavor, and a festive plate feel.",
  },
  {
    name: "Gol Gappy",
    urduName: "گول گپے",
    image: "/golgappy.png",
    title: "Gol Gappy,",
    highlight: "Crisp & Tangy",
    description: "Crunchy shells with punchy pani and chatpata filling for a lively street-style snack.",
  },
  {
    name: "Samosa",
    urduName: "سموسے",
    image: "/samosa.png",
    title: "Golden Samosay,",
    highlight: "Crisp & Warm",
    description: "Flaky golden pockets with a savory filling, made for tea-time cravings and shared plates.",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const rotationStep = 360 / heroItems.length;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentIndex((index) => {
        const nextIndex = (index + 1) % heroItems.length;
        setRotation(-nextIndex * rotationStep);
        return nextIndex;
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, [rotationStep]);

  const selectItem = (index: number) => {
    setCurrentIndex(index);
    setRotation(-index * rotationStep);
  };

  const item = heroItems[currentIndex];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#fbf7f2] pb-6 pt-[5.9rem] sm:pb-8 sm:pt-[6.6rem] lg:pb-8 lg:pt-[6.3rem] 2xl:pt-[6.9rem]">
      <div className="site-container flex min-h-0 flex-col items-center">
        <div className="flex w-full flex-1 flex-col items-center gap-4 lg:flex-row lg:gap-8 2xl:gap-12 [@media(min-width:2200px)]:gap-16">
          <div className="relative z-10 max-w-3xl space-y-2 text-center sm:space-y-3 lg:w-1/2 lg:text-left 2xl:max-w-4xl">
            <div className="inline-flex flex-col items-center lg:items-start">
              <p lang="ur" dir="rtl" className="font-ama-dhaba text-[clamp(38px,10vw,58px)] font-black leading-none text-brand-primary lg:text-[clamp(60px,4.4vw,78px)] [@media(min-width:2200px)]:text-[88px]">
                اماں جی کا ڈھابہ
              </p>
            </div>

            <div key={item.name} className="animate-hero-copy-fade space-y-2 sm:space-y-3">
              <h1 className="text-[clamp(2.35rem,9.5vw,3.7rem)] font-extrabold leading-[1.02] text-brand-dark lg:text-[clamp(3.7rem,5.1vw,5.35rem)] [@media(min-width:2200px)]:text-[6.1rem]">
                {item.title} <span className="text-brand-primary">{item.highlight}</span>
              </h1>

              <p className="mx-auto max-w-2xl text-base font-semibold leading-relaxed text-brand-dark sm:text-xl lg:mx-0 2xl:max-w-3xl 2xl:text-2xl [@media(min-width:2200px)]:text-3xl">
                {item.description}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex w-full justify-center lg:w-1/2 lg:justify-end">
            <CircularHeroDisplay currentIndex={currentIndex} rotation={rotation} onSelect={selectItem} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CircularHeroDisplay({
  currentIndex,
  rotation,
  onSelect,
}: {
  currentIndex: number;
  rotation: number;
  onSelect: (index: number) => void;
}) {
  const visibleItems = Array.from({ length: 6 }, (_, offset) => {
    const itemIndex = (currentIndex + offset) % heroItems.length;
    return { ...heroItems[itemIndex], itemIndex, displayIndex: offset };
  });

  return (
    <div className="relative grid aspect-square w-[min(82vw,350px)] max-w-full place-items-center overflow-hidden rounded-full sm:w-[min(52vw,420px)] lg:w-[min(36vw,545px)] 2xl:w-[min(30vw,650px)] [@media(min-width:2200px)]:w-[min(27vw,740px)]">
      <div className="absolute inset-[8%] rounded-full bg-[#fff8ef] shadow-[0_24px_52px_rgba(17,24,39,0.10)]" />
      <div className="absolute inset-[15%] rounded-full border border-brand-primary/10 bg-[#fffaf4]" />
      <div className="absolute inset-[27%] rounded-full border border-brand-primary/10 bg-[#fff3e5]" />

      <div
        className="absolute inset-[8%] transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {visibleItems.map((dish) => {
          const isActive = dish.itemIndex === currentIndex;
          const angle = dish.displayIndex * 72 + 90;
          const position = isActive ? { x: 50, y: 50 } : getOrbitPosition(angle, 38);
          const size = isActive ? 54 : dish.displayIndex === 1 || dish.displayIndex === 5 ? 17 : 14;
          const opacity = isActive ? 1 : dish.displayIndex === 1 || dish.displayIndex === 5 ? 0.82 : 0.58;
          const zIndex = isActive ? 30 : 20 - dish.displayIndex;

          return (
            <button
              key={dish.name}
              type="button"
              onClick={() => onSelect(dish.itemIndex)}
              aria-label={`Show ${dish.name}`}
              className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none transition-opacity duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:ring-2 focus-visible:ring-brand-primary/45"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: `${size}%`,
                height: `${size}%`,
                opacity,
                zIndex,
              }}
            >
              <div
                className="relative h-full w-full transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `rotate(${-rotation}deg)` }}
              >
                <div className="absolute inset-0 rounded-full bg-[#fff8ef] shadow-[0_16px_36px_rgba(248,114,5,0.10)]" />
                <div className="absolute inset-[9%] rounded-full bg-[#fffdf9]" />
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  sizes="(max-width: 640px) 48vw, (max-width: 1024px) 34vw, 360px"
                  className="object-contain p-[10%]"
                  priority={dish.itemIndex === 0}
                  unoptimized
                />
              </div>
            </button>
          );
        })}
      </div>

      <div
        key={heroItems[currentIndex].urduName}
        lang="ur"
        dir="rtl"
        className="font-ama-dhaba pointer-events-none absolute bottom-[10%] left-1/2 z-40 -translate-x-1/2 animate-hero-copy-fade whitespace-nowrap rounded-full border border-brand-primary/10 bg-[#fff8ef]/88 px-5 py-1 text-[clamp(1.45rem,6vw,2.35rem)] font-black leading-none text-brand-primary/85 shadow-[0_12px_28px_rgba(248,114,5,0.12)] backdrop-blur-sm sm:bottom-[11%] lg:text-[clamp(2rem,2.6vw,2.9rem)]"
      >
        {heroItems[currentIndex].urduName}
      </div>
    </div>
  );
}

function getOrbitPosition(angle: number, radius: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: 50 + Math.cos(radians) * radius,
    y: 50 + Math.sin(radians) * radius,
  };
}
