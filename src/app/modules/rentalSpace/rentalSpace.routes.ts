import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { RentalSpaceValidation } from "./rentalSpace.validation";
import { RentalSpaceController } from "./rentalSpace.controller";

const router = Router();

router.post(
  "/",
  validateRequest(RentalSpaceValidation.createRentalSpaceSchema),
  RentalSpaceController.createRentalSpace
);

router.get("/", RentalSpaceController.getAllRentalSpaces);
router.get("/:id", RentalSpaceController.getRentalSpaceById);

router.patch(
  "/:id",
  validateRequest(RentalSpaceValidation.updateRentalSpaceSchema),
  RentalSpaceController.updateRentalSpace
);

router.delete("/:id", RentalSpaceController.deleteRentalSpace);

export const RentalSpaceRoutes = router;
