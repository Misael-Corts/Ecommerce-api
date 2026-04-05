import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "Authenticated user",
    user: (req as any).user
  });
});

export default router;