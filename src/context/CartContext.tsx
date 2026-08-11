"use client";

import React, { createContext, useContext, useEffect, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";

export type CartVariant = {
  id: string;
  name: string;
  price: number;
};

export type CartProduct = {
  id: string | number;
  name?: string;
  nameUr?: string;
  price: string | number;
  unitPrice?: number;
  image?: string | null;
  category?: unknown;
  description?: string;
  descriptionUr?: string;
  slug?: string;
  popular?: boolean;
  variants?: CartVariant[];
  selectedVariantId?: string;
  selectedVariantName?: string;
  details?: {
    prepTime: string;
    prepTimeUr: string;
  };
};

export interface CartItem {
  item: CartProduct;
  quantity: number;
  variantQuantities?: { [variantId: string]: number };
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (itemId: string | number, variantId?: string) => void;
  updateQuantity: (itemId: string | number, delta: number, variantId?: string) => void;
  updateVariant: (itemId: string | number, variant: CartVariant, currentVariantId?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  setVariantQuantities?: (itemId: string | number, quantities: { [variantId: string]: number }, rawItem: CartProduct, baseQty?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(price: string | number | undefined): number {
  if (typeof price === "number") return price;
  if (!price) return 0;
  return Number.parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;
}

function lineKey(item: CartProduct) {
  return `${item.id}:${item.selectedVariantId ?? "base"}`;
}

function formatPrice(value: number) {
  return `Rs. ${value.toLocaleString()}`;
}

function normalizeCartItem(item: CartProduct): CartProduct {
  const variant = item.selectedVariantId
    ? item.variants?.find((option) => option.id === item.selectedVariantId)
    : undefined;
  const unitPrice = variant?.price ?? item.unitPrice ?? parsePrice(item.price);

  return {
    ...item,
    unitPrice,
    price: formatPrice(unitPrice),
    selectedVariantName: variant?.name ?? item.selectedVariantName,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const triggerToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMessage("Item added to cart!");
    toastTimer.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const addToCart = (rawItem: CartProduct) => {
    const item = normalizeCartItem(rawItem);
    const productId = item.id;
    const variantId = item.selectedVariantId;

    setCart((prev) => {
      const existingIndex = prev.findIndex((entry) => String(entry.item.id) === String(productId));

      if (existingIndex > -1) {
        return prev.map((entry, idx) => {
          if (idx !== existingIndex) return entry;
          
          const newQuantities = { ...(entry.variantQuantities || {}) };
          if (variantId) {
            newQuantities[variantId] = (newQuantities[variantId] || 0) + 1;
          }
          const totalQty = variantId 
            ? Object.values(newQuantities).reduce((a, b) => a + b, 0)
            : entry.quantity + 1;

          return {
            ...entry,
            quantity: totalQty,
            variantQuantities: newQuantities,
            item,
          };
        });
      }

      const initialQuantities = variantId ? { [variantId]: 1 } : {};
      return [
        ...prev,
        {
          item,
          quantity: 1,
          variantQuantities: initialQuantities,
        },
      ];
    });

    triggerToast();
  };

  const setVariantQuantities = (
    itemId: string | number,
    quantities: { [variantId: string]: number },
    rawItem: CartProduct,
    baseQty?: number
  ) => {
    const item = normalizeCartItem(rawItem);
    setCart((prev) => {
      const existingIndex = prev.findIndex((entry) => String(entry.item.id) === String(itemId));
      const hasVariants = rawItem.variants && rawItem.variants.length > 0;
      const totalQty = hasVariants
        ? Object.values(quantities).reduce((a, b) => a + b, 0)
        : (baseQty !== undefined ? baseQty : 1);

      if (totalQty === 0) {
        return prev.filter((entry) => String(entry.item.id) !== String(itemId));
      }

      if (existingIndex > -1) {
        return prev.map((entry, idx) => {
          if (idx !== existingIndex) return entry;
          return {
            ...entry,
            quantity: totalQty,
            variantQuantities: hasVariants ? quantities : undefined,
            item,
          };
        });
      }

      return [
        ...prev,
        {
          item,
          quantity: totalQty,
          variantQuantities: hasVariants ? quantities : undefined,
        },
      ];
    });

    triggerToast();
  };

  const removeFromCart = (itemId: string | number, variantId?: string) => {
    setCart((prev) =>
      prev
        .map((entry) => {
          const idMatches = String(entry.item.id) === String(itemId);
          if (!idMatches) return entry;
          if (variantId === undefined) {
            return { ...entry, quantity: 0 };
          }
          const newQuantities = { ...(entry.variantQuantities || {}) };
          delete newQuantities[variantId];
          const totalQty = Object.values(newQuantities).reduce((a, b) => a + b, 0);
          return {
            ...entry,
            quantity: totalQty,
            variantQuantities: newQuantities,
          };
        })
        .filter((entry) => entry.quantity > 0)
    );
  };

  const updateQuantity = (itemId: string | number, delta: number, variantId?: string) => {
    setCart((prev) =>
      prev
        .map((entry) => {
          const idMatches = String(entry.item.id) === String(itemId);
          if (!idMatches) return entry;

          if (variantId !== undefined) {
            const newQuantities = { ...(entry.variantQuantities || {}) };
            const currentVal = newQuantities[variantId] || 0;
            const newVal = Math.max(0, currentVal + delta);
            if (newVal === 0) {
              delete newQuantities[variantId];
            } else {
              newQuantities[variantId] = newVal;
            }
            const totalQty = Object.values(newQuantities).reduce((a, b) => a + b, 0);
            return {
              ...entry,
              quantity: totalQty,
              variantQuantities: newQuantities,
            };
          } else {
            return {
              ...entry,
              quantity: Math.max(0, entry.quantity + delta),
            };
          }
        })
        .filter((entry) => entry.quantity > 0)
    );
  };

  const updateVariant = (itemId: string | number, variant: CartVariant, currentVariantId?: string) => {
    setCart((prev) => {
      const idx = prev.findIndex((entry) => String(entry.item.id) === String(itemId));
      if (idx === -1) return prev;
      
      const entry = prev[idx];
      const newQuantities = { ...(entry.variantQuantities || {}) };
      if (currentVariantId !== undefined) {
        const qty = newQuantities[currentVariantId] || 0;
        delete newQuantities[currentVariantId];
        newQuantities[variant.id] = (newQuantities[variant.id] || 0) + qty;
      } else {
        newQuantities[variant.id] = entry.quantity;
      }
      return prev.map((e, i) =>
        i === idx
          ? {
              ...e,
              variantQuantities: newQuantities,
              item: normalizeCartItem({
                ...e.item,
                selectedVariantId: variant.id,
                selectedVariantName: variant.name,
              }),
            }
          : e
      );
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((total, entry) => total + entry.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () =>
      cart.reduce((total, entry) => {
        if (entry.variantQuantities && Object.keys(entry.variantQuantities).length > 0) {
          const entryTotal = Object.entries(entry.variantQuantities).reduce((sum, [vId, qty]) => {
            const variant = entry.item.variants?.find((v) => String(v.id) === String(vId));
            const price = variant?.price ?? entry.item.unitPrice ?? parsePrice(entry.item.price);
            return sum + price * qty;
          }, 0);
          return total + entryTotal;
        }
        return total + (entry.item.unitPrice ?? parsePrice(entry.item.price)) * entry.quantity;
      }, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateVariant,
        clearCart,
        cartCount,
        cartTotal,
        setVariantQuantities,
      }}
    >
      {children}
      {mounted && toastMessage && createPortal(
        <div className="fixed right-4 top-20 z-[99999] max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-top-3 duration-300 sm:right-6">
          <div className="rounded-full border border-brand-primary/20 bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-brand-dark shadow-[0_14px_32px_rgba(17,24,39,0.12)]">
            <span className="mr-3 text-brand-primary text-lg">✓</span>
            {toastMessage}
          </div>
        </div>,
        document.body
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
