import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { RentalSpaceValidation } from "./rentalSpace.validation";
import { RentalSpaceController } from "./rentalSpace.controller";
import { authenticate, authorize } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.ADMIN),
  validateRequest(RentalSpaceValidation.createRentalSpaceSchema),
  RentalSpaceController.createRentalSpace
);

router.get("/", RentalSpaceController.getAllRentalSpaces);
router.get("/:id", RentalSpaceController.getRentalSpaceById);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  validateRequest(RentalSpaceValidation.updateRentalSpaceSchema),
  RentalSpaceController.updateRentalSpace
);

router.delete(
  "/:id",
  authenticate,
  authorize(Role.ADMIN),
  RentalSpaceController.deleteRentalSpace
);

export const RentalSpaceRoutes = router;
