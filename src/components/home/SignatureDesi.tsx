"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

type RemoteProduct = {
  id: string;
  name: string;
  image?: string;
  status?: string;
  category?: { CategoryName?: string };
  price?: number;
  variants?: { id?: string; name?: string; price?: number }[];
};

export default function SignatureDesi() {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const router = useRouter();
  const [desiItems, setDesiItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "https://drm.devsinntechnologies.com/public/products?businessId=5707b450-9723-4794-9ba4-ee03890cf504&page=1&limit=50"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const data: RemoteProduct[] = json.data || [];

        // select desi category products (keep status for clickability), take first 4
        const filtered = data
          .filter((p) => p.category?.CategoryName === "Desi")
          .slice(0, 4)
          .map((p) => {
            const imageUrl = p.image
              ? `https://drm.devsinntechnologies.com/${p.image}`
              : "/images/home/menu/placeholder.png";

            const variantPrices = (p.variants || []).map((v: any) => Number(v.price || 0)).filter(Boolean);
            const price = variantPrices.length > 0 ? Math.min(...variantPrices) : (p.price || 0);

            return {
              id: p.id,
              name: p.name,
              nameUr: "",
              description: "",
              descriptionUr: "",
              price,
              image: imageUrl,
              slug: (p as any).slug ?? p.id,
              status: p.status,
              category: p.category?.CategoryName ?? "Desi",
              variants: p.variants || [],
              raw: p,
            };
          });

        if (mounted) setDesiItems(filtered);
      } catch (err: any) {
        if (mounted) setError(err.message || "Failed to load products");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      className="relative w-full bg-brand-white pb-12 pt-20 sm:pt-24"
      style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase font-sans leading-none text-brand-primary">
            Signature Desi
          </h2>
          <div className="w-24 h-1.5 bg-brand-primary mt-4 rounded-full mb-6" />
          <p className="text-brand-dark/70 font-medium max-w-2xl text-lg">
            Experience the rich, authentic flavors of our heritage with perfectly crafted traditional recipes.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
          {loading && <div className="col-span-4 text-center">Loading...</div>}
          {error && <div className="col-span-4 text-center text-red-500">{error}</div>}
          {!loading && !error && desiItems.map((item, index) => {
            const bgThemes = [
              "bg-[#fecaca]",
              "bg-[#ffdec1]",
              "bg-[#bbf7d0]",
              "bg-[#fef08a]",
            ];
            const borderColors = [
              "border-red-300",
              "border-orange-300",
              "border-emerald-300",
              "border-amber-300",
            ];

            return (
              <div
                key={item.id}
                className={`relative mt-16 lg:mt-20 flex flex-col items-center text-center p-6 lg:p-7 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-2 ${borderColors[index % 4]} transition-all duration-500 hover:-translate-y-4 group cursor-pointer ${bgThemes[index % 4]}`}
              >
                <div className="absolute -top-16 lg:-top-20 w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]">
                  <div className="w-full h-full relative z-10 border-4 border-white shadow-inner rounded-full bg-white group-hover:border-brand-primary/20 transition-colors duration-500 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700" unoptimized />
                  </div>
                </div>
                <div className="h-[100px] lg:h-[110px] w-full" />
                <h3 className={`text-xl font-black text-brand-dark  tracking-wide mb-3 group-hover:text-brand-primary transition-colors flex flex-col items-center ${language === "UR" ? "font-urdu" : ""}`}>
                  <span>{item.name}</span>
                  {/* <span className="text-sm font-bold opacity-80 font-urdu">({item.nameUr})</span> */}
                </h3>
                <p
                  className={`text-black text-sm font-bold mb-6 line-clamp-5 ${language === "UR" ? "font-urdu" : ""}`}
                >
                  {language === "UR" ? item.descriptionUr : item.description}
                </p>
                {item.variants?.length > 0 && (
                  <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
                    {item.variants.slice(0, 4).map((variant: any) => (
                      <span
                        key={variant.id ?? `${item.id}-${variant.name}`}
                        className="px-3 py-1.5 rounded-full bg-white/80 border border-white text-[10px] font-black uppercase tracking-widest text-brand-dark/70 shadow-sm"
                      >
                        {variant.name}
                        {variant.price ? ` • Rs. ${Number(variant.price).toLocaleString()}` : ""}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto flex flex-col items-center w-full">
                  <span className="text-3xl font-black mb-4 drop-shadow-sm" style={{ color: '#F87205' }}>{`Rs. ${Number(item.price).toLocaleString()}`}</span>
                  {(() => {
                    const isActive = item.status === "ACTIVE";
                    const handleOrderNow = () => {
                      if (!isActive) return;

                      const lowestVariantPrice = item.variants && item.variants.length > 0
                        ? Math.min(...item.variants.map((v: any) => Number(v.price || 0)))
                        : item.price || 0;

                      const cartItem = {
                        id: item.id,
                        name: item.name,
                        nameUr: item.nameUr || "",
                        price: `Rs. ${lowestVariantPrice.toLocaleString()}`,
                        image: item.image,
                        category: item.category ?? "Desi",
                        description: item.description || "",
                        descriptionUr: item.descriptionUr || "",
                        slug: item.slug,
                        popular: false,
                        details: { prepTime: "20-30 min", prepTimeUr: "20-30 منٹ" },
                      };

                      addToCart(cartItem);
                      router.push('/menu');
                    };

                    return (
                      <button
                        onClick={handleOrderNow}
                        disabled={!isActive}
                        className="w-full rounded-[18px] border border-gray-100 bg-white px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-dark shadow-md transition-all duration-300 group-hover:border-transparent group-hover:bg-brand-primary group-hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isActive ? t("orderNow") : "Unavailable"}
                      </button>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/menu" className="inline-flex items-center justify-center rounded-[18px] border-2 border-brand-primary bg-transparent px-10 py-4 font-black uppercase tracking-widest text-brand-primary no-underline hover:bg-brand-primary hover:text-brand-white hover:no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(248,114,5,0.30)]">
            {t("viewMenu")}
          </Link>
        </div>
      </div>
    </section>
  );
}
