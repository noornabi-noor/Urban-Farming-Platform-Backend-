import { z } from "zod";
import { CertificationStatus } from "@prisma/client";

const createProduceSchema = z.object({
  body: z.object({
    vendorId: z.string().min(1, "Vendor ID is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().min(0.01, "Price must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    availableQuantity: z.number().int().min(0, "Quantity cannot be negative"),
  }),
});

const updateProduceSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    certificationStatus: z.nativeEnum(CertificationStatus).optional(),
    availableQuantity: z.number().optional(),
  }),
});

export const ProduceValidation = {
  createProduceSchema,
  updateProduceSchema,
};
