"use client";

import { useState, useEffect, useCallback, useRef, type MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { createPortal } from "react-dom"; // Added for robust modal rendering

// ── Redux / Custom hooks ──────────────────────────────────────────────────────
import { useProducts, useProductFilters } from "@/hooks/useProducts";
import type { Product, ProductVariant } from "@/lib/store";

type ProductCardDetails = {
  recipe?: string;
  ingredients?: string[];
  prepTime?: string;
  nutritionalInfo?: string;
};

type ProductWithOptionalDetails = Product & {
  details?: ProductCardDetails;
};

// ─────────────────────────────────────────────────────────────────────────────
// Image helper — DRM images are served from a relative path
// ─────────────────────────────────────────────────────────────────────────────
const DRM_BASE = "https://drm.devsinntechnologies.com";

function getDishFallbackImage(name?: string, categoryName?: string): string {
  const n = (name || "").toLowerCase();
  const c = (categoryName || "").toLowerCase();

  if (n.includes("samosa") || n.includes("سموسہ")) return "/ssamosa.png";
  if (n.includes("biryani") || n.includes("بریانی")) return "/biryani.png";
  if (n.includes("pulao") || n.includes("پلاؤ") || n.includes("plao")) return "/chickenpulao.webp";
  if (n.includes("nugget") || n.includes("نِگٹس") || n.includes("nugit")) return "/chickennuggets.webp";
  if (n.includes("dahi bhall") || n.includes("دہی بھلے") || n.includes("bhala")) return "/dahibhallay.webp";
  if (n.includes("dal") || n.includes("daal") || n.includes("دال")) return "/dalrice.webp";
  if (n.includes("kabab") || n.includes("kebab") || n.includes("کباب") || n.includes("seekh")) return "/seekhkabab.webp";
  if (n.includes("roll") || n.includes("رول")) return "/springrolls.webp";
  if (n.includes("gol gapp") || n.includes("گول گپے")) return "/golgappy.png";
  if (n.includes("chutni") || n.includes("چٹنی")) return "/chutni.png";
  if (n.includes("bottal") || n.includes("bottle") || c.includes("mashrobat") || c.includes("مشروبات")) return "/drinks_compressed.webp";
  if (n.includes("pan masala") || c.includes("azafi") || c.includes("اضافی")) return "/extra_items_compressed.webp";
  if (c.includes("chat") || c.includes("چاٹ")) return "/chaat_compressed.webp";
  if (c.includes("achar") || c.includes("اچار")) return "/achar_compressed.webp";
  if (c.includes("frozen") || c.includes("فروزن")) return "/frozen_compressed.webp";
  return "/desi_compressed.webp";
}

function productImageUrl(image?: string | null, productName?: string, categoryName?: string): string {
  if (!image || typeof image !== 'string' || image.trim() === "") {
    return getDishFallbackImage(productName, categoryName);
  }
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/uploads/") || image.startsWith("uploads/")) {
    return `${DRM_BASE}/${image.replace(/^\//, "")}`;
  }
  if (image.startsWith("/")) return image;
  if (image.startsWith("images/")) return `/${image}`;
  return `${DRM_BASE}/${image}`;
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
// Modals using React Portals to guarantee perfect viewport centering
// ─────────────────────────────────────────────────────────────────────────────
function ProductQuickAddModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
  onSelectVariant,
  quantity,
  onIncrease,
  onDecrease,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  product: ProductWithOptionalDetails;
  selectedVariant?: ProductVariant;
  onSelectVariant: (variant?: ProductVariant) => void;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onConfirm: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  const variants = product.variants ?? [];
  const activeVariant = selectedVariant ?? variants[0];
  const detailText = product.details?.recipe || product.details?.nutritionalInfo || "Freshly prepared with premium ingredients and bold flavors.";

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 sm:p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-[750px] max-h-[90vh] overflow-y-auto rounded-[24px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-white via-orange-50/70 to-white px-5 py-4">
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-primary">Customize your order</p>
            <h3 className="text-lg font-black text-brand-dark sm:text-xl">{product.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-dark transition-colors hover:bg-brand-primary/10 hover:text-brand-primary"
            aria-label="Close"
          >
            <span className="text-xl font-black">×</span>
          </button>
        </div>

        {/* CSS Grid for side-by-side layout on desktop/tablet, stacked on mobile */}
        <div className="grid gap-5 p-5 sm:grid-cols-[240px_1fr] md:grid-cols-[280px_1fr] items-start">
          
          {/* Left Side: Image - Fixed to object-contain to show full image */}
          <div className="relative mx-auto h-[180px] w-full max-w-[280px] overflow-hidden rounded-[20px] bg-[#fbf7f2] sm:h-full sm:min-h-[220px]">
            <Image
              src={productImageUrl(product.image, product.name, product.category?.CategoryName)}
              alt={product.name}
              fill
              className="object-contain p-2" 
              unoptimized
            />
          </div>

          {/* Right Side: Description and Controls */}
          <div className="flex flex-col text-left h-full justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] text-brand-primary">
                  {product.category?.CategoryName ?? "Featured"}
                </span>
                <span className="text-xs font-semibold text-brand-dark/60">{product.details?.prepTime ?? "Freshly prepared"}</span>
              </div>
              
              <p className="text-sm font-semibold leading-6 text-brand-dark/70">{detailText}</p>
              
              {product.details?.ingredients && product.details.ingredients.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.details.ingredients.slice(0, 6).map((ingredient) => (
                    <span key={ingredient} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-bold text-brand-dark/70 shadow-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5">
              {variants.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-brand-dark/50">Choose size</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => {
                      const isActive = activeVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => onSelectVariant(variant)}
                          className={`min-w-[90px] rounded-[16px] border px-3 py-2 text-center transition-all duration-300 ${
                            isActive
                              ? "border-brand-primary bg-brand-primary text-white shadow-[0_8px_20px_rgba(248,114,5,0.2)]"
                              : "border-gray-200 bg-brand-surface text-brand-dark hover:border-brand-primary hover:text-brand-primary"
                          }`}
                        >
                          <span className="block text-[10px] font-black uppercase tracking-[0.2em]">{variant.name}</span>
                          <span className={`mt-0.5 block text-[11px] font-bold ${isActive ? "text-white/90" : "text-brand-dark/70"}`}>
                            Rs. {variant.price.toLocaleString()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="rounded-[20px] border border-brand-primary/10 bg-brand-surface/80 p-4">
                {/* Fixed perfectly centered, identically sized buttons */}
                <div className="flex flex-col items-center justify-center gap-3 w-full">
                  <div className="flex w-full max-w-[220px] h-[40px] items-center justify-between gap-4 rounded-full border border-brand-primary/20 bg-white px-3 shadow-sm">
                    <button
                      type="button"
                      onClick={onDecrease}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-surface text-brand-dark transition-colors hover:bg-brand-primary/10 hover:text-brand-primary text-lg"
                    >
                      −
                    </button>
                    <span className="min-w-6 text-center text-base font-black text-brand-dark">{quantity}</span>
                    <button
                      type="button"
                      onClick={onIncrease}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-surface text-brand-dark transition-colors hover:bg-brand-primary/10 hover:text-brand-primary text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={onConfirm}
                    className="flex w-full max-w-[220px] h-[40px] items-center justify-center rounded-full bg-brand-primary px-7 text-xs font-black uppercase tracking-[0.24em] text-white shadow-[0_12px_28px_rgba(248,114,5,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e96500]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function ItemManagementModal({
  isOpen,
  onClose,
  onRemove,
  product,
  selectedVariant,
  quantity,
}: {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  product: ProductWithOptionalDetails;
  selectedVariant?: ProductVariant;
  quantity: number;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3 sm:p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-[400px] rounded-[24px] border border-brand-primary/10 bg-white/95 p-5 shadow-2xl text-left"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.32em] text-brand-primary">Manage item</p>
            <h3 className="mt-1 text-lg font-black text-brand-dark">Remove this item?</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-surface text-brand-dark transition-colors hover:bg-brand-primary/10 hover:text-brand-primary"
            aria-label="Close"
          >
            <span className="text-xl font-black">×</span>
          </button>
        </div>

        <div className="mt-3 flex items-center gap-4 rounded-[18px] border border-brand-primary/10 bg-brand-surface/70 p-3">
          <div className="relative h-16 w-16 overflow-hidden rounded-[14px] bg-[#fbf7f2] shrink-0 shadow-sm">
            <Image
              src={productImageUrl(product.image, product.name, product.category?.CategoryName)}
              alt={product.name}
              fill
              className="object-contain p-1"
              unoptimized
            />
          </div>
          <div>
            <p className="text-sm font-black text-brand-dark line-clamp-2 leading-tight">{product.name}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-primary">
              {selectedVariant?.name ?? "Standard"}
            </p>
            <p className="mt-1 text-xs font-semibold text-brand-dark/60">Quantity: {quantity}</p>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium leading-6 text-brand-dark/70">
          This will remove the selected item from your cart. You can always add it back later.
        </p>

        <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full flex-1 rounded-full border border-gray-200 bg-white px-4 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-brand-dark transition-colors hover:border-brand-primary hover:text-brand-primary text-center shadow-sm sm:max-w-[160px]"
          >
            Keep item
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="w-full flex-1 rounded-full bg-brand-primary px-4 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white shadow-[0_12px_24px_rgba(248,114,5,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e96500] text-center"
          >
            Remove item
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ─────────────────────────────────────────────────────────────────────────────
// VariantProductCard — Main card used (Shortened & Compacted)
// ─────────────────────────────────────────────────────────────────────────────
export function VariantProductCard({
  product,
  onAddToCart,
}: {
  product: ProductWithOptionalDetails;
  onAddToCart: (product: Product, variant?: ProductVariant) => void;
}) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const [modalQuantity, setModalQuantity] = useState(1);
  const { cart, removeFromCart } = useCart();
  const variants = product.variants ?? [];

  const detailItems = [
    product.details?.prepTime ? `Prep time: ${product.details.prepTime}` : null,
    product.details?.recipe ? product.details.recipe : null,
    product.details?.nutritionalInfo ? product.details.nutritionalInfo : null,
  ].filter(Boolean);

  const ingredientItems = product.details?.ingredients?.filter(Boolean) ?? [];
  const hasDetails = detailItems.length > 0 || ingredientItems.length > 0;

  const basePrice = product.price > 0 ? product.price : variants[0]?.price ?? 0;
  const displayPrice = basePrice > 0 ? `Rs. ${basePrice.toLocaleString()}` : "Ask";
  const isActive = product.status ? product.status === "ACTIVE" : true;

  useEffect(() => {
    if (!variants.length) {
      setSelectedVariant(undefined);
      return;
    }

    if (!selectedVariant || !variants.some((variant) => variant.id === selectedVariant.id)) {
      setSelectedVariant(variants[0]);
    }
  }, [selectedVariant, variants]);

  const getCartQty = (variantId?: string): number => {
    const key = `${product.id}:${variantId ?? "base"}`;
    const entry = cart.find(
      (e) => `${e.item.id}:${e.item.selectedVariantId ?? "base"}` === key
    );
    return entry?.quantity ?? 0;
  };

  const activeVariant = selectedVariant ?? variants[0];
  const currentQty = getCartQty(activeVariant?.id);

  const handleOpenModal = (event: ReactMouseEvent<HTMLElement>, variant?: ProductVariant) => {
    if (!isActive) return;
    event.preventDefault(); // Added to prevent default link behavior if any
    setSelectedVariant(variant);
    setModalQuantity(1);
    setIsModalOpen(true);
  };

  const handleConfirmAddToCart = () => {
    for (let index = 0; index < modalQuantity; index += 1) {
      onAddToCart(product, activeVariant);
    }
    setModalQuantity(1);
    setIsModalOpen(false);
  };

  const handleQuickPlus = (event: ReactMouseEvent<HTMLElement>) => {
    if (!isActive) return;
    event.preventDefault();
    onAddToCart(product, activeVariant);
  };

  const handleQuickMinus = (event: ReactMouseEvent<HTMLElement>) => {
    if (!isActive || currentQty <= 0) return;
    event.preventDefault();
    setIsManageOpen(true);
  };

  const handleRemove = () => {
    removeFromCart(product.id, activeVariant?.id);
    setIsManageOpen(false);
  };

  return (
    <>
      <article
        // Significantly reduced height for a shorter, beautiful card
        className="group relative h-[260px] sm:h-[280px] xl:h-[295px] w-full overflow-hidden rounded-[18px] bg-white shadow-[0_4px_16px_rgba(17,24,39,0.06)] ring-1 ring-brand-primary/10 transition-all duration-300 hover:-translate-y-1 hover:ring-brand-primary/25 hover:shadow-[0_12px_24px_rgba(248,114,5,0.12)]"
        style={{
          backgroundImage: `url(${productImageUrl(product.image, product.name, product.category?.CategoryName)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-label={product.name}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-brand-dark/5 to-transparent transition-opacity duration-300" />

        {/* Tighter internal padding for compact look */}
        <div className="absolute inset-x-2 bottom-2 z-10 rounded-[14px] border border-white/20 bg-white/95 p-2.5 shadow-lg backdrop-blur-md sm:inset-x-2.5 sm:bottom-2.5">
          <div className="mb-1 flex items-center justify-between gap-1">
            <span className="min-w-0 break-words text-[8px] font-black uppercase tracking-widest text-brand-primary">
              {product.category?.CategoryName ?? "Featured"}
            </span>
            <span className="shrink-0 text-[8px] font-black uppercase tracking-widest text-brand-dark/40">
              20-30 min
            </span>
          </div>

          <h3
            className="mb-1.5 line-clamp-1 break-words text-sm font-black uppercase leading-tight text-brand-dark transition-colors group-hover:text-brand-primary"
            title={product.name}
          >
            {product.name}
          </h3>

          {variants.length > 0 && (
            <div className="mb-1.5 max-h-[46px] overflow-y-auto no-scrollbar">
              <div className="flex flex-wrap gap-1">
                {variants.map((variant) => {
                  const cartQty = getCartQty(variant.id);
                  const isAdded = cartQty > 0;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      disabled={!isActive}
                      onClick={(event) => handleOpenModal(event, variant)}
                      className={`relative min-h-[24px] min-w-[48px] flex-1 rounded-[8px] border px-1.5 py-0.5 text-left text-[7px] font-black uppercase tracking-wider transition-all duration-200 sm:flex-none ${
                        isAdded
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "border-gray-200 bg-white text-brand-dark hover:border-brand-primary hover:bg-brand-primary/5 hover:text-brand-primary"
                      } disabled:cursor-not-allowed disabled:opacity-80`}
                    >
                      <span className="flex items-center gap-1 break-words leading-none">
                        {isAdded && <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />}
                        {variant.name}
                      </span>
                      <span className="mt-0.5 block text-[7px] opacity-80 leading-none">
                        Rs. {variant.price.toLocaleString()}
                      </span>
                      {isAdded && cartQty > 1 && (
                        <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[7px] font-black text-brand-primary shadow-sm ring-1 ring-brand-primary/30">
                          {cartQty}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-1 mb-1.5">
            <p className="text-[9px] font-bold text-brand-dark/50">
              From <span className="text-sm font-black text-brand-primary">{displayPrice}</span>
            </p>
          </div>

          {/* EXACT IDENTICAL BUTTON DIMENSIONS FOR PERFECT CENTERING */}
          <div className="flex w-full items-center justify-center mt-1">
            {currentQty > 0 ? (
              <div className="flex w-full h-[32px] items-center justify-between rounded-full border border-brand-primary/20 bg-brand-surface px-1.5">
                <button
                  type="button"
                  onClick={(event) => handleQuickMinus(event)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-white hover:text-brand-primary shadow-sm"
                  aria-label="Remove item"
                >
                  −
                </button>
                <span className="text-xs font-black text-brand-dark">{currentQty}</span>
                <button
                  type="button"
                  onClick={(event) => handleQuickPlus(event)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-brand-dark transition-colors hover:bg-white hover:text-brand-primary shadow-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                type="button"
                disabled={!isActive}
                onClick={(event) => handleOpenModal(event, activeVariant)}
                className="flex w-full h-[32px] items-center justify-center rounded-full bg-brand-primary px-4 text-[9px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e96500] hover:shadow-[0_8px_16px_rgba(248,114,5,0.25)] disabled:cursor-not-allowed disabled:opacity-80"
              >
                Add to Cart
              </button>
            )}
          </div>

          {hasDetails && (
            <div className="mt-1.5 rounded-[8px] border border-gray-100 bg-brand-surface/80">
              <button
                type="button"
                onClick={() => setDetailsOpen((value) => !value)}
                className="flex w-full items-center justify-between gap-1 rounded-[8px] px-2 py-1 text-left text-[7px] font-black uppercase tracking-widest text-brand-dark transition-colors hover:text-brand-primary"
                aria-expanded={detailsOpen}
              >
                <span>Details</span>
                <span className="text-brand-primary">{detailsOpen ? "Less" : "More"}</span>
              </button>

              {detailsOpen && (
                <div className="border-t border-gray-200 px-2 py-1.5">
                  <div className="space-y-1 text-[8px] font-bold uppercase tracking-wider text-brand-dark/55">
                    {detailItems.map((detail) => (
                      <p key={detail}>{detail}</p>
                    ))}
                  </div>
                  {ingredientItems.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {ingredientItems.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wider text-brand-dark/60 shadow-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </article>

      {/* Render modals directly alongside the card, portaled to the body automatically by the component */}
      <ProductQuickAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        selectedVariant={activeVariant}
        onSelectVariant={(variant) => setSelectedVariant(variant)}
        quantity={modalQuantity}
        onIncrease={() => setModalQuantity((value) => value + 1)}
        onDecrease={() => setModalQuantity((value) => Math.max(1, value - 1))}
        onConfirm={handleConfirmAddToCart}
      />

      <ItemManagementModal
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        onRemove={handleRemove}
        product={product}
        selectedVariant={activeVariant}
        quantity={currentQty}
      />
    </>
  );
}

function SkeletonCard() {
  return (
    <div className="relative flex flex-col items-center text-center p-6 rounded-[18px] bg-gray-100 border border-gray-200 animate-pulse h-[260px]">
      <div className="h-full w-full bg-gray-200 rounded-xl" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CartItem adapter
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
    image: productImageUrl(product.image, product.name, product.category?.CategoryName),
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
export default function OrderPage() {
  const { t, language } = useLanguage();
  const { cart, addToCart, updateQuantity, updateVariant, cartTotal } = useCart();
  const searchParams = useSearchParams();

  const [orderToast, setOrderToast] = useState<string | null>(null);
  const orderToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleAddToCart = useCallback(
    (product: Product, variant?: ProductVariant) => {
      addToCart(toCartItem(product, variant));
      setOrderToast("Item added to cart!");
      if (orderToastTimer.current) clearTimeout(orderToastTimer.current);
      orderToastTimer.current = setTimeout(() => setOrderToast(null), 2400);
    },
    [addToCart]
  );

  return (
    <div className="mt-20 flex min-h-[calc(100svh-80px)] flex-col bg-[#fbf7f2] font-sans pb-28">
      <div className="relative mx-auto flex w-full max-w-[1720px] flex-1 flex-col px-3 sm:px-4 lg:px-8 pt-4 sm:pt-6 lg:pt-8">

        {/* ── Main Menu Panel (Full Width) ── */}
        <div className="flex-1 bg-[#fbf7f2]">

          {/* Header */}
          <div className="mb-5 rounded-[20px] border border-brand-primary/10 bg-white/35 p-3.5 shadow-[0_8px_24px_rgba(17,24,39,0.03)] backdrop-blur-sm sm:mb-6 sm:p-5">
            <h1 className={`mb-1 text-2xl font-black tracking-tight text-[#111827] lg:text-3xl ${language === "UR" ? "text-right" : ""}`}>
              {t("orderDelivery")}
            </h1>
            <p className={`mb-4 text-xs font-semibold text-[#111827]/70 lg:text-sm ${language === "UR" ? "text-right" : ""}`}>
              {t("exclusiveChefMeals")}
            </p>

            {/* Static Full-Width Search Bar */}
            <div className="mb-4 flex justify-center w-full">
              <div className="relative w-full max-w-xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <svg className="h-5 w-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Search dishes (e.g. Biryani, بریانی)..."
                  defaultValue={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-11 rounded-full border border-brand-primary/20 bg-white/90 py-2.5 pl-11 pr-4 text-sm font-bold text-brand-dark outline-none shadow-sm transition-all duration-300 placeholder:text-brand-dark/40 focus:border-brand-primary/40 focus:bg-white focus:ring-4 focus:ring-brand-primary/10"
                />
              </div>
            </div>

            {/* Category Bar */}
            <div className="relative flex items-center">
              <div
                className={`mx-auto flex max-w-full gap-2 overflow-x-auto pb-1 no-scrollbar flex-nowrap justify-start scroll-smooth snap-x snap-mandatory lg:justify-center ${language === "UR" ? "flex-row-reverse" : ""}`}
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
                      className={`relative flex-none min-w-[100px] max-w-[120px] flex-shrink-0 flex-col items-center justify-center overflow-hidden rounded-[16px] px-2.5 py-2.5 text-center text-[11px] font-black uppercase tracking-widest transition-all duration-300 sm:min-w-[110px] sm:px-3 sm:py-3 2xl:min-w-[120px] ${imageSrc
                        ? isActive
                          ? "text-white shadow-[0_8px_20px_rgba(248,114,5,0.18)]"
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
            </div>          
          </div>

          {/* Error State */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-7 h-7 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
                </svg>
              </div>
              <div>
                <p className="font-black text-brand-dark text-lg mb-1">Failed to load menu</p>
                <p className="text-brand-dark/50 text-xs mb-5">{error}</p>
                <button
                  onClick={() => refetch()}
                  className="px-6 py-3 bg-brand-primary text-white font-black text-xs uppercase tracking-widest rounded-full shadow-md hover:shadow-[0_12px_24px_rgba(248,114,5,0.3)] hover:-translate-y-0.5 transition-all"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
              <span className="text-5xl">🍽️</span>
              <p className="font-black text-brand-dark text-lg">No dishes found</p>
              <p className="text-brand-dark/40 text-xs">Try a different search or category.</p>
            </div>
          )}

          {/* Product Grid - Reduced Gap to make it tighter (gap-1.5 sm:gap-2) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1.5 sm:gap-2 pt-2 items-stretch">
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
              : filteredProducts.map((product) => (
                <VariantProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
          </div>
        </div>

        {/* ── Add to Cart Toast ── */}
        {orderToast && (
          <div className="fixed right-4 top-20 z-[260] max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-top-3 duration-300 sm:right-6">
            <div className="rounded-full border border-brand-primary/20 bg-white px-5 py-2.5 text-xs font-black uppercase tracking-widest text-brand-dark shadow-[0_14px_32px_rgba(17,24,39,0.12)]">
              <span className="mr-2 text-brand-primary">✓</span>
              {orderToast}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CartContent Component (Unchanged from your preferred state)
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
  language,
  t,
  updateQuantity,
  updateVariant,
}: {
  cart: ReturnType<typeof useCart>["cart"];
  language: string;
  t: (key: string) => string;
  updateQuantity: (id: string | number, delta: number, variantId?: string) => void;
  updateVariant: ReturnType<typeof useCart>["updateVariant"];
}) {
  const [openDetailKey, setOpenDetailKey] = useState<string | null>(null);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#fbf7f2]">
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 no-scrollbar sm:px-6">
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
                        className="!h-full !w-full !object-cover !object-center"
                        style={{ objectFit: "cover", objectPosition: "center" }}
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
                          {c.item.variants.map((variant) => (
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
    </div>
  );
}