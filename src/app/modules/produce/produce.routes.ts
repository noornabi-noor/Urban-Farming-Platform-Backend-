import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProduceValidation } from "./produce.validation";
import { ProduceController } from "./produce.controller";
import { authenticate, authorize } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize(Role.VENDOR, Role.ADMIN),
  validateRequest(ProduceValidation.createProduceSchema),
  ProduceController.createProduce
);

router.get("/", ProduceController.getAllProduces);
router.get("/:id", ProduceController.getProduceById);

router.patch(
  "/:id",
  authenticate,
  authorize(Role.VENDOR, Role.ADMIN),
  validateRequest(ProduceValidation.updateProduceSchema),
  ProduceController.updateProduce
);

router.delete(
  "/:id",
  authenticate,
  authorize(Role.VENDOR, Role.ADMIN),
  ProduceController.deleteProduce
);

export const ProduceRoutes = router;
