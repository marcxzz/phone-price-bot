export const dynamic = "force-dynamic"; // disable caching for frontend fetching

import { getPrices } from "@/actions/getPrices";
import PriceChart from "@/components/PriceChart";

export default async function Home() {
  const prices = await getPrices();

  const data = prices.map((item) => ({
    date: new Date(item.checked_at).getTime(),
    price: item.price,
  }));


  return (
    <main className="mx-auto max-w-6xl">
      <div className="p-4">
        <h1 className="text-3xl font-bold">
          Nothing Phone (4a)
        </h1>

        <p className="text-muted-foreground">
          White · 8 GB + 256 GB
        </p>
      </div>

      <section className="mt-8 p-2">
        <PriceChart data={data} />
      </section>
    </main>
  );
}