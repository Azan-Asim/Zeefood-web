"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type CartProduct = {
  id: string | number;
  name?: string;
  nameUr?: string;
  price: string | number;
  image?: string | null;
  category?: unknown;
  description?: string;
  descriptionUr?: string;
  slug?: string;
  popular?: boolean;
  details?: {
    prepTime: string;
    prepTimeUr: string;
  };
};

interface CartItem {
  item: CartProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartProduct) => void;
  removeFromCart: (itemId: string | number) => void;
  updateQuantity: (itemId: string | number, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const savedCart = window.localStorage.getItem('zeefood_cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart) as CartItem[];
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }

    return [];
  });

  // Save cart to localStorage on change
  useEffect(() => {
    window.localStorage.setItem('zeefood_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartProduct) => {
    setCart(prev => {
      const existing = prev.find(i => String(i.item.id) === String(item.id));
      if (existing) {
        return prev.map(i => String(i.item.id) === String(item.id) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string | number) => {
    setCart(prev => prev.filter(i => String(i.item.id) !== String(itemId)));
  };

  const updateQuantity = (itemId: string | number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (String(i.item.id) === String(itemId)) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, c) => {
    // Extract number from price string (e.g., "Rs. 2,499" -> 2499)
    const priceNum = typeof c.item.price === 'string' 
      ? parseInt(c.item.price.replace(/[^0-9]/g, '')) 
      : c.item.price;
    return total + (priceNum * c.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
