import { Router } from "express";
import { skillController } from "../controllers/SkillController";

const router = Router();

router.get("/", skillController.getAll);

export default router;
