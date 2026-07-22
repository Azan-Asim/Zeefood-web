"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

// ── Redux / Custom hooks ──────────────────────────────────────────────────────
import { useProducts, useProductFilters } from "@/hooks/useProducts";
import type { Product, ProductVariant } from "@/lib/store";

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
// Category display helpers
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  Desi: "/desi_compressed.webp",
  دیسی: "/desi_compressed.webp",
  Mashrobat: "/drinks_compressed.webp",
  مشروبات: "/drinks_compressed.webp",
  "Azafi Ashia": "/extra_items_compressed.webp",
  "اضافی اشیاء": "/extra_items_compressed.webp",
  Chat: "/chaat_compressed.webp",
  چاٹ: "/chaat_compressed.webp",
  Achar: "/achar_compressed.webp",
  اچار: "/achar_compressed.webp",
  Frozen: "/frozen_compressed.webp",
  فروزن: "/frozen_compressed.webp",
};

const CATEGORY_DISPLAY_MAP: Record<string, string> = {
  Desi: "دیسی",
  دیسی: "دیسی",
};

// ─────────────────────────────────────────────────────────────────────────────
// Pastel card themes (cycled by index)
// ─────────────────────────────────────────────────────────────────────────────
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
//             className="object-contain transition-transform duration-500"
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


