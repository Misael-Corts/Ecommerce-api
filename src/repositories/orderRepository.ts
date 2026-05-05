import { pool } from "../config/db";

export const createOrderRepo = async (userId: string, total: number) => {
  const result = await pool.query(
    `INSERT INTO orders (user_id, total)
     VALUES ($1, $2)
     RETURNING *`,
    [userId, total]
  );

  return result.rows[0];
};

export const createOrderItemRepo = async (
  orderId: string,
  productId: string,
  quantity: number,
  price: number
) => {
  await pool.query(
    `INSERT INTO order_items (order_id, product_id, quantity, price)
     VALUES ($1, $2, $3, $4)`,
    [orderId, productId, quantity, price]
  );
};

export const clearCartRepo = async (cartId: string) => {
  await pool.query(
    `DELETE FROM cart_items WHERE cart_id = $1`,
    [cartId]
  );
};