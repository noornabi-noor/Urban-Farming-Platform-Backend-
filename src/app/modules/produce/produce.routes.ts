import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { ProduceValidation } from "./produce.validation";
import { ProduceController } from "./produce.controller";

const router = Router();

router.post(
  "/",
  validateRequest(ProduceValidation.createProduceSchema),
  ProduceController.createProduce
);

router.get("/", ProduceController.getAllProduces);
router.get("/:id", ProduceController.getProduceById);

router.patch(
  "/:id",
  validateRequest(ProduceValidation.updateProduceSchema),
  ProduceController.updateProduce
);

router.delete("/:id", ProduceController.deleteProduce);

export const ProduceRoutes = router;
