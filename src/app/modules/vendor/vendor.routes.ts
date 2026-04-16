import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { VendorValidation } from "./vendor.validation";
import { VendorController } from "./vendor.controller";
import { authenticate, authorize } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/create-vendor",
  authenticate,
  authorize(Role.VENDOR, Role.ADMIN),
  validateRequest(VendorValidation.createVendorProfileSchema),
  VendorController.createVendorProfile
);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.VENDOR, Role.ADMIN),
  validateRequest(VendorValidation.updateVendorProfileSchema),
  VendorController.updateVendorProfile
);

router.get("/:id", VendorController.getVendorProfileById);
router.get("/", VendorController.getAllVendorProfiles);

export const VendorRoutes = router;
