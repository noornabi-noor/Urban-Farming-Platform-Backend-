import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";
import { OrderController } from "./order.controller";

const router = Router();

router.post(
  "/",
  validateRequest(OrderValidation.createOrderSchema),
  OrderController.createOrder
);

router.get("/", OrderController.getAllOrders);
router.get("/my-orders", OrderController.getMyOrders);

router.patch(
  "/:id/status",
  validateRequest(OrderValidation.updateOrderStatusSchema),
  OrderController.updateOrderStatus
);

export const OrderRoutes = router;
