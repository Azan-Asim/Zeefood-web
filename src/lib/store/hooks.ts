// ─── Typed Redux Hooks ────────────────────────────────────────────────────────
// Always use these instead of the plain useDispatch / useSelector from react-redux.

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

/** Typed dispatch — supports thunks */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Typed selector */
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector<RootState, T>(selector);
