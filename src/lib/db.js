import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL);

export async function getLastPrice() {
  const result = await sql`
    SELECT price
    FROM tbl_prices
    ORDER BY checked_at DESC
    LIMIT 1
  `;

  return result[0]?.price ?? null;
}

export async function savePrice(price) {
  await sql`
    INSERT INTO tbl_prices (price)
    VALUES (${price})
  `;
}

export async function getPriceHistory() {
    return sql`
        SELECT price, checked_at
        FROM tbl_prices
        ORDER BY checked_at ASC
    `;
}