import { Request, Response } from "express";
import { addToCartService, getCartService, removeCartItemService, updateCartItemService} from "../services/cartService";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { productId, quantity } = req.body;

    const item = await addToCartService(userId, productId, quantity);

    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const cart = await getCartService(userId);

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { productId } = req.params;
    const { quantity } = req.body;
    
    const item = await updateCartItemService(userId, productId as string, quantity);

    res.json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const { productId } = req.params;

    await removeCartItemService(userId, productId as string);

    res.json({ message: "Item removed" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};