import { Router } from "express";
import { checkout } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/checkout", authMiddleware, checkout);

export default router;