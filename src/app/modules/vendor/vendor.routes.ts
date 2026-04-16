import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { VendorValidation } from "./vendor.validation";
import { VendorController } from "./vendor.controller";

const router = Router();

router.post(
  "/create-vendor",
  validateRequest(VendorValidation.createVendorProfileSchema),
  VendorController.createVendorProfile
);

router.patch(
  "/:id",
  validateRequest(VendorValidation.updateVendorProfileSchema),
  VendorController.updateVendorProfile
);

router.get("/:id", VendorController.getVendorProfileById);
router.get("/", VendorController.getAllVendorProfiles);

export const VendorRoutes = router;
