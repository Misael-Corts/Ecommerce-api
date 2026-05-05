
import { Request, Response } from "express";
import { checkoutService } from "../services/orderService";

export const checkout = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const order = await checkoutService(userId);

    res.status(201).json(order);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};