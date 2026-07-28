"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react"; 
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Deals", href: "/deals" },
  { name: "View Menu", href: "/menu" },
  { name: "Our Story", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart Context synchronization with explicit any cast to prevent TS errors
  const cartContext = useCart() as any;
  const cartItems = cartContext?.cart || cartContext?.cartItems || [];
  const updateQuantity = cartContext?.updateQuantity || (() => {});
  const removeFromCart = cartContext?.removeFromCart || ((id: string, variantId?: string) => updateQuantity(id, -999, variantId));
  const cartTotal = cartContext?.cartTotal || 0;

  const totalItems = cartItems.reduce((total: number, entry: any) => total + (entry?.quantity || 0), 0);
  const deliveryCharges = 150;
  const total = cartTotal + (cartTotal > 0 ? deliveryCharges : 0);

  const isOrderPage = pathname === "/menu" || pathname === "/order" || pathname === "/deals";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isCartOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isCartOpen, isMobileMenuOpen]);

  // Clean, professional WhatsApp Message Formatting with bold item names and new lines
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    let msg = "🛒 *New Order - Zee Food Gallery*\n";
    msg += "━━━━━━━━━━━━━━━━━━━\n\n";
    msg += "📋 *Order Items:*\n";
    
    cartItems.forEach((c: any, index: number) => {
      const itemData = c.item || c;
      const itemName = itemData.name || "Dish";
      const variantText = itemData.selectedVariantName ? ` (${itemData.selectedVariantName})` : "";
      const priceVal = typeof itemData.unitPrice === "number" ? itemData.unitPrice : (Number(String(itemData.price || 0).replace(/[^0-9]/g, "")) || 0);
      const itemTotal = priceVal * (c.quantity || 1);
      
      msg += `*${index + 1}. ${itemName}${variantText}*\n`;
      msg += `Quantity: ${c.quantity} Plate | Price: Rs. ${itemTotal.toLocaleString()}\n\n`;
    });

    msg += "━━━━━━━━━━━━━━━━━━━\n";
    msg += `📦 Subtotal: Rs. ${cartTotal.toLocaleString()}\n`;
    msg += `🛵 Delivery Fee: Rs. ${deliveryCharges}\n`;
    msg += `💰 *Total Amount: Rs. ${total.toLocaleString()}*\n`;
    msg += "━━━━━━━━━━━━━━━━━━━\n\n";
    msg += "*Please confirm my order. Thank you! 🙏*";

    window.open(`https://wa.me/923354153368?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setIsCartOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-[100] w-full overflow-hidden transition-all duration-300 ${
          isScrolled
            ? "h-16 border-b border-brand-primary/10 bg-white/90 shadow-md backdrop-blur-md"
            : "h-20 border-b border-brand-primary/10 bg-white"
        }`}
      >
        {isScrolled && (
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(248,114,5,0.08),transparent_42%)]" />
        )}
        
        <div className="site-container relative flex h-full items-center justify-between">
          <div className="flex-shrink-0">
            <BrandMark />
          </div>

          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.name} href={link.href} active={pathname === link.href}>
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="flex flex-shrink-0 items-center gap-4">
            {/* Desktop Cart Button with exact rounded-full shape */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="hidden min-h-9 items-center justify-center gap-2 rounded-full bg-brand-primary px-5 text-sm font-bold text-white shadow-[0_10px_22px_rgba(248,114,5,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:shadow-[0_14px_28px_rgba(248,114,5,0.28)] lg:inline-flex"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-primary">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-brand-dark transition-all duration-300 hover:bg-brand-primary/10 lg:hidden"
            >
              <span className="flex w-6 flex-col gap-1.5">
                <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sticky Action Bar with Centered Content */}
      {!isOrderPage && (
        <div className="fixed bottom-4 left-4 right-4 z-[90] lg:hidden animate-in fade-in slide-in-from-bottom-10">
          {totalItems > 0 ? (
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex w-full items-center justify-center gap-4 rounded-full bg-brand-primary p-4 text-sm font-bold uppercase tracking-widest text-white shadow-2xl transition-transform active:scale-95"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
                  {totalItems}
                </span>
                <span>View Cart</span>
              </div>
              <span>•</span>
              <span>Rs. {total}</span>
            </button>
          ) : (
            <Link
              href="/menu"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-primary p-4 text-sm font-bold uppercase tracking-widest text-white shadow-2xl transition-transform active:scale-95"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Order Now</span>
            </Link>
          )}
        </div>
      )}

      {/* Cart Drawer Modal */}
      <div className={`fixed inset-0 z-[120] transition-all duration-300 ${isCartOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
        
        <div
          className={`absolute bottom-0 right-0 top-0 flex w-[min(90vw,420px)] flex-col bg-brand-surface shadow-[-20px_0_50px_rgba(0,0,0,0.15)] transition-transform duration-500 ease-in-out ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-brand-primary/10 bg-white px-6 py-5">
            <h2 className="flex items-center gap-2 text-xl font-black text-brand-dark">
              <ShoppingCart className="text-brand-primary" />
              Your Cart
              {totalItems > 0 && <span className="text-sm font-semibold text-brand-dark/60">({totalItems} items)</span>}
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-surface text-brand-dark/60 transition-colors hover:bg-brand-primary/10 hover:text-brand-primary"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                  <ShoppingCart size={40} />
                </div>
                <h3 className="mb-2 text-xl font-bold text-brand-dark">No items found</h3>
                <p className="text-sm text-brand-dark/60">Your cart is currently empty. Explore our menu and add your favorite dishes.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-brand-primary/90"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {cartItems.map((c: any, index: number) => {
                  const item = c.item || c;
                  const itemId = item.id;
                  const variantId = item.selectedVariantId;
                  const itemName = item.name || "Dish";
                  const itemImage = item.image || "/images/placeholder-food.png";
                  const variantName = item.selectedVariantName || "";
                  const unitPrice = typeof item.unitPrice === "number" ? item.unitPrice : (Number(String(item.price || 0).replace(/[^0-9]/g, "")) || 0);

                  return (
                    <div key={`${itemId}-${variantId || "base"}-${index}`} className="flex gap-4 rounded-2xl border border-brand-primary/5 bg-white p-3 shadow-sm">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-surface">
                        <Image src={itemImage} alt={itemName} fill className="object-cover" unoptimized />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="line-clamp-1 font-bold text-brand-dark">{itemName}</h4>
                            {variantName && <p className="text-xs font-bold text-brand-primary">{variantName}</p>}
                          </div>
                          <button 
                            onClick={() => removeFromCart(itemId, variantId)}
                            className="text-brand-dark/30 transition-colors hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-semibold text-brand-primary">Rs. {unitPrice.toLocaleString()}</span>
                          
                          <div className="flex items-center gap-3 rounded-full border border-brand-primary/20 bg-brand-surface px-1.5 py-0.5">
                            <button onClick={() => updateQuantity(itemId, -1, variantId)} className="text-brand-dark hover:text-brand-primary">
                              <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="w-4 text-center text-sm font-semibold text-brand-dark">{c.quantity}</span>
                            <button onClick={() => updateQuantity(itemId, 1, variantId)} className="text-brand-dark hover:text-brand-primary">
                              <Plus size={14} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-brand-primary/10 bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
              <div className="mb-4 flex flex-col gap-2 text-sm text-brand-dark/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-dark">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-brand-dark">Rs. {deliveryCharges}</span>
                </div>
              </div>
              <div className="mb-6 flex items-end justify-between border-t border-brand-primary/10 pt-4">
                <span className="text-base font-bold text-brand-dark">Total</span>
                <span className="text-2xl font-black text-brand-primary">Rs. {total.toLocaleString()}</span>
              </div>
              
              <button
                onClick={handleWhatsAppCheckout}
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-6 text-base font-bold text-white shadow-[0_10px_22px_rgba(248,114,5,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:shadow-[0_14px_28px_rgba(248,114,5,0.28)]"
              >
                Place Order on WhatsApp
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[110] transition-all duration-300 lg:hidden ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute bottom-0 left-0 top-0 flex w-[min(88vw,24rem)] flex-col rounded-r-[30px] bg-gradient-to-br from-white via-orange-50/70 to-brand-surface p-5 shadow-[18px_0_50px_rgba(18,18,18,0.12)] transition-transform duration-500 min-[380px]:p-6 sm:p-8 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <BrandMark mobile />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-gray-500 shadow-sm transition-all duration-300 hover:bg-brand-primary/10 hover:text-brand-primary"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-2xl px-4 py-2 text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-brand-primary/10 hover:text-brand-primary ${
                  pathname === link.href ? "bg-brand-primary/10 text-brand-primary" : "text-brand-dark"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto border-t border-brand-primary/10 pt-10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-primary px-7 text-center text-sm font-bold text-white shadow-[0_10px_22px_rgba(248,114,5,0.22)] transition-all duration-300 hover:bg-brand-primary/90 hover:shadow-[0_14px_28px_rgba(248,114,5,0.28)]"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Open Cart {totalItems > 0 && `(${totalItems})`}</span>
            </button>
            
            <div className="mt-8 flex flex-col items-center gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Powered By</span>
              <a href="https://www.devsinntechnologies.com/" target="_blank" rel="noopener noreferrer" className="relative h-8 w-32 transition-transform hover:scale-105">
                <Image src="/devsinnlogo0.svg" alt="Dev's Inn Technologies" fill className="object-contain" unoptimized />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`relative py-1 text-base font-semibold tracking-wide transition-colors duration-300 hover:text-brand-primary ${
        active ? "text-brand-primary" : "text-brand-dark/75"
      }`}
    >
      {children}
      <span className={`absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-brand-primary transition-all duration-300 ${active ? "w-6" : "w-0"}`} />
    </Link>
  );
}

function BrandMark({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-3 transition-opacity duration-300 hover:opacity-90">
      <div className="relative h-12 w-12 shrink-0 min-[380px]:h-14 min-[380px]:w-14 sm:h-[72px] sm:w-[72px]">
        <Image src="/fiery-wok.png" alt="Ama G Ka Dhaba" fill className="object-contain object-center" priority={!mobile} unoptimized />
      </div>
      <div className="min-w-0">
        <span className="block text-[6px] font-black uppercase tracking-[0.18em] text-brand-dark/45 min-[380px]:text-[7px] min-[380px]:tracking-[0.22em] sm:text-[9px] sm:tracking-[0.28em]">Zee Food Gallery</span>
        <span lang="ur" dir="rtl" className="font-ama-dhaba block whitespace-nowrap text-[18px] font-black leading-none text-brand-primary min-[380px]:text-[20px] sm:text-[28px]">
          اماں جی کا ڈھابہ
        </span>
      </div>
    </Link>
  );
}