import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { PlantTrackingValidation } from "./plantTracking.validation";
import { PlantTrackingController } from "./plantTracking.controller";
import { authenticate, authorize } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.CUSTOMER, Role.VENDOR),
  validateRequest(PlantTrackingValidation.createPlantTrackingSchema),
  PlantTrackingController.createPlantTracking
);

router.get(
  "/",
  authenticate,
  PlantTrackingController.getMyPlantTrackings
);

router.get(
  "/:id",
  authenticate,
  PlantTrackingController.getPlantTrackingById
);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.CUSTOMER, Role.VENDOR),
  validateRequest(PlantTrackingValidation.updatePlantTrackingSchema),
  PlantTrackingController.updatePlantTracking
);

router.delete(
  "/:id",
  authenticate,
  authorize(Role.CUSTOMER, Role.VENDOR),
  PlantTrackingController.deletePlantTracking
);

export const PlantTrackingRoutes = router;
