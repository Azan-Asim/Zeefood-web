"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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

function migrateCart(cart: CartItem[]): CartItem[] {
  return cart.map((entry) => ({
    ...entry,
    item: normalizeCartItem(entry.item),
  }));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const savedCart = window.localStorage.getItem("zeefood_cart");
    if (!savedCart) return [];

    try {
      return migrateCart(JSON.parse(savedCart) as CartItem[]);
    } catch (error) {
      console.error("Failed to parse cart", error);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("zeefood_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (rawItem: CartProduct) => {
    const item = normalizeCartItem(rawItem);

    setCart((prev) => {
      const key = lineKey(item);
      const existing = prev.find((entry) => lineKey(entry.item) === key);

      if (existing) {
        return prev.map((entry) =>
          lineKey(entry.item) === key
            ? { ...entry, quantity: entry.quantity + 1, item }
            : entry
        );
      }

      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string | number, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (entry) =>
          String(entry.item.id) !== String(itemId) ||
          (variantId !== undefined && entry.item.selectedVariantId !== variantId)
      )
    );
  };

  const updateQuantity = (itemId: string | number, delta: number, variantId?: string) => {
    setCart((prev) =>
      prev
        .map((entry) => {
          const idMatches = String(entry.item.id) === String(itemId);
          const variantMatches =
            variantId === undefined || entry.item.selectedVariantId === variantId;

          if (idMatches && variantMatches) {
            return { ...entry, quantity: Math.max(0, entry.quantity + delta) };
          }

          return entry;
        })
        .filter((entry) => entry.quantity > 0)
    );
  };

  const updateVariant = (itemId: string | number, variant: CartVariant, currentVariantId?: string) => {
    setCart((prev) => {
      const index = prev.findIndex((entry) => {
        const idMatches = String(entry.item.id) === String(itemId);
        const variantMatches =
          currentVariantId === undefined || entry.item.selectedVariantId === currentVariantId;

        return idMatches && variantMatches;
      });
      if (index === -1) return prev;

      const current = prev[index];
      if (current.item.selectedVariantId === variant.id) return prev;

      const updatedItem = normalizeCartItem({
        ...current.item,
        selectedVariantId: variant.id,
        selectedVariantName: variant.name,
        unitPrice: variant.price,
        price: variant.price,
      });
      const targetKey = lineKey(updatedItem);
      const targetIndex = prev.findIndex(
        (entry, entryIndex) => entryIndex !== index && lineKey(entry.item) === targetKey
      );

      if (targetIndex >= 0) {
        return prev
          .map((entry, entryIndex) =>
            entryIndex === targetIndex
              ? { ...entry, quantity: entry.quantity + current.quantity, item: updatedItem }
              : entry
          )
          .filter((_, entryIndex) => entryIndex !== index);
      }

      return prev.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, item: updatedItem } : entry
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
      cart.reduce(
        (total, entry) =>
          total + (entry.item.unitPrice ?? parsePrice(entry.item.price)) * entry.quantity,
        0
      ),
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
      }}
    >
      {children}
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
