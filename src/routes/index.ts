import { Router } from "express";
import { apiKeyAuth } from "../middleware/apiKeyAuth";
import candidateRoutes from "./candidateRoutes";
import skillRoutes from "./skillRoutes";

const router = Router();

router.use(apiKeyAuth);
router.use("/candidates", candidateRoutes);
router.use("/skills", skillRoutes);

export default router;
