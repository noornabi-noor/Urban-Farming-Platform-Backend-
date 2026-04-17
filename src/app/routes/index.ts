import { Router, Request, Response } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { VendorRoutes } from "../modules/vendor/vendor.routes";
import { ProduceRoutes } from "../modules/produce/produce.routes";
import { RentalSpaceRoutes } from "../modules/rentalSpace/rentalSpace.routes";
import { PlantTrackingRoutes } from "../modules/plantTracking/plantTracking.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { CommunityRoutes } from "../modules/community/community.routes";
import { SustainabilityCertRoutes } from "../modules/sustainabilityCert/sustainabilityCert.routes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/vendors", VendorRoutes);
router.use("/produces", ProduceRoutes);
router.use("/rental-spaces", RentalSpaceRoutes);
router.use("/plant-trackings", PlantTrackingRoutes);
router.use("/orders", OrderRoutes);
router.use("/community", CommunityRoutes);
router.use("/sustainability-certs", SustainabilityCertRoutes);

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Urban Farming Platform API V1 is live!",
  });
});

export default router;
