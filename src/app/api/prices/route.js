import { sql } from "@/lib/db";

export async function GET() {
  const prices = await sql`
    SELECT price, checked_at
    FROM tbl_prices
    ORDER BY checked_at ASC
  `;

  return Response.json(prices);
}