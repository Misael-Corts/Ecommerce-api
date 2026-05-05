import { Router } from "express";
import { addToCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// router.get("/", authMiddleware, getCart)
router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.patch("/item/:productId", authMiddleware, updateCartItem);
router.delete("/item/:productId", authMiddleware, removeCartItem);

export default router;