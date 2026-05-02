"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  item: any;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('zeefood_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('zeefood_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === itemId) {
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
