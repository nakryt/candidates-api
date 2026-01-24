import { Router } from "express";
import candidateRoutes from "./candidateRoutes";
import skillRoutes from "./skillRoutes";
import { apiLimiter } from "../middleware/rateLimiter";

const router = Router();

router.use("/candidates", apiLimiter, candidateRoutes);
router.use("/skills", apiLimiter, skillRoutes);

export default router;
