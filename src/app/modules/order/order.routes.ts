import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";
import { OrderController } from "./order.controller";
import { authenticate, authorize } from "../../middleware/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/",
  authenticate,
  validateRequest(OrderValidation.createOrderSchema),
  OrderController.createOrder
);

router.get(
  "/",
  authenticate,
  authorize(Role.ADMIN, Role.VENDOR),
  OrderController.getAllOrders
);

router.get(
  "/my-orders",
  authenticate,
  OrderController.getMyOrders
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(Role.ADMIN, Role.VENDOR),
  validateRequest(OrderValidation.updateOrderStatusSchema),
  OrderController.updateOrderStatus
);

export const OrderRoutes = router;
