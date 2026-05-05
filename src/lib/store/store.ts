// ─── Redux Store ──────────────────────────────────────────────────────────────

import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Serializable check: ignore non-serializable values if needed
      serializableCheck: {
        ignoredActions: ["products/fetchAll/fulfilled"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
