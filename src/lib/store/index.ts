// ─── Public Barrel Export ─────────────────────────────────────────────────────
// Import everything from "@/lib/store" instead of deep paths.

export { store } from "./store";
export type { RootState, AppDispatch } from "./store";
export { useAppDispatch, useAppSelector } from "./hooks";
export {
  fetchProducts,
  setActiveCategory,
  setSearchQuery,
  resetFilters,
  invalidateCache,
  selectAllProducts,
  selectFilteredProducts,
  selectProductById,
  selectCategories,
  selectActiveCategory,
  selectSearchQuery,
  selectProductsStatus,
  selectProductsError,
  selectPagination,
} from "./productsSlice";
export { BUSINESS_ID } from "./productsApi";
export type { Product, ProductVariant, ProductsQueryParams, FetchStatus } from "./types";