// Retained temporarily as the previous card implementation for quick rollback.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      className={` relative flex min-h-[500px] w-full flex-col !overflow-hidden rounded-2xl border ${theme.border} bg-white shadow-sm transition-all duration-300 hover:shadow-2xl group
      `}
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full">
        <div className="product-card-image relative flex h-56 w-full shrink-0 items-center justify-center overflow-hidden rounded-t-2xl bg-white sm:h-64 md:h-72">
          <Image
            src={productImageUrl(product.image)}
            alt={product.name}
            fill
            className="h-full w-full object-cover object-center"
            sizes="(max-width: 768px) 100vw, 33vw"
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
export function VariantProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const variants = product.variants ?? [];
  const visibleVariants = expanded ? variants : variants.slice(0, 3);
  const hasManyVariants = variants.length > 3;
  const basePrice = product.price > 0 ? product.price : variants[0]?.price ?? 0;
  const displayPrice = basePrice > 0 ? `Rs. ${basePrice.toLocaleString()}` : "Ask";
  const isActive = product.status ? product.status === "ACTIVE" : true;
  const defaultVariant =
    variants.length > 0
      ? variants.reduce((lowest, option) => (option.price < lowest.price ? option : lowest), variants[0])
      : undefined;
  const handleSelect = (variant?: ProductVariant) => {
    if (!isActive) return;

    const key = variant?.id ?? "base";
    setSelectedKey(key);
    onAddToCart(product, variant);
    window.setTimeout(() => setSelectedKey(null), 650);
  };

  return (
    <article
      className="group relative h-[370px] w-full overflow-hidden rounded-[20px] bg-white shadow-[0_12px_30px_rgba(17,24,39,0.08)] ring-1 ring-brand-primary/10 transition-all duration-300 hover:-translate-y-1 hover:ring-brand-primary/25 hover:shadow-[0_18px_42px_rgba(248,114,5,0.14)] sm:h-[400px] xl:h-[425px]"
      style={{
        backgroundImage: `url(${productImageUrl(product.image)})`,
        backgroundSize: "cover",
        backgroundPosition: "center -64px",
        backgroundRepeat: "no-repeat",
      }}
      aria-label={product.name}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/28 via-brand-dark/3 to-transparent" />

      <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-brand-primary/12 bg-white/95 p-3 shadow-[0_14px_32px_rgba(17,24,39,0.12)] backdrop-blur-sm sm:inset-x-4 sm:bottom-4 sm:p-3.5">
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <span className="min-w-0 break-words text-[9px] font-black uppercase tracking-widest text-brand-primary">
            {product.category?.CategoryName ?? "Featured"}
          </span>
          <span className="shrink-0 text-[9px] font-black uppercase tracking-widest text-brand-dark/35">
            20-30 min
          </span>
        </div>

        <h3
          className="mb-2 line-clamp-2 break-words text-base font-black uppercase leading-[1.12] text-brand-dark transition-colors group-hover:text-brand-primary sm:text-lg"
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="mb-2 min-h-[34px]">
          {variants.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {visibleVariants.map((variant) => {
                const isSelected = selectedKey === variant.id;

                return (
                  <button
                    key={variant.id}
                    type="button"
                    disabled={!isActive || isSelected}
                    onClick={() => handleSelect(variant)}
                    className={`min-h-[30px] min-w-[58px] flex-1 rounded-xl border px-2 py-1 text-left text-[8px] font-black uppercase tracking-wider transition-all duration-300 sm:flex-none ${
                      isSelected
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-gray-200 bg-white text-brand-dark hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary"
                    } disabled:cursor-not-allowed disabled:opacity-80`}
                  >
                    <span className="flex items-center gap-1 break-words">
                      {isSelected && <span className="inline-block h-2 w-2 rounded-full bg-white" />}
                      {isSelected ? "Added" : variant.name}
                    </span>
                    <span className="block text-[7px] opacity-70">
                      Rs. {variant.price.toLocaleString()}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <button
              type="button"
              disabled={!isActive || selectedKey === "base"}
              onClick={() => handleSelect()}
              className={`flex min-h-[42px] w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition-all duration-300 ${
                selectedKey === "base"
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-gray-200 bg-white text-brand-dark hover:border-brand-primary hover:bg-brand-primary/5"
              }`}
            >
              <span>
                <span className="block text-[9px] font-black uppercase tracking-widest opacity-60">
                  Standard
                </span>
                <span className="mt-1 text-[11px] font-black uppercase tracking-wider">
                  {selectedKey === "base" ? "Added to cart" : "Single serving"}
                </span>
              </span>
              <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-brand-primary">
                Add
              </span>
            </button>
          )}
        </div>

        <p className="mb-2 text-xs font-bold text-brand-dark/60">
          From <span className="text-base font-black text-brand-primary">{displayPrice}</span>
        </p>

        <button
          type="button"
          disabled={!isActive || selectedKey === (defaultVariant?.id ?? "base")}
          onClick={() => handleSelect(defaultVariant)}
          className={`inline-flex min-h-9 w-full items-center justify-center rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-widest text-white transition-all duration-300 ${
            selectedKey === (defaultVariant?.id ?? "base")
              ? "bg-brand-primary"
              : "bg-brand-primary hover:-translate-y-0.5 hover:bg-[#e96500] hover:shadow-[0_14px_30px_rgba(248,114,5,0.26)]"
          } disabled:cursor-not-allowed disabled:opacity-80`}
        >
          {selectedKey === (defaultVariant?.id ?? "base") ? "Added" : "Order Now"}
        </button>

        {hasManyVariants && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-1.5 inline-flex min-h-8 w-full items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-[9px] font-black uppercase tracking-widest text-brand-dark transition-all hover:border-brand-primary hover:text-brand-primary"
          >
            {expanded ? "Less" : "More Info"}
          </button>
        )}

        <div className="mt-1.5 rounded-2xl border border-gray-100 bg-brand-surface/80">
          <button
            type="button"
            onClick={() => setDetailsOpen((value) => !value)}
            className="flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-1.5 text-left text-[9px] font-black uppercase tracking-widest text-brand-dark transition-colors hover:text-brand-primary"
            aria-expanded={detailsOpen}
          >
            <span>Details</span>
            <span className="text-brand-primary">{detailsOpen ? "Less" : "More"}</span>
          </button>

          {detailsOpen && (
            <div className="border-t border-gray-200 px-4 py-3">
              <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-wider text-brand-dark/55">
                <span>Category: {product.category?.CategoryName ?? "General"}</span>
                <span>Status: {isActive ? "Available" : "Unavailable"}</span>
              </div>
              {variants.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {variants.map((variant) => (
                    <span
                      key={variant.id}
                      className="rounded-xl border border-gray-200 bg-white px-2 py-1 text-[9px] font-black uppercase tracking-wider text-brand-dark/55"
                    >
                      {variant.name} - Rs. {variant.price.toLocaleString()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

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
function toCartItem(product: Product, variant?: ProductVariant) {
  const price =
    variant?.price ??
    (product.variants.length > 0
      ? Math.min(...product.variants.map((option) => option.price))
      : product.price);

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
    unitPrice: price,
    variants: product.variants.map((option) => ({
      id: option.id,
      name: option.name,
      price: option.price,
    })),
    selectedVariantId: variant?.id,
    selectedVariantName: variant?.name,
    details: { prepTime: "20-30 min", prepTimeUr: "20-30 منٹ" },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main OrderPage
// ─────────────────────────────────────────────────────────────────────────────
function cleanWhatsAppText(value: unknown) {
  return String(value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[^\S\n]+/g, " ")
    .trim();
}

export default function OrderPage() {
  const { t, language } = useLanguage();
  const { cart, addToCart, updateQuantity, updateVariant, cartTotal } = useCart();
  const searchParams = useSearchParams();

  const [userLocation] = useState<{ area: string; city: string; orderType: string } | null>(() => {
    if (typeof window === "undefined") return null;

    const loc = window.sessionStorage.getItem("userLocation");
    return loc ? JSON.parse(loc) : null;
  });
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [orderToast, setOrderToast] = useState<string | null>(null);
  const orderToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const [searchOpen, setSearchOpen] = useState(Boolean(searchQuery));

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
      if (orderToastTimer.current) clearTimeout(orderToastTimer.current);
    };
  }, []);

  // ── Cart helpers ────────────────────────────────────────────────────────
  const deliveryFee = cartTotal > 0 ? 150 : 0;
  const totalAmount = cartTotal + deliveryFee;

  const handleAddToCart = useCallback(
    (product: Product, variant?: ProductVariant) => {
      addToCart(toCartItem(product, variant));
      setOrderToast("Order placed successfully!");
      if (orderToastTimer.current) clearTimeout(orderToastTimer.current);
      orderToastTimer.current = setTimeout(() => setOrderToast(null), 2400);
      if (cart.length === 0) setIsMobileCartOpen(true);
    },
    [addToCart, cart.length]
  );

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;

    const loc = userLocation ?? { area: "Not specified", city: "Not specified", orderType: "delivery" };
    let msg = "New Order - Zee Food Gallery\n";
    msg += "---------------------------\n";
    msg += `Order Type: ${loc.orderType === "delivery" ? "Delivery" : "Pick-Up"}\n`;
    msg += `Location: ${cleanWhatsAppText(loc.area)}, ${cleanWhatsAppText(loc.city)}\n\n`;
    msg += "Items:\n";

    cart.forEach((c) => {
      const itemName = cleanWhatsAppText(c.item.name);
      const variantLabel = c.item.selectedVariantName ? ` (${cleanWhatsAppText(c.item.selectedVariantName)})` : "";
      msg += `- ${itemName}${variantLabel} x${c.quantity} - Rs. ${numericCartPrice(c.item).toLocaleString()}\n`;
    });

    msg += "\n";
    msg += `Subtotal: Rs. ${cartTotal.toLocaleString()}\n`;
    msg += `Delivery: Rs. ${deliveryFee}\n`;
    msg += `Total: Rs. ${totalAmount.toLocaleString()}\n\n`;
    msg += "Please confirm my order. Thank you.";

    window.open(`https://wa.me/923354153368?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  }, [cart, userLocation, cartTotal, deliveryFee, totalAmount]);

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="mt-20 flex min-h-[calc(100svh-80px)] flex-col bg-[#fbf7f2] font-sans lg:h-[calc(100svh-80px)] lg:overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-[1800px] flex-1 flex-col lg:overflow-hidden lg:flex-row 2xl:max-w-[1920px]">

        {/* ── Main Menu Panel ── */}
        <div className="flex-1 overflow-y-auto border-black/5 bg-[#fbf7f2] px-4 pb-32 pt-5 no-scrollbar sm:px-6 sm:pt-6 lg:border-r lg:pb-8 lg:pr-8 lg:pt-7 2xl:px-12">

          {/* Header */}
          <div className="mb-6 rounded-[26px] border border-brand-primary/10 bg-white/35 p-4 shadow-[0_14px_42px_rgba(17,24,39,0.045)] backdrop-blur-sm sm:mb-7 sm:p-5 2xl:mb-8">
            <h1 className={`mb-1 text-2xl font-black tracking-tight text-[#111827] lg:text-3xl ${language === "UR" ? "text-right" : ""}`}>
              {t("orderDelivery")}
            </h1>
            <p className={`mb-4 text-xs font-semibold text-[#111827]/70 lg:text-sm ${language === "UR" ? "text-right" : ""}`}>
              {t("exclusiveChefMeals")}
            </p>

            {/* Search Bar */}
            <div className="mb-4 flex justify-center">
              <div className={`relative max-w-2xl transition-all duration-500 ease-out ${searchOpen ? "w-full" : "w-40"}`}>
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                  className={`absolute left-0 top-0 z-10 flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-brand-primary font-black uppercase tracking-widest transition-all duration-300 ${searchOpen ? "pointer-events-none w-12 border-transparent text-brand-primary" : "w-full bg-white text-brand-primary shadow-[0_12px_24px_rgba(248,114,5,0.12)] hover:-translate-y-0.5 hover:bg-brand-primary/5"}`}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {!searchOpen && <span className="text-xs">Search</span>}
                </button>
                <input
                  type="search"
                  placeholder="Search dishes..."
                  defaultValue={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className={`h-12 rounded-2xl border border-brand-primary/10 bg-[#fffdf8]/80 py-3 pl-12 pr-4 text-sm font-bold text-brand-dark outline-none transition-all duration-500 placeholder:text-brand-dark/30 focus:border-brand-primary/40 focus:ring-2 focus:ring-brand-primary/10 ${searchOpen ? "w-full opacity-100" : "w-40 cursor-pointer opacity-0"}`}
                />
              </div>
            </div>

            {/* Category Bar */}
            <div className="relative flex items-center">
              <div
                className={`mx-auto flex gap-2.5 overflow-x-auto pb-1 no-scrollbar flex-nowrap justify-center scroll-smooth snap-x snap-mandatory ${language === "UR" ? "flex-row-reverse" : ""}`}
              >
                {categories.map((cat) => {
                  const normalizedCategory = cat === "ڈیس" ? "Desi" : cat;
                  const imageSrc = CATEGORY_IMAGE_MAP[cat] || CATEGORY_IMAGE_MAP[normalizedCategory];
                  const isActive = activeCategory === cat;
                  const displayName = CATEGORY_DISPLAY_MAP[cat] || CATEGORY_DISPLAY_MAP[normalizedCategory] || cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => changeCategory(cat)}
                      className={`relative flex-none min-w-[118px] max-w-[132px] flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-[22px] px-4 py-3 text-center text-sm font-black uppercase tracking-widest transition-all duration-300 ${imageSrc
                        ? isActive
                          ? "text-white shadow-[0_10px_30px_rgba(248,114,5,0.18)]"
                          : "border border-white/25 text-white"
                        : isActive
                          ? "border border-brand-primary/25 bg-transparent text-brand-primary"
                          : "border border-brand-primary/15 bg-transparent text-brand-primary hover:bg-brand-primary/5"
                        }`}
                      style={imageSrc ? {
                        backgroundImage: `url(${imageSrc})`,
                        backgroundPosition: "center 20%",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                      } : undefined}
                    >
                      {imageSrc && (
                        <span className={`absolute inset-0 ${isActive ? "bg-brand-primary/55" : "bg-black/30"}`} />
                      )}
                      <span className={`relative z-10 ${imageSrc ? "font-ama-dhaba" : "font-sans"}`}>
                        {String(displayName).toLowerCase() === "all" ? "ALL" : displayName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>          </div>

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
                  className="px-8 py-3.5 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-[0_15px_30px_rgba(248,114,5,0.35)] hover:-translate-y-0.5 transition-all"
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
          <div className="grid grid-cols-1 items-stretch gap-2.5 pt-3 sm:grid-cols-2 sm:gap-3 lg:gap-3 lg:pt-4 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1800px)]:grid-cols-5">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : filteredProducts.map((product) => (
                <VariantProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>

        {/* ── Desktop Cart Sidebar ── */}
        <div className="hidden h-full w-[400px] flex-col overflow-hidden border-l border-brand-primary/10 bg-[#fbf7f2] shadow-[-10px_0_40px_rgba(0,0,0,0.03)] lg:flex 2xl:w-[460px]">
          <CartContent
            cart={cart}
            cartTotal={cartTotal}
            deliveryFee={deliveryFee}
            totalAmount={totalAmount}
            language={language}
            t={t}
            updateQuantity={updateQuantity}
            updateVariant={updateVariant}
            onCheckout={handleCheckout}
          />
        </div>

        {/* ── Mobile Floating Cart Bar ── */}
        {orderToast && (
          <div className="fixed right-4 top-24 z-[260] max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-top-3 duration-300 sm:right-6">
            <div className="rounded-2xl border border-brand-primary/20 bg-white px-5 py-3 text-sm font-black text-brand-dark shadow-[0_18px_42px_rgba(17,24,39,0.14)]">
              <span className="mr-2 text-brand-primary">✓</span>
              {orderToast}
            </div>
          </div>
        )}

        {cart.length > 0 && !isMobileCartOpen && (
          <div className="fixed bottom-4 left-4 right-4 z-[90] animate-in fade-in slide-in-from-bottom-10 sm:bottom-6 lg:hidden">
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
        <div className={`fixed inset-0 z-[200] transition-transform duration-500 lg:hidden ${isMobileCartOpen ? "translate-y-0" : "translate-y-full"}`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileCartOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-[88svh] bg-[#fbf7f2] rounded-t-[28px] sm:rounded-t-[40px] flex flex-col overflow-hidden shadow-2xl">
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
                updateVariant={updateVariant}
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
function numericCartPrice(item: ReturnType<typeof useCart>["cart"][number]["item"]) {
  if (typeof item.unitPrice === "number") return item.unitPrice;
  if (typeof item.price === "number") return item.price;
  return Number.parseInt(String(item.price).replace(/[^0-9]/g, ""), 10) || 0;
}

function money(value: number) {
  return `Rs. ${value.toLocaleString()}`;
}

function CartContent({
  cart,
  cartTotal,
  deliveryFee,
  totalAmount,
  language,
  t,
  updateQuantity,
  updateVariant,
  onCheckout,
}: {
  cart: ReturnType<typeof useCart>["cart"];
  cartTotal: number;
  deliveryFee: number;
  totalAmount: number;
  language: string;
  t: (key: string) => string;
  updateQuantity: (id: string | number, delta: number, variantId?: string) => void;
  updateVariant: ReturnType<typeof useCart>["updateVariant"];
  onCheckout: () => void;
}) {
  const [openDetailKey, setOpenDetailKey] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#fbf7f2]">
      <div className="hidden border-b border-brand-primary/10 bg-[#fffdf8]/85 px-6 py-6 md:block 2xl:px-8">
        <h2 className={`flex items-center gap-3 text-xl font-black tracking-tight text-brand-dark ${language === "UR" ? "flex-row-reverse text-right" : ""}`}>
          <span className="h-px w-8 bg-brand-primary" />
          {t("yourOrder")}
        </h2>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 no-scrollbar sm:px-6 md:px-6 2xl:px-8">
        {cart.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center text-brand-dark/70">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
              <svg className="h-8 w-8 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="mb-1 text-lg font-black text-brand-dark">{t("emptyCart")}</p>
            <p className="max-w-xs text-sm font-medium leading-6">Choose a dish and tap an option to build your order.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cart.map((c, i) => {
              const cartKey = `${c.item.id}-${c.item.selectedVariantId ?? "base"}-${i}`;
              const unitPrice = numericCartPrice(c.item);
              const lineTotal = unitPrice * c.quantity;
              const selectedVariant =
                c.item.selectedVariantName ||
                c.item.variants?.find((variant) => variant.id === c.item.selectedVariantId)?.name ||
                "Standard";
              const hasCartDetails = Boolean(c.item.details?.prepTime) || Boolean(c.item.category) || Boolean(c.item.variants?.length);
              const cartDetailsOpen = openDetailKey === cartKey;

              return (
                <div
                  key={cartKey}
                  className={`rounded-2xl border border-gray-200 bg-white p-3 shadow-[0_12px_32px_rgba(17,24,39,0.045)] transition-all duration-300 hover:border-brand-primary/20 ${language === "UR" ? "text-right" : ""}`}
                >
                  <div className={`grid grid-cols-[64px_minmax(0,1fr)] gap-3 sm:grid-cols-[72px_minmax(0,1fr)] ${language === "UR" ? "direction-rtl" : ""}`}>
                    <div className="cart-item-image relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-brand-primary/10 bg-[#fbf7f2] sm:h-[72px] sm:w-[72px]">
                      <Image
                        src={c.item.image || "/images/placeholder-food.png"}
                        alt={c.item.name || "Cart item"}
                        fill
                        className="!h-full !w-full !object-contain !object-center"
                        style={{ objectFit: "contain", objectPosition: "center" }}
                        unoptimized
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className={`flex items-start justify-between gap-2 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                        <div className="min-w-0">
                          <h4 className="line-clamp-2 text-sm font-black leading-tight text-brand-dark">
                            {c.item.name}
                          </h4>
                          <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-brand-primary">
                            {selectedVariant}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-xl bg-brand-primary/10 px-2 py-1 text-[10px] font-black text-brand-primary">
                          x{c.quantity}
                        </span>
                      </div>

                      {hasCartDetails && (
                        <button
                          type="button"
                          onClick={() => setOpenDetailKey(cartDetailsOpen ? null : cartKey)}
                          className="mt-2 rounded-xl border border-gray-200 bg-white px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-brand-dark/55 transition-colors hover:border-brand-primary hover:text-brand-primary"
                          aria-expanded={cartDetailsOpen}
                        >
                          {cartDetailsOpen ? "Hide details" : "Details"}
                        </button>
                      )}

                      {c.item.variants && c.item.variants.length > 0 && (
                        <div className={`mt-2 flex flex-wrap items-center gap-1.5 ${language === "UR" ? "justify-end" : ""}`}>
                          {c.item.variants.slice(0, 4).map((variant) => (
                              <button
                                key={variant.id}
                                type="button"
                                onClick={() => updateVariant(c.item.id, variant, c.item.selectedVariantId)}
                                className={`rounded-xl border px-2 py-1 text-[8px] font-black uppercase tracking-wider transition-all ${
                                  c.item.selectedVariantId === variant.id
                                    ? "border-brand-primary bg-brand-primary text-white"
                                    : "border-gray-200 bg-[#fbf7f2] text-brand-dark/55 hover:border-brand-primary hover:bg-white hover:text-brand-primary"
                                }`}
                                title={`Switch to ${variant.name}`}
                              >
                                {variant.name}
                              </button>
                            ))}
                        </div>
                      )}

                      <div className="mt-3 grid grid-cols-1 items-stretch gap-2 rounded-2xl bg-[#fbf7f2] p-2 min-[420px]:grid-cols-[1fr_auto_1fr] min-[420px]:items-center">
                        <div>
                          <span className="block text-[8px] font-black uppercase tracking-widest text-brand-dark/40">Price</span>
                          <span className="block text-xs font-black text-brand-dark">{money(unitPrice)}</span>
                        </div>

                        <div className={`flex items-center justify-center gap-1 rounded-xl bg-white p-1 ${language === "UR" ? "flex-row-reverse" : ""}`}>
                          <button
                            onClick={() => updateQuantity(c.item.id, -1, c.item.selectedVariantId)}
                            className="flex h-6 w-6 items-center justify-center rounded-xl text-brand-dark transition-colors hover:bg-[#fbf7f2] hover:text-brand-primary"
                            aria-label="Decrease quantity"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-5 text-center text-sm font-black text-brand-dark">{c.quantity}</span>
                          <button
                            onClick={() => updateQuantity(c.item.id, 1, c.item.selectedVariantId)}
                            className="flex h-6 w-6 items-center justify-center rounded-xl text-brand-dark transition-colors hover:bg-[#fbf7f2] hover:text-brand-primary"
                            aria-label="Increase quantity"
                          >
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <div className="min-[420px]:text-right">
                          <span className="block text-[8px] font-black uppercase tracking-widest text-brand-dark/40">Total</span>
                          <span className="block text-xs font-black text-brand-primary">{money(lineTotal)}</span>
                        </div>
                      </div>

                      {cartDetailsOpen && (
                        <div className="mt-2 rounded-2xl border border-gray-200 bg-white p-3 text-[10px] font-bold leading-5 text-brand-dark/60">
                          <div className="grid gap-1">
                            {Boolean(c.item.category) && <span>Category: {String(c.item.category)}</span>}
                            {c.item.details?.prepTime && <span>Prep time: {c.item.details.prepTime}</span>}
                            <span>Selected: {selectedVariant}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-brand-primary/10 bg-[#fffdf8]/85 px-4 py-5 sm:px-6 md:px-6 2xl:px-8">
        <div className="rounded-2xl border border-brand-primary/10 bg-[#fbf7f2] p-4">
          {[
            { label: t("subtotal"), value: `Rs. ${cartTotal.toLocaleString()}` },
            { label: t("deliveryFee"), value: `Rs. ${deliveryFee}` },
          ].map(({ label, value }) => (
            <div key={label} className={`mb-3 flex items-center justify-between gap-4 ${language === "UR" ? "flex-row-reverse" : ""}`}>
              <span className="text-xs font-bold uppercase tracking-wide text-brand-dark/55">{label}</span>
              <span className="text-sm font-black text-brand-dark">{value}</span>
            </div>
          ))}
          <div className="mb-4 h-px w-full border-t border-dashed border-brand-primary/50" />
          <div className={`flex items-end justify-between gap-4 ${language === "UR" ? "flex-row-reverse" : ""}`}>
            <span className="text-lg font-black text-brand-dark">{t("total")}</span>
            <span className="text-2xl font-black text-brand-primary sm:text-3xl">Rs. {totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <button
          disabled={cart.length === 0}
          onClick={onCheckout}
          className="mt-4 flex w-full items-center justify-center rounded-2xl bg-brand-primary px-5 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-brand-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(248,114,5,0.32)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
        >
          {t("checkout")}
        </button>
      </div>
    </div>
  );
}
