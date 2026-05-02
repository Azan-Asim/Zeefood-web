import type { Metadata } from "next";
import LoginPage from "@/components/auth/LoginPage";

export const metadata: Metadata = {
  title: "Sign In — ZeeFood Premium",
  description:
    "Sign in to your ZeeFood account and continue your premium food delivery experience.",
};

export default function Login() {
  return <LoginPage />;
}
