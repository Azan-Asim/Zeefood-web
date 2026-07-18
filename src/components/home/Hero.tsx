import Link from "next/link";
import Image from "next/image";

const HERO_BIRYANI_IMAGE = "/images/home/desi/biryani_no_bg.png";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-gray-50 pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32 2xl:min-h-[780px] 2xl:pt-36">

      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:flex-row lg:gap-12 lg:px-8 2xl:max-w-[1600px] 2xl:gap-20 2xl:px-10">

        {/* Left side - copy */}
        <div className="relative z-10 max-w-2xl space-y-5 text-center sm:space-y-6 lg:w-1/2 lg:text-left 2xl:max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl 2xl:text-7xl">
            Fresh Flavors,{" "}
            <span className="text-brand-primary">
              Delivered Fast
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-lg text-gray-600 lg:mx-0 2xl:max-w-2xl 2xl:text-xl">
            Experience wholesome, restaurant-quality meals crafted with
            love and brought straight to your door.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-medium rounded-[18px] px-8 py-3 shadow-lg transition-all duration-300 hover:bg-brand-primary/90 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(248,114,5,0.28)]"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* Right side - image */}
        <div className="relative flex w-full justify-center lg:w-1/2 lg:justify-end">
          <div className="relative aspect-square w-[min(86vw,420px)] sm:w-[min(70vw,500px)] lg:w-[min(42vw,540px)] 2xl:w-[620px]">
            <Image
              src={HERO_BIRYANI_IMAGE}
              alt="Chicken biryani plate"
              fill
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 70vw, (max-width: 1536px) 42vw, 620px"
              className="object-contain !m-0 !border-0 !bg-transparent !p-0 !shadow-none !outline-none !ring-0"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  );
}
