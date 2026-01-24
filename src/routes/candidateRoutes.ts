import { Router } from "express";
import { candidateController } from "../controllers/CandidateController";
import { CreateCandidateDto } from "../dto/CreateCandidateDto";
import { PaginationDto } from "../dto/PaginationDto";
import { UpdateStatusDto } from "../dto/UpdateStatusDto";
import { strictLimiter } from "../middleware/rateLimiter";
import { validateDto, validateQuery } from "../middleware/validate";

const router = Router();

router.get("/", validateQuery(PaginationDto), candidateController.getAll);
router.get("/:id", candidateController.getById);

router.post(
  "/",
  strictLimiter,
  validateDto(CreateCandidateDto),
  candidateController.create,
);

router.patch(
  "/:id/status",
  strictLimiter,
  validateDto(UpdateStatusDto),
  candidateController.updateStatus,
);

export default router;
