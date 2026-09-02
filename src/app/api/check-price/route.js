import { getLastPrice, savePrice } from "@/lib/db";
import { sendTelegramMessage } from "@/lib/telegram";

const PRODUCT_URL = "https://it.nothing.tech/products/phone-4a?Colour=White&Capacity=8%2B256GB";

export async function GET(request) {
  // TESTING ONLY !!!
  // await sendTelegramMessage("Test Nothing Price Tracker: funziona!");
  // return Response.json({ ok: true });

  const auth = request.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const response = await fetch(PRODUCT_URL);

  if (!response.ok) {
    return Response.json(
      { error: "Failed to fetch Nothing" },
      { status: 500 }
    );
  }

  const html = await response.text();

  const match = html.match(/€(\d+)/);

  if (!match) {
    return Response.json(
      { error: "Price not found" },
      { status: 500 }
    );
  }

  const price = Number(match[1]);
  const previousPrice = await getLastPrice();

  await savePrice(price);

  if (previousPrice !== null && price !== previousPrice) {
    const difference = price - previousPrice;
    const sign = difference > 0 ? "+" : "";

    await sendTelegramMessage(
      "\u26A0	NUOVO PREZZO per Nothing Phone (4a) 8+256 GB\n\n" +
      `Prezzo: €${previousPrice} → €${price}\n` +
      `Variazione: ${sign}€${difference}\n` +
      "Consulta lo storico: https://phone-price-bot.vercel.app"
    );
  }

  return Response.json({
    price,
    previousPrice,
    changed: previousPrice !== null && price !== previousPrice,
  });
}