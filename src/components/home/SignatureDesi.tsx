"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { VariantProductCard } from "@/components/order/OrderPage";
import type { Product, ProductVariant } from "@/lib/store";

type RemoteProduct = {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  status?: string;
  category?: { CategoryName?: string };
  price?: number;
  variants?: ProductVariant[];
};

const DRM_BASE = "https://drm.devsinntechnologies.com";

function normalizeImage(image?: string) {
  if (!image) return "/images/home/menu/placeholder.png";
  if (image.startsWith("http")) return image;
  return `${DRM_BASE}/${image.replace(/^\//, "")}`;
}

function toProduct(product: RemoteProduct): Product {
  const variants = product.variants ?? [];
  const variantPrices = variants.map((variant) => Number(variant.price || 0)).filter(Boolean);
  const price = variantPrices.length > 0 ? Math.min(...variantPrices) : product.price || 0;
  const category = product.category?.CategoryName ?? "Desi";
  const status = product.status === "INACTIVE" ? "INACTIVE" : "ACTIVE";

  return {
    id: product.id,
    name: product.name,
    price,
    image: normalizeImage(product.image),
    status,
    sortOrder: 0,
    inStock: status === "ACTIVE" ? 99 : 0,
    categoryId: category,
    category: { id: category, CategoryName: category },
    variants,
    createdAt: "",
    updatedAt: "",
  };
}

export default function SignatureDesi() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [desiItems, setDesiItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/products?page=1&limit=100");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        const products: RemoteProduct[] = json.data || [];
        const filtered = products
          .filter((product) => product.category?.CategoryName === "Desi")
          .slice(0, 4)
          .map(toProduct);

        if (mounted) setDesiItems(filtered);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to load products";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative w-full bg-white py-20 sm:py-24 lg:py-28 2xl:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px] 2xl:px-10">
        <div className="mb-20 flex flex-col items-center py-4 text-center sm:mb-24 sm:py-6 2xl:mb-28 2xl:py-8">
          <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-brand-primary lg:text-5xl">
            Signature Desi
          </h2>
          <div className="mb-6 mt-4 h-1.5 w-24 bg-brand-primary" />
          <p className="max-w-2xl text-lg font-medium text-brand-dark/70">
            Experience the rich, authentic flavors of our heritage with perfectly crafted traditional recipes.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 pt-10 sm:grid-cols-2 sm:gap-8 lg:gap-10 lg:pt-14 xl:grid-cols-4 2xl:gap-12">
          {loading && <div className="col-span-full text-center">Loading...</div>}
          {error && <div className="col-span-full text-center text-red-500">{error}</div>}

          {!loading &&
            !error &&
            desiItems.map((product) => (
              <VariantProductCard
                key={product.id}
                product={product}
                onAddToCart={(selectedProduct, variant) => {
                  const price = variant?.price ?? selectedProduct.price;
                  addToCart({
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price,
                    unitPrice: price,
                    image: selectedProduct.image,
                    category: selectedProduct.category?.CategoryName ?? "Desi",
                    slug: selectedProduct.id,
                    popular: false,
                    variants: selectedProduct.variants,
                    selectedVariantId: variant?.id,
                    selectedVariantName: variant?.name,
                    details: { prepTime: "20-30 min", prepTimeUr: "20-30 min" },
                  });
                }}
              />
            ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center rounded-2xl border-2 border-brand-primary bg-transparent px-10 py-4 font-black uppercase tracking-widest text-brand-primary no-underline transition-all duration-300 hover:-translate-y-1 hover:bg-brand-primary hover:text-white hover:no-underline hover:shadow-[0_15px_30px_rgba(248,114,5,0.30)]"
          >
            {t("viewMenu")}
          </Link>
        </div>
      </div>
    </section>
  );
}
