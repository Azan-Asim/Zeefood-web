"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

// ── Redux / Custom hooks ──────────────────────────────────────────────────────
import { useProducts, useProductFilters } from "@/hooks/useProducts";
import type { Product } from "@/lib/store";

// ─────────────────────────────────────────────────────────────────────────────
// Image helper — DRM images are served from a relative path
// ─────────────────────────────────────────────────────────────────────────────
const DRM_BASE = "https://drm.devsinntechnologies.com";

function productImageUrl(image: string | null): string {
  if (!image) return "/images/placeholder-food.png";
  if (image.startsWith("http")) return image;
  return `${DRM_BASE}/${image.replace(/^\//, "")}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pastel card themes (cycled by index)
// ─────────────────────────────────────────────────────────────────────────────
const CARD_THEMES = [
  { bg: "bg-[#fecaca]", border: "border-red-300" },
  { bg: "bg-[#ffdec1]", border: "border-orange-300" },
  { bg: "bg-[#bbf7d0]", border: "border-emerald-300" },
  { bg: "bg-[#fef08a]", border: "border-amber-300" },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// ProductCard
// ─────────────────────────────────────────────────────────────────────────────
// function ProductCard({
//   product,
//   index,
//   onAddToCart,
// }: {
//   product: Product;
//   index: number;
//   onAddToCart: (p: Product) => void;
// }) {
//   const { t } = useLanguage();
//   // const theme = CARD_THEMES[index % CARD_THEMES.length];
//   const theme = { bg: "bg-white", border: "border-gray-100" };
//   const lowestVariantPrice =
//     product.variants.length > 0
//       ? Math.min(...product.variants.map((v) => v.price))
//       : product.price;

//   const displayPrice =
//     lowestVariantPrice > 0
//       ? `Rs. ${lowestVariantPrice.toLocaleString()}`
//       : product.price > 0
//         ? `Rs. ${product.price.toLocaleString()}`
//         : "—";

//   const isActive = product.status ? product.status === "ACTIVE" : true;

//   return (

//     <div
//       // className={`relative flex flex-col items-center text-center p-6 lg:p-7 rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-2 ${theme.border} transition-all duration-500 hover:-translate-y-4 group ${theme.bg} min-h-[420px] lg:min-h-[460px]`}
//       className="relative flex flex-col overflow-hidden items-center text-center p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"     >
//       {/* Floating Image */}
//       <div className="relative -top-16 lg:-top-20 w-[160px] h-[160px] lg:w-[180px] lg:h-[180px] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2 drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)]">
//         {/* <div className="w-full h-full relative z-10 border-4 border-white shadow-inner rounded-full bg-white group-hover:border-brand-primary/20 transition-colors duration-500 overflow-hidden"> */}
//         <div className="w-full h-48 overflow-hidden rounded-2xl mb-4 relative shadow-sm">
//           <Image
//             src={productImageUrl(product.image)}
//             alt={product.name}
//             fill
//             // className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
//             className="object-cover group-hover:scale-110 transition-transform duration-500"
//             unoptimized
//           />
//         </div>

//         {/* In-stock badge */}
//         {product.inStock < 20 && product.inStock > 0 && (
//           // <div className="absolute top-2 right-0 z-20 bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-lg">
//           <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-brand-primary text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-sm border border-brand-primary/10">
//             Low Stock
//           </div>
//         )}
//         {/* {product.inStock === 0 && (
//           <div className="absolute top-2 right-0 z-20 bg-gray-400 text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full shadow-lg">
//             Out of Stock
//           </div>
//         )} */}
//       </div>

//       <div className="h-24 lg:h-28 w-full" />

//       {/* Category chip */}
//       <span className="mb-2 px-3 py-1 bg-white/60 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-dark/50">
//         {product.category?.CategoryName ?? "General"}
//       </span>

//       {/* Title */}
//       <h3 className="text-xl font-black text-brand-dark uppercase tracking-wide mb-2 group-hover:text-brand-primary transition-colors">
//         {product.name}
//       </h3>

//       {/* Variants pill list — always reserves the same vertical space */}
//       <div className="flex flex-wrap items-center justify-center gap-2 mb-4 min-h-[56px]">
//         {product.variants.map((v) => (
//           <span
//             key={v.id}
//             className="px-3 py-1 bg-white/70 border border-white/80 rounded-full text-[10px] font-black text-brand-dark/60 uppercase tracking-wider"
//           >
//             {v.name} — Rs.&nbsp;{v.price.toLocaleString()}
//           </span>
//         ))}
//       </div>

//       {/* Rating row */}
//       <div className="flex items-center justify-center gap-2 text-[10px] font-black text-brand-dark/40 uppercase tracking-widest mb-5">
//         <span className="flex items-center gap-1">
//           <span className="text-[#F87205]">★</span> 4.9
//         </span>
//         <span className="w-1 h-1 bg-brand-dark/20 rounded-full" />
//         <span>20–30 min</span>
//       </div>

//       {/* Price + CTA */}
//       <div className="mt-auto flex flex-col items-center w-full">
//         <span
//           className="text-3xl font-black mb-5 drop-shadow-sm"
//           style={{ color: "#F87205" }}
//         >
//           {displayPrice}
//         </span>

//         <button
//           disabled={!isActive}
//           onClick={() => onAddToCart(product)}
//           className="w-full py-4 px-6 bg-white text-brand-dark font-black text-xs uppercase tracking-widest rounded-full shadow-md group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 border border-gray-100 group-hover:border-transparent disabled:opacity-40 disabled:cursor-not-allowed"
//         >
//           {!isActive ? "Unavailable" : t("orderNow")}
//         </button>
//       </div>
//     </div>
//   );
// }


function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: Product;
  index: number;
  onAddToCart: (p: Product) => void;
}) {
  const { t } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  const theme = {
    bg: "bg-white",
    border: "border-gray-100",
  };

  const variants = product.variants ?? [];

  const lowestVariantPrice =
    variants.length > 0
      ? Math.min(...variants.map((variant) => variant.price))
      : product.price;

  const displayPrice =
    lowestVariantPrice > 0
      ? `Rs. ${lowestVariantPrice.toLocaleString()}`
      : product.price > 0
        ? `Rs. ${product.price.toLocaleString()}`
        : "—";

  const isActive = product.status
    ? product.status === "ACTIVE"
    : true;

  const detailsId = `product-details-${index}`;

  return (
    <article
      className={` relative grid h-[400px] md:h-[480px] w-full grid-rows-[200px_200px] md:grid-rows-[230px_250px] overflow-hidden rounded-[24px] md-rounded-[30px] border ${theme.border} bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-2xl group
      `}
    >
      {/* IMAGE SECTION */}
      <div className="relative min-h-0 w-full bg-gray-50">
        {/*
          Important:
          The nested relative container creates a real inner frame.
          Next/Image fills this inner frame instead of ignoring the padding.
        */}
        {/* <div className="absolute inset-4">
          <Image
            src={productImageUrl(product.image)}
            alt={product.name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="object-contain object-center"
            style={{
              objectFit: "contain",
              objectPosition: "center",
            }}
            unoptimized
          />
        </div> */}

        {/* IMAGE SECTION */}
<div className="relative h-full w-full overflow-hidden bg-gray-50  ">
  <Image
    src={productImageUrl(product.image)}
    alt={product.name}
    fill
    sizes=" (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    
    className=" object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    
    unoptimized
  />
</div>
      </div>



      {/* MAIN CONTENT SECTION */}
      <div
        className={` relative z-10 flex h-full min-h-0 flex-col border-t ${theme.border} ${theme.bg} p-3 md:p-5
        `}
      >
        {/* RATING AND DELIVERY TIME */}
        <div className="mb-2 flex items-center justify-end">
          <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-brand-dark/40">
            <span className="text-[#F87205]">★</span>

            <span>4.9</span>

            <span className="mx-1 h-1 w-1 rounded-full bg-brand-dark/20" />

            <span>20–30 min</span>
          </div>
        </div>

        {/* PRODUCT TITLE */}
        <h3
          className=" mb-2 min-h-[44px]  md:min-h-[52px] line-clamp-2 text-lg md:text-xl font-black uppercase leading-[1.3] tracking-wide text-brand-dark transition-colors group-hover:text-brand-primary
          "
          title={product.name}
        >
          {product.name}  
        </h3>

        {/* EXPAND DETAILS BUTTON */}
        <button
          type="button"
          aria-expanded={showDetails}
          aria-controls={detailsId}
          onClick={() => setShowDetails(true)}
          className=" flex w-fit items-center gap-2 rounded-full  border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-brand-dark/60 transition-all duration-300 hover:border-brand-primary hover:text-brand-primary
          "
        >
          View details

          {variants.length > 0 && (
            <span className="text-brand-primary">
              ({variants.length})
            </span>
          )}

          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-3.5 w-3.5"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* PRICE AND CTA */}
        <div className="mt-auto flex w-full flex-col items-center">
          <span
            className="mb-2 md:mb-3 md:text-3xl text-2xl font-black drop-shadow-sm"
            style={{ color: "#F87205" }}
          >
            {displayPrice}
          </span>

          <button
            type="button"
            disabled={!isActive}
            onClick={() => onAddToCart(product)}
            className=" w-full rounded-full border border-transparent bg-brand-dark px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-black uppercase tracking-widest text-white shadow-md transition-all duration-300 group-hover:bg-brand-primary disabled:cursor-not-allowed disabled:opacity-40
            "
          >
            {!isActive ? "Unavailable" : t("orderNow")}
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      {showDetails && (
        <button
          type="button"
          aria-label="Close product details"
          onClick={() => setShowDetails(false)}
          className=" absolute inset-0 z-20 cursor-default bg-black/10 backdrop-blur-[1px]
          "
        />
      )}

      {/* EXPANDABLE DETAILS DRAWER */}
      <section
        id={detailsId}
        aria-hidden={!showDetails}
        className={` absolute inset-x-3 bottom-3 z-30 max-h-[315px] overflow-hidden rounded-[26px] border ${theme.border} bg-white shadow-2xl transition-all duration-300
          ${
            showDetails
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-[110%] opacity-0"
          }
        `}
      >
        {/* DRAWER HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              Product information
            </p>

            <h4 className="mt-1 line-clamp-1 text-base font-black uppercase text-brand-dark">
              {product.name}
            </h4>
          </div>

          <button
            type="button"
            aria-label="Close details"
            onClick={() => setShowDetails(false)}
            className=" flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-lg font-bold text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary
            "
          >
            ×
          </button>
        </div>

        {/* SCROLLABLE DETAILS CONTENT */}
        <div className="max-h-[235px] overflow-y-auto px-5 py-4">
          {/* CATEGORY */}
          <div className="mb-5">
            <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-brand-dark/40">
              Category
            </p>

            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-brand-dark/60">
              {product.category?.CategoryName ?? "General"}
            </span>
          </div>

          {/* VARIANTS */}
          <div>
            <p className="mb-2 text-[9px] font-black uppercase tracking-widest text-brand-dark/40">
              Available options
            </p>

            {variants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {variants.map((variant) => (
                  <span
                    key={variant.id}
                    className=" rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-brand-dark/60
                    "
                  >
                    {variant.name} — Rs.&nbsp;
                    {variant.price.toLocaleString()}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs font-bold text-brand-dark/50">
                No additional options available.
              </p>
            )}
          </div>

          {/* STOCK */}
          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-dark/40">
              Stock availability
            </span>

            <span
              className={`text-[10px] font-black uppercase tracking-wider ${
                product.inStock > 0
                  ? "text-brand-primary"
                  : "text-brand-dark/40"
              }`}
            >
              {product.inStock > 0
                ? `${product.inStock} available`
                : "Out of stock"}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// Skeleton Card — shown while loading
// ─────────────────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="relative flex flex-col items-center text-center p-6 rounded-[35px] bg-gray-100 border-2 border-gray-200 animate-pulse">
      <div className="absolute -top-16 w-[160px] h-[160px] rounded-full bg-gray-200" />
      <div className="h-24 w-full" />
      <div className="h-4 w-24 bg-gray-200 rounded-full mb-3" />
      <div className="h-6 w-36 bg-gray-300 rounded-full mb-4" />
      <div className="h-4 w-28 bg-gray-200 rounded-full mb-6" />
      <div className="h-10 w-full bg-gray-300 rounded-full" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CartItem adapter — map DRM Product → legacy CartContext shape
// ─────────────────────────────────────────────────────────────────────────────
function toCartItem(product: Product) {
  const price =
    product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.price))
      : product.price;

  return {
    id: product.id,
    name: product.name,
    nameUr: "",
    price: `Rs. ${price.toLocaleString()}`,
    image: productImageUrl(product.image),
    category: product.category?.CategoryName ?? "",
    description: "",
    descriptionUr: "",
    slug: product.id,
    popular: false,
    details: { prepTime: "20-30 min", prepTimeUr: "20-30 منٹ" },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main OrderPage
// ─────────────────────────────────────────────────────────────────────────────
export default function OrderPage() {
  const { t, language } = useLanguage();
  const { cart, addToCart, updateQuantity, cartTotal } = useCart();
  const searchParams = useSearchParams();

  const [userLocation] = useState<{ area: string; city: string; orderType: string } | null>(() => {
    if (typeof window === "undefined") return null;

    const loc = window.sessionStorage.getItem("userLocation");
    return loc ? JSON.parse(loc) : null;
  });
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // ── Redux hooks ─────────────────────────────────────────────────────────
  const { isLoading, isError, error, refetch } = useProducts();
  const {
    filteredProducts,
    categories,
    activeCategory,
    searchQuery,
    changeCategory,
    changeSearch,
  } = useProductFilters();

  useEffect(() => {
    const requestedCategory = searchParams.get("category")?.trim();
    if (!requestedCategory) return;
    if (requestedCategory !== activeCategory && categories.includes(requestedCategory)) {
      changeCategory(requestedCategory);
    }
  }, [activeCategory, categories, changeCategory, searchParams]);

  // ── Debounced search ────────────────────────────────────────────────────
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearchChange = useCallback(
    (raw: string) => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(() => changeSearch(raw), 350);
    },
    [changeSearch]
  );

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

  // ── Cart helpers ────────────────────────────────────────────────────────
  const deliveryFee = cartTotal > 0 ? 150 : 0;
  const totalAmount = cartTotal + deliveryFee;

  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart(toCartItem(product));
      if (cart.length === 0) setIsMobileCartOpen(true);
    },
    [addToCart, cart.length]
  );

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    const loc = userLocation ?? { area: "Not specified", city: "Not specified", orderType: "delivery" };
    let msg = `*NEW ORDER - ZEE FOOD GALLERY*\n\n`;
    msg += `*Order Type:* ${loc.orderType === "delivery" ? "🚀 Delivery" : "🛍️ Pick-Up"}\n`;
    msg += `*Location:* ${loc.area}, ${loc.city}\n\n*ITEMS:*\n`;
    cart.forEach((c) => {
      msg += `- ${c.item.name} (x${c.quantity}) - ${c.item.price}\n`;
    });
    msg += `\n*Subtotal:* Rs. ${cartTotal.toLocaleString()}\n`;
    msg += `*Delivery:* Rs. ${deliveryFee}\n`;
    msg += `*Total:* Rs. ${totalAmount.toLocaleString()}\n\nPlease confirm. Thank you!`;
    window.open(`https://wa.me/923354153368?text=${encodeURIComponent(msg)}`, "_blank");
  }, [cart, userLocation, cartTotal, deliveryFee, totalAmount]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="h-[calc(100vh-90px)] bg-white flex flex-col font-sans overflow-hidden mt-[90px]">
      <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col md:flex-row relative overflow-hidden">

        {/* ── Main Menu Panel ── */}
        <div className="flex-1 px-4 sm:px-6 pt-10 pb-32 md:pb-8 md:pr-8 md:border-r border-black/5 overflow-y-auto no-scrollbar">

          {/* Header */}
          <div className="mb-10">
            <h1 className={`text-2xl lg:text-3xl font-black text-[#1a0a04] tracking-tight mb-1 ${language === "UR" ? "text-right" : ""}`}>
              {t("orderDelivery")}
            </h1>
            <p className={`text-[#6b5a50] font-medium text-xs lg:text-sm mb-6 ${language === "UR" ? "text-right" : ""}`}>
              {t("exclusiveChefMeals")}
            </p>

            {/* Search Bar */}
            <div className="relative mb-6">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search dishes…"
                defaultValue={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 text-sm font-bold text-brand-dark placeholder:text-brand-dark/30 outline-none focus:border-brand-primary/40 focus:ring-2 focus:ring-brand-primary/10 transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className={`flex gap-3 overflow-x-auto pb-3 no-scrollbar ${language === "UR" ? "flex-row-reverse" : ""}`}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => changeCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeCategory === cat
                    ? "bg-brand-primary text-white "
                    : "bg-white text-[#6b5a50] border border-[#f0e4dc] hover:border-brand-primary/30 hover:text-brand-primary"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                </svg>
              </div>
              <div>
                <p className="font-black text-brand-dark text-lg mb-1">Failed to load menu</p>
                <p className="text-brand-dark/50 text-sm mb-6">{error}</p>
                <button
                  onClick={() => refetch()}
                  className="px-8 py-3.5 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-[0_15px_30px_rgba(230,57,70,0.35)] hover:-translate-y-0.5 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
              <span className="text-6xl">🍽️</span>
              <p className="font-black text-brand-dark text-xl">No dishes found</p>
              <p className="text-brand-dark/40 text-sm">Try a different search or category.</p>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-28 gap-x-8 pt-16">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>

        {/* ── Desktop Cart Sidebar ── */}
        <div className="hidden md:flex w-[380px] lg:w-[420px] flex-col h-full bg-[#faf8f5] border-l border-[#ebe3d9] shadow-[-10px_0_40px_rgba(0,0,0,0.03)] overflow-hidden">
          <CartContent
            cart={cart}
            cartTotal={cartTotal}
            deliveryFee={deliveryFee}
            totalAmount={totalAmount}
            language={language}
            t={t}
            updateQuantity={updateQuantity}
            onCheckout={handleCheckout}
          />
        </div>

        {/* ── Mobile Floating Cart Bar ── */}
        {cart.length > 0 && !isMobileCartOpen && (
          <div className="md:hidden fixed bottom-6 left-4 right-4 z-[90] animate-in fade-in slide-in-from-bottom-10">
            <button
              onClick={() => setIsMobileCartOpen(true)}
              className="w-full bg-brand-primary text-white p-4 rounded-[20px] shadow-2xl flex items-center justify-between font-medium uppercase tracking-widest text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs">{cart.reduce((acc, c) => acc + c.quantity, 0)}</span>
                </div>
                <span>View Your Order</span>
              </div>
              <span>Rs. {totalAmount.toLocaleString()}</span>
            </button>
          </div>
        )}

        {/* ── Mobile Cart Drawer ── */}
        <div className={`md:hidden fixed inset-0 z-[200] transition-transform duration-500 ${isMobileCartOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileCartOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-[85vh] bg-white rounded-t-[40px] flex flex-col overflow-hidden shadow-2xl">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" onClick={() => setIsMobileCartOpen(false)} />
            <div className="px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h2 className="text-xl font-black text-brand-dark uppercase tracking-tight">{t("yourOrder")}</h2>
              <button onClick={() => setIsMobileCartOpen(false)} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex flex-col">
              <CartContent
                cart={cart}
                cartTotal={cartTotal}
                deliveryFee={deliveryFee}
                totalAmount={totalAmount}
                language={language}
                t={t}
                updateQuantity={updateQuantity}
                onCheckout={() => { handleCheckout(); setIsMobileCartOpen(false); }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CartContent — shared between sidebar & drawer
// ─────────────────────────────────────────────────────────────────────────────
function CartContent({
  cart,
  cartTotal,
  deliveryFee,
  totalAmount,
  language,
  t,
  updateQuantity,
  onCheckout,
}: {
  cart: ReturnType<typeof useCart>["cart"];
  cartTotal: number;
  deliveryFee: number;
  totalAmount: number;
  language: string;
  t: (key: string) => string;
  updateQuantity: (id: string | number, delta: number) => void;
  onCheckout: () => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="hidden md:flex px-8 py-5 border-b border-[#ebe3d9] bg-white/50 backdrop-blur-md">
        <h2 className={`text-xl font-black text-[#1a0a04] tracking-tight flex items-center gap-3 ${language === "UR" ? "flex-row-reverse" : ""}`}>
          <span className="w-8 h-px bg-brand-primary" />
          {t("yourOrder")}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 flex flex-col gap-5 no-scrollbar">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-[#a09080] opacity-70">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-5">
              <svg className="w-8 h-8 text-[#d4a898]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="font-bold text-lg text-[#3d2414] mb-1">{t("emptyCart")}</p>
            <p className="text-sm font-medium">Start adding items to your meal.</p>
          </div>
        ) : (
          cart.map((c, i) => (
            <div key={i} className={`flex gap-4 items-center group ${language === "UR" ? "flex-row-reverse" : ""}`}>
              <div className="w-16 h-16 bg-white border border-[#ebe3d9] shadow-sm rounded-2xl flex items-center justify-center relative overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Image src={c.item.image || "/images/placeholder-food.png"} alt={c.item.name || "Cart item"} fill className="object-cover" unoptimized />
              </div>
              <div className={`flex-1 min-w-0 ${language === "UR" ? "text-right" : ""}`}>
                <h4 className="font-bold text-[#1a0a04] text-sm leading-tight mb-1 truncate">{c.item.name}</h4>
                <span className="text-brand-primary font-black text-xs">{c.item.price}</span>
              </div>
              <div className={`flex items-center gap-1.5 bg-white border border-[#ebe3d9] rounded-full p-1 shrink-0 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                <button onClick={() => updateQuantity(c.item.id, -1)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#a09080] hover:bg-[#fdf2ec] hover:text-brand-primary">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                </button>
                <span className="text-sm font-black text-[#1a0a04] w-4 text-center">{c.quantity}</span>
                <button onClick={() => updateQuantity(c.item.id, 1)} className="w-6 h-6 rounded-full flex items-center justify-center text-[#a09080] hover:bg-[#fdf2ec] hover:text-brand-primary">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-6 md:px-8 py-7 bg-white border-t border-[#ebe3d9]">
        {[
          { label: t("subtotal"), value: `Rs. ${cartTotal.toLocaleString()}` },
          { label: t("deliveryFee"), value: `Rs. ${deliveryFee}` },
        ].map(({ label, value }) => (
          <div key={label} className={`flex justify-between items-center mb-3 ${language === "UR" ? "flex-row-reverse" : ""}`}>
            <span className="text-[#6b5a50] font-medium text-xs tracking-wide uppercase">{label}</span>
            <span className="text-[#1a0a04] font-black text-sm">{value}</span>
          </div>
        ))}
        <div className="w-full h-px border-t border-dashed border-[#d4a898] mb-5" />
        <div className={`flex justify-between items-center mb-8 ${language === "UR" ? "flex-row-reverse" : ""}`}>
          <span className="text-[#1a0a04] font-black text-xl">{t("total")}</span>
          <span className="text-brand-primary font-black text-3xl">Rs. {totalAmount.toLocaleString()}</span>
        </div>
        <button
          disabled={cart.length === 0}
          onClick={onCheckout}
          className="w-full py-4 rounded-2xl font-black text-white text-base bg-brand-primary shadow-xl shadow-brand-primary/20 disabled:opacity-50 active:scale-95 transition-all hover:shadow-[0_20px_40px_rgba(230,57,70,0.4)] hover:-translate-y-0.5"
        >
          {t("checkout")}
        </button>
      </div>
    </div>
  );
}
