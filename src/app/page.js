export const dynamic = "force-dynamic"; // disable caching for frontend fetching

import { getPrices } from "@/actions/getPrices";
import PriceChart from "@/components/PriceChart";

export default async function Home() {
  const prices = await getPrices();

  const data = prices.map((item) => ({
    date: new Date(item.checked_at).toLocaleString("it-IT", {
      timeZone: "Europe/Rome",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    price: item.price,
  }));

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">
        Nothing Phone (4a)
      </h1>

      <p className="text-muted-foreground">
        White · 8 GB + 256 GB
      </p>

      <section className="mt-8">
        <PriceChart data={data} />
      </section>
    </main>
  );
}