import { pool } from "../config/db";

export const findCartByUserIdRepo = async (userId: string) => {
  const result = await pool.query(
    `SELECT * FROM carts WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};

export const createCartRepo = async (userId: string) => {
  const result = await pool.query(
    `INSERT INTO carts (user_id)
     VALUES ($1)
     RETURNING *`,
    [userId]
  );

  return result.rows[0];
};

export const findCartItemRepo = async (cartId: string, productId: string) => {
  const result = await pool.query(
    `SELECT * FROM cart_items
     WHERE cart_id = $1 AND product_id = $2`,
    [cartId, productId]
  );

  return result.rows[0];
};

export const addCartItemRepo = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  const result = await pool.query(
    `INSERT INTO cart_items (cart_id, product_id, quantity)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [cartId, productId, quantity]
  );

  return result.rows[0];
};

export const updateCartItemRepo = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  const result = await pool.query(
    `UPDATE cart_items
     SET quantity = quantity + $3
     WHERE cart_id = $1 AND product_id = $2
     RETURNING *`,
    [cartId, productId, quantity]
  );

  return result.rows[0];
};

export const getCartItemsRepo = async (userId: string) => {
  const result = await pool.query(
    `SELECT 
        ci.product_id,
        ci.quantity,
        p.name,
        p.price
     FROM carts c
     JOIN cart_items ci ON c.id = ci.cart_id
     JOIN products p ON ci.product_id = p.id
     WHERE c.user_id = $1`,
    [userId]
  );

  return result.rows;
};

export const setCartItemQuantityRepo = async (
  cartId: string,
  productId: string,
  quantity: number
) => {
  const result = await pool.query(
    `UPDATE cart_items
     SET quantity = $3
     WHERE cart_id = $1 AND product_id = $2
     RETURNING *`,
    [cartId, productId, quantity]
  );

  return result.rows[0];
};

export const removeCartItemRepo = async (cartId: string, productId: string) => {
    const result = await pool.query(
    `DELETE FROM cart_items
     WHERE cart_id = $1 AND product_id = $2`,
    [cartId, productId]
    )
}