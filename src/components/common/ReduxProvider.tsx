"use client";
// ─── Redux Provider (Client Component) ───────────────────────────────────────
// Next.js App Router requires providers to be Client Components.

import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
