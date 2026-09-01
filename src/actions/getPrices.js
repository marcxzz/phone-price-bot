import { sql } from "@/lib/db";

export async function getPrices() {
  return await sql`
    SELECT price, checked_at
    FROM tbl_prices
    ORDER BY checked_at ASC
  `;
}