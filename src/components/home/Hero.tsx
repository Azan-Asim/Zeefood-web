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
    <section className="relative overflow-hidden bg-gray-50 min-h-screen pt-24 gap-20 flex items-center py-16">

      {/* Background Shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* Top Left Gradient Blob */}
        <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />

        {/* Bottom Right Gradient Blob */}
        <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-3xl animate-pulse" />

        {/* Small Floating Circles */}
        <div className="absolute top-32 right-24 w-20 h-20 border border-brand-primary/30 rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-20 w-14 h-14 bg-brand-primary/10 rounded-full animate-ping" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Rotating Shape */}
        <div className="absolute top-1/3 left-1/2 w-40 h-40 border border-brand-primary/20 rotate-45 animate-spin-slow rounded-3xl" />
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

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-brand-primary text-white font-medium py-3 px-8 rounded-md shadow-lg hover:scale-105 hover:bg-primary-700 transition-all duration-300"
          >
            Order Now
          </Link>
        </div>

        {/* Right side - SVG image */}
        <div className="lg:w-1/2 w-full relative flex justify-center items-center">

          {/* Glow Behind Image */}
          <div className="absolute w-[420px] h-[420px] bg-brand-primary/20 blur-3xl rounded-full" />

          <div className="relative w-full max-w-[550px] aspect-square">
            <Image
              src="/image.svg"
              alt="Hero image"
              fill
              className="object-contain scale-105 drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}