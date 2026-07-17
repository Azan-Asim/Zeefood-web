"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gray-50 pb-16 pt-28 sm:pt-32">

      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">

        {/* Left side - copy */}
        <div className="lg:w-1/2 space-y-6 relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Fresh Flavors,{" "}
            <span className="text-brand-primary">
              Delivered Fast
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Experience wholesome, restaurant-quality meals crafted with
            love and brought straight to your door.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white font-medium rounded-[18px] px-8 py-3 shadow-lg transition-all duration-300 hover:bg-brand-primary/90 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(248,114,5,0.28)]"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* Right side - image */}
        <div className="lg:w-1/2 w-full relative flex justify-center items-center">

          {/* Glow Behind Image */}
          <div className="relative w-full max-w-[550px] aspect-square">
            <Image
              src="/fiery-wok.png"
              alt="Freshly prepared food"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
