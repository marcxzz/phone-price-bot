import { sql } from "@/lib/db";
import { sendTelegramMessage } from "@/lib/telegram";


export async function GET(request) {
  const auth = request.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const prices = await sql`
    SELECT price, checked_at
    FROM tbl_prices
    WHERE checked_at >= NOW() - INTERVAL '24 hours'
    ORDER BY checked_at ASC
  `;

  if (prices.length === 0) {
    await sendTelegramMessage("Nothing Phone (4a): nessun rilevamento nelle ultime 24 ore.");
    return Response.json({ ok: true });
  }

  const first = prices[0].price;
  const last = prices[prices.length - 1].price;
  const min = Math.min(...prices.map((p) => p.price));
  const max = Math.max(...prices.map((p) => p.price));

  const variation = last - first;
  const sign = variation > 0 ? "+" : "";

  await sendTelegramMessage(
    `DIGEST PREZZO Nothing Phone (4a) 8+256 GB\n\n` +
    `Prezzo attuale: €${last}\n` +
    `Min: €${min}\n` +
    `Max: €${max}\n` +
    `Variazione: ${sign}€${variation}\n` +
    `Rilevamenti: ${prices.length}`
  );

  return Response.json({ ok: true });
}