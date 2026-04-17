import { z } from "zod";
import { OrderStatus } from "@prisma/client";

const createOrderSchema = z.object({
  body: z.object({
    produceId: z.string().min(1, "Produce ID is required"),
    vendorId: z.string().min(1, "Vendor ID is required"),
    quantity: z.number().int().min(1, "Quantity must be at least 1"),
    totalPrice: z.number().min(0, "Total price cannot be negative"),
  }),
});

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(OrderStatus),
  }),
});

export const OrderValidation = {
  createOrderSchema,
  updateOrderStatusSchema,
};
