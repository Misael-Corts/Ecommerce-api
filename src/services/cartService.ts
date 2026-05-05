import {
  findCartByUserIdRepo,
  createCartRepo,
  findCartItemRepo,
  addCartItemRepo,
  updateCartItemRepo,
  getCartItemsRepo,
  setCartItemQuantityRepo,
  removeCartItemRepo
} from "../repositories/cartRepository";
import { getProductByIdRepo } from "../repositories/productRepository";

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number
) => {

  let cart = await findCartByUserIdRepo(userId);

  if (!cart) {
    cart = await createCartRepo(userId);
  }

  const product = await getProductByIdRepo(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Not enough stock");
  }

  const existingItem = await findCartItemRepo(cart.id, productId);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const desiredQuantity = currentQuantity + quantity;

  if (product.stock < desiredQuantity) {
    throw new Error("Not enough stock");
  }

  if (existingItem) {
    return await updateCartItemRepo(cart.id, productId, quantity);
  }

  return await addCartItemRepo(cart.id, productId, quantity);
};

export const getCartService = async (userId: string) => {
  const items = await getCartItemsRepo(userId);

  let total = 0;

  const formattedItems = items.map((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    return {
      productId: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal
    };
  });

  return {
    items: formattedItems,
    total
  };
};

export const updateCartItemService = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  const cart = await findCartByUserIdRepo(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const product = await getProductByIdRepo(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Not enough stock");
  }

  return await setCartItemQuantityRepo(cart.id, productId, quantity);
};

export const removeCartItemService = async (userId: string, productId: string) => {
  const cart = await findCartByUserIdRepo(userId)
  
  if (!cart) {
    throw new Error("Cart not found");
  }

  await removeCartItemRepo(cart.id, productId);
}
