import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { SustainabilityCertValidation } from "./sustainabilityCert.validation";
import { SustainabilityCertController } from "./sustainabilityCert.controller";
import { authenticate, authorize } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.VENDOR),
  validateRequest(SustainabilityCertValidation.createSustainabilityCertSchema),
  SustainabilityCertController.createSustainabilityCert
);

router.get("/", SustainabilityCertController.getAllSustainabilityCerts);
router.get("/:id", SustainabilityCertController.getSustainabilityCertById);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.VENDOR, Role.ADMIN),
  validateRequest(SustainabilityCertValidation.updateSustainabilityCertSchema),
  SustainabilityCertController.updateSustainabilityCert
);

router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  SustainabilityCertController.deleteSustainabilityCert
);

export const SustainabilityCertRoutes = router;
