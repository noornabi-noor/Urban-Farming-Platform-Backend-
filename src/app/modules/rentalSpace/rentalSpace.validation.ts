import { z } from "zod";

const createRentalSpaceSchema = z.object({
  body: z.object({
    vendorId: z.string().min(1, "Vendor ID is required"),
    location: z.string().min(1, "Location is required"),
    size: z.string().min(1, "Size is required"),
    price: z.number().min(0, "Price cannot be negative"),
  }),
});

const updateRentalSpaceSchema = z.object({
  body: z.object({
    location: z.string().optional(),
    size: z.string().optional(),
    price: z.number().optional(),
    availability: z.boolean().optional(),
  }),
});

export const RentalSpaceValidation = {
  createRentalSpaceSchema,
  updateRentalSpaceSchema,
};
