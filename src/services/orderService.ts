import { pool } from "../config/db";
import {
  findCartByUserIdRepo,
  getCartItemsRepo
} from "../repositories/cartRepository";
import {
  createOrderRepo,
  createOrderItemRepo,
  clearCartRepo
} from "../repositories/orderRepository";
import { getProductByIdRepo } from "../repositories/productRepository";

export const checkoutService = async (userId: string) => {

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cart = await findCartByUserIdRepo(userId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const items = await getCartItemsRepo(userId);

    if (items.length === 0) {
      throw new Error("Cart is empty");
    }

    let total = 0;

    for (const item of items) {
      const product = await getProductByIdRepo(item.product_id);

      if (!product) {
        throw new Error(`Product not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for ${product.name}`);
      }

      total += product.price * item.quantity;
    }

    const order = await createOrderRepo(userId, total);

    for (const item of items) {
      const product = await getProductByIdRepo(item.product_id);

      await createOrderItemRepo(
        order.id,
        item.product_id,
        item.quantity,
        product.price
      );

      await client.query(
        `UPDATE products
         SET stock = stock - $1
         WHERE id = $2`,
        [item.quantity, item.product_id]
      );
    }

    await clearCartRepo(cart.id);

    await client.query("COMMIT");

    return order;

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};