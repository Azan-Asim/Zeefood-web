import { Suspense } from "react";
import DealPage from "@/components/deals/DealPage";
import { fetchProductsApi } from "@/lib/store/productsApi";
import type { Product } from "@/lib/store";

export const metadata = {
  title: "Exclusive Deals — ZeeFood Premium",
};

export default async function DealsPage() {
  let products: Product[] = [];

  try {
    const response = await fetchProductsApi({ businessId: "5707b450-9723-4794-9ba4-ee03890cf504", page: 1, limit: 8 });
    products = response.data;
  } catch (error) {
    console.error("Deals page fetch failed", error);
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <DealPage products={products} />
    </Suspense>
  );
}
