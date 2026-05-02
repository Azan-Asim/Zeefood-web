import OrderPage from "@/components/order/OrderPage";

export const metadata = {
  title: "Menu — ZeeFood Premium",
};

export default function MenuPage() {
  // We reuse the highly premium OrderPage for the /menu route.
  return <OrderPage />;
}
